async function fetchIMG(){
  const inputVariable = document.getElementById("cocktailname").value.toLowerCase();
  //cocktailname is on HTML the input text received
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputVariable}`);
  const data = await response.json();
  console.log(data);
}


let colorLibrary = {};

async function getData(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const data = await response.json(); 
    const cocktail = data.drinks; 
    // const ingr1 = data.drinks.strIngredient1; // wrong because data.drinks is an array, not an object!
    
    const ingr = data.drinks[0];   
    console.log(ingr.strIngredient1) 
    
    const ingredients = []; 
    for (let i = 1; i <= 15; i++) {
    const ingredient = ingr[`strIngredient${i}`];
    if (ingredient) { 
    const color = colorLibrary[ingredient] || "black";
    ingredients.push({ingredient, color}); }   }
    console.log(ingredients) 
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
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`; 
}


async function initializeColorLibrary() {
    colorLibrary = await getColorList(); 
    await getData();
}



initializeColorLibrary();  

const container = document.createElement('container');

