// Frozen Daiquiri
// Chocolate Monkey
// Port Wine Flip
async function fetchIMG(){
  const inputVariable = document.getElementById("cocktailname").value.toLowerCase();
  //cocktailname is on HTML the input text received
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputVariable}`);
  const data = await response.json();
  const cocktail = data.drinks; 
    // const ingr1 = data.drinks.strIngredient1; // wrong because data.drinks is an array, not an object!
    const ingr = data.drinks[0];   
    console.log(ingr.strDrink)
    document.querySelector(".majorCocktailName").textContent = ingr.strDrink;

    const ingredients = []; 
    for (let i = 1; i <= 15; i++) {
    const ingredient = ingr[`strIngredient${i}`];
    if (ingredient) { 
    const color = colorLibrary[ingredient] || getRandomColor(ingredient);
    ingredients.push({ingredient, color}); }   }
    console.log(ingredients) 
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
    if (ingredient) { 
    const color = colorLibrary[ingredient] || getRandomColor(ingredient);
    ingredients.push({ingredient, color}); }   }
    console.log(ingredients) 
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

/* unused because it is not seeded
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 60%)`; 
}
*/

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



initializeColorLibrary();  

function renderGlass(ingredients) {
  const glass = document.getElementById("glass");
  glass.innerHTML = ""; // Clear previous content


  for (let i = 0; i < 8; i++) {
    const block = document.createElement("BlockDiv");
    block.classList.add("ingredientBlock")
  

    if (i < ingredients.length) {
      block.style.backgroundColor = ingredients[i].color;
      block.title = ingredients[i].ingredient; // show ingredient on hover
      block.textContent = ingredients[i].ingredient;
      block.style.fontFamily = "Segoe UI";
      block.style.fontWeight = "bold";
      //block.textContent is a string and thus can't be styled
    } else {
      block.style.backgroundColor = "transparent";
    }

    glass.appendChild(block);
  }
}

