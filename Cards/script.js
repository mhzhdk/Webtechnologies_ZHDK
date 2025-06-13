// function for manual input
async function fetchInfo(){
    const inputVariable = document.getElementById("cocktailname").value.toLowerCase();   //.value.toLowerCase() = avoid typing restrictions
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputVariable}`); //searching for variable page given from user
    const data = await response.json();  // make it readable
    // data = Object{  drinks:[  0 Object{properties:}  ]  }  within the object is an array with one object which has many properties
    const drinkObject = data.drinks[0]; //accesses from the array data.drinks the Object 0 which holds the properties 

    document.querySelector(".majorCocktailName").textContent = drinkObject.strDrink; 
    // searches for the class name and gives it a text content which is the strDrink property of the object drinkObject 
    //  document.querySelector(".classname") = entire folder cross-referencing class
    // document.getElementById("idname") = entire folder cross-referencing id 

    const cocktailIngredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = drinkObject[`strIngredient${i}`]; //loops through every strIngredient property and stores it in ingredient
        const measurement = drinkObject[`strMeasure${i}`];

            if (ingredient && measurement) { //if they exist and are not null
                const color = colorLibrary[ingredient] || getRandomColor(ingredient);
                // colorLibrary[ingredient] is dynamic key to receive a property = "Irish whiskey": "hsl(297, 57%, 82%)"
                // colorLibrary.ingredient = does not treat ingredient as variable anymore but searches for property ingredient (but it needs property irishwhiskey)
                cocktailIngredients.push({ingredient, measurement, color}); //add all properties as an object to the cocktails list
                // one object = 0: Object { ingredient: "Banana liqueur", measurement: "1 shot ", color: "hsl(14, 54%, 79%)" }
            }  
    }
    renderGlass(cocktailIngredients);  // call rendering and use the object of the list with the ingredient objects and their properties
}

//function for automatic input
async function getData(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const data = await response.json();
    const cocktail = data.drinks; // data.drink = array of full cocktail info "drinks"
    const ingr = data.drinks[0];  // the object itself "object 0"

    document.querySelector(".majorCocktailName").textContent = ingr.strDrink; // searches on page for class and adds text content Object.property

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
    console.log(ingredients);
}

// function to assign a color to every ingredient from list
async function getColorList(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    const data = await response.json(); // data = Object of the array with the ingredient objects
    const ingredientList = data.drinks; // ingredientList = 0: Object { strIngredient1: "Light rum" } 1: Object { strIngredient1: "Bourbon" }
    const assignedColors = {};
    for (let i = 0; i < ingredientList.length; i++) {
        const ingredient = ingredientList[i]; // respective Object within the array
        const name = ingredient.strIngredient1; // the property strIngredient1 of the Object
            if (!name) continue; // skips back to new for loop if name is null / undefined ...
            if (!assignedColors[name]) { //else it continues with further if statement >  is within the Object already the property with this name? -> dynamic key
                assignedColors[name] = getRandomColor(name); // classic object property assignment
                // Object assignedColors
                // [property] to access or create property value of this property = dynamic key variable 
                // object[key] = value becomes-> object = { key: "value" } 
                // getRandomColor(name) returns a value = `hsl(${hue}, ${saturation}%, ${lightness}%)`
            }
  }
  return assignedColors; // returns to colorLibrary (outside access)
}

//function to provide the colors
function getRandomColor(name) {
    let hash = 0; // to get consisten color-matching
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash); // << = left shift operator (pattern to left) // charCodeAt()
        //appendage for hashing
    }
    const hue = Math.abs(hash) % 360;  //Math.abs makes a value be non-negative
    const saturation = 40 + (Math.abs(hash) % 20); // % operator returns the remainder when dividing by 20 > end up with number 0 to 20
    const lightness = 75 + (Math.abs(hash) % 10); // 75–85%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`; //`` = template literals, use for strings with variable input ${x + y}
} 

let colorLibrary = {};
async function initializeColorLibrary() {
    colorLibrary = await getColorList(); //is filled with the returned values of assignedColors eg "7-Up": "hsl(57, 57%, 82%)", "Absolut Citron": "hsl(99, 59%, 84%)"
    await getData(); //renders the glass using colorLibrary (won't start unless library loaded)
    const searchbar = document.getElementById("cocktailname");
    searchbar.value = ""; // clearing a value! if it was html content it would be searchbar.innerHTML
}

function renderGlass(ingredients) { // works with the mainlist of the retrieved specific cocktail data
    const glass = document.getElementById("glass");
    glass.innerHTML = ""; // Clear previous content
    for (let i = 0; i < 7; i++) { //happens for each individual ingredient (7 as limit instad of 10)

        // create the slice that is deposited in the glass
        const block = document.createElement("div");
        block.classList.add("DivIngr") //method to access DOM element and modify. compared object[key] is an object assignment
        const sideBlock = document.createElement("div");
        sideBlock.classList.add("DivMeas")
        const Fullblock = document.createElement("div");
        Fullblock.classList.add("DivContain");

        if (i < ingredients.length) { //styling of the box itself
            block.style.backgroundColor = ingredients[i].color; //accessing the color property of the ingredient
            block.textContent = ingredients[i].ingredient; 
            sideBlock.textContent = ingredients[i].measurement;
        } else {
            block.style.backgroundColor = "transparent";
        }

    Fullblock.appendChild(block) 
    Fullblock.appendChild(sideBlock)
    glass.appendChild(Fullblock); //full single ingredient(+measurement) layer
  }
}

// the only function that is being executed in the code (function referencing through execution)
initializeColorLibrary();






// APPENDAGE
/* 

charCodeAt=
97 = a, 98 = b, 99 = c , ...
122 if az, 122 if zazz, 99 if abc,

<< is shift x << n = x*2^n
((hash << 5) - hash) = (hash * 32) - hash = 32x - x = 31x = hash*31

let hash = 0
let name = he
for (let i = 0; i < name.length; i++) {
hash = name.charCodeAt(i) + ((hash << 5) - hash);
}
i=1; hash = 104(charcode of h) + (0 * 31) = 104 first iteration
i=2; hash = 101(=charcode of e) + (104(=previous hash) * 31) = 101 + 3224 = 3325

Additional unused styling:
Fullblock.title = ingredients[i].ingredient; // title = tooltip = pop-up box on hover

this can be styled here or in css 
block.style.fontWeight = "bold"; //block.textContent is a string and thus can't be styled
*/

/*  AESTHETIC DRINKS

Frozen Daiquiri
Port Wine Flip
Gin sling
Boxcar  // has Gin
Almond Chocolate coffee
Figgy Thyme 
planter's punch
stress


*/