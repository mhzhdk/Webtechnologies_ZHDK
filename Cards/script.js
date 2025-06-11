async function getData(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const data = await response.json(); //is the whole object from the API in json format (readable)
    const cocktail = data.drinks; //from the fetched object take the drinks property and store it in cocktail variable
    // const ingr1 = data.drinks.strIngredient1; // wrong because data.drinks is an array, not an object!
    const ingr1 = data.drinks[0];
    // attention in this API the array contains objects. [0] is here an object
    console.log(ingr1.strIngredient1)} // object.specificProperty
getData();



const cardtemplate = document.createElement('card');
