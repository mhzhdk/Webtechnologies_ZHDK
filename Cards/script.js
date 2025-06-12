// Frozen Daiquiri
// Chocolate Monkey
// Port Wine Flip

async function fetchIMG(){

  const inputVariable = document.getElementById("cocktailname").value.toLowerCase();
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputVariable}`);
  const data = await response.json();

  const ingr = data.drinks[0]; 

  console.log(ingr.strDrink);
  console.log(ingr.strMeasure1);

  document.querySelector(".majorCocktailName").textContent = ingr.strDrink;

  const ingredients = []; 
  for (let i = 1; i <= 15; i++) {
    const ingredient = ingr[`strIngredient${i}`];
    const measurement = ingr[`strMeasure${i}`];
      if (ingredient && measurement) { 
        const color = colorLibrary[ingredient] || getRandomColor(ingredient);
        ingredients.push({ingredient, measurement, color}); 
      }   
  }
  renderGlass(ingredients);
    
}


let colorLibrary = {};

async function getData(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const data = await response.json(); 
    const cocktail = data.drinks; 
    // const ingr1 = data.drinks.strIngredient1; // wrong because data.drinks is an array, not an object!
    const ingr = data.drinks[0];   
    console.log(ingr.strDrink)
    document.querySelector(".majorCocktailName").textContent = ingr.strDrink;
    
    const ingredients = []; 
    for (let i = 1; i <= 15; i++) {
      const ingredient = ingr[`strIngredient${i}`];
      const measurement = ingr[`strMeasure${i}`];
    if (ingredient && measurement) { 
        const color = colorLibrary[ingredient] || getRandomColor(ingredient);
        ingredients.push({ingredient, measurement, color}); 
      }  
  }
    renderGlass(ingredients);
} 
 
  
async function getColorList(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    const data = await response.json();
    const ingredientList = data.drinks; 
     const assignedColors = {}; 
for (let i = 0; i < ingredientList.length; i++) {
    const ingredient = ingredientList[i];
    const name = ingredient.strIngredient1;
    if (!name) continue;
        if (!assignedColors[name]) {
        assignedColors[name] = getRandomColor(name);
        }
  }
  console.log(assignedColors)
  return assignedColors;
}

function getRandomColor(name) {
  // Simple hash function: converts string to number
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
const hue = Math.abs(hash) % 360;
const saturation = 40 + (Math.abs(hash) % 20); // 40–60%
const lightness = 75 + (Math.abs(hash) % 10); // 75–85%
return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


async function initializeColorLibrary() {
    colorLibrary = await getColorList(); 
    await getData();
}

function renderGlass(ingredients) {
  const glass = document.getElementById("glass");
  glass.innerHTML = ""; // Clear previous content

  for (let i = 0; i < 8; i++) {
    const block = document.createElement("div");
    block.classList.add("DivIngr")
    const sideBlock = document.createElement("div");
    sideBlock.classList.add("DivMeas")
    const Fullblock = document.createElement("div");
    Fullblock.classList.add("DivContain");

    if (i < ingredients.length) {
      block.style.backgroundColor = ingredients[i].color;
      block.title = ingredients[i].ingredient; // show ingredient on hover
      block.textContent = ingredients[i].ingredient;
      sideBlock.textContent = ingredients[i].measurement;
      block.style.fontFamily = "Segoe UI";
      block.style.fontWeight = "bold"; //block.textContent is a string and thus can't be styled
    } else {
      block.style.backgroundColor = "transparent";
    }
    Fullblock.appendChild(block)
    Fullblock.appendChild(sideBlock)
    glass.appendChild(Fullblock);
  }
}

initializeColorLibrary();
