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
        assignedColors[name] = getRandomColor();
        }
  }
  console.log(assignedColors)
  return assignedColors;
}


function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 60%)`; 
}

async function initializeColorLibrary() {
    colorLibrary = await getColorList(); 
    await getData();
}



initializeColorLibrary();  

const cardtemplate = document.createElement('card');
