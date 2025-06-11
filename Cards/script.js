async function getData(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const data = await response.json(); //is the whole object from the API in json format (readable)
    const cocktail = data.drinks; //from the fetched object take the drinks property and store it in cocktail variable
    // const ingr1 = data.drinks.strIngredient1; // wrong because data.drinks is an array, not an object!
    const ingr = data.drinks[0];   // attention in this API the array contains objects. [0] is here an object
    console.log(ingr.strIngredient1) // object.specificProperty = single ingredient print

    const ingredients = []; //the website has 616 ingredients
    for (let i = 1; i <= 15; i++) {
    const ingredient = ingr[`strIngredient${i}`];
    if (ingredient) { 
    ingredients.push(ingredient); }   }

    console.log(ingredients) 
} //everything with these variables must be inside brackets
    
  
async function getColorList(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    const data = await response.json();
    const ingredientList = data.drinks; //list
    //console.log(ingredientList)

     const assignedColors = {}; //helper object, not final result

for (let i = 0; i < ingredientList.length; i++) {
    const ingredient = ingredientList[i];
    const name = ingredient.strIngredient1;
    if (!name) continue;
        if (!assignedColors[name]) {
        assignedColors[name] = getRandomColor();
        }
    ingredient.color = assignedColors[name];
  }
  console.log(ingredientList)
}


function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`; // prettier and more evenly spaced than hex
}

getData();
getRandomColor();
getColorList();

const cardtemplate = document.createElement('card');
