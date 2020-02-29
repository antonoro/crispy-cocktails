const formSearch = document.querySelector("#formSearch");

const populateIngredients = (ingredients) => {

    const ingredientsUl = document.querySelector("#ingredients");
    ingredientsUl.innerHTML = "";
    ingredients.forEach(ing => {
        const ingredientLi = document.createElement("li");
        ingredientLi.textContent = `${ing.IngredientName} : ${ing.IngredientQuantity}`;
        ingredientsUl.appendChild(ingredientLi);
    });
};

const onSearch = (evt) => {

    const query = document.querySelector("#formSearch input").value;
    fetch(`/ingredients/${query}`)
        .then(res =>res.json())
        .then(populateIngredients);
    evt.preventDefault();
};

formSearch.addEventListener("submit", onSearch);