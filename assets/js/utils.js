//busqueda random de comida
export const searchRandomFood = () => {
  const buttonRandomFood = document.getElementById("foodRandom");

  buttonRandomFood.addEventListener("click", () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => {
        let food = data["meals"][0];
        let ingredient = getIngredient(food);
        let strListIngrediente = createListIngredient(ingredient);
        let main = document.getElementById("main");
        let str_food = createDetailsFood(food, strListIngrediente);
        main.innerHTML = str_food;
      });
  });
};

//inicio de la creacion de la pagina de detalle
const searchDetailFood = (id) => {
  fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    .then((res) => res.json())
    .then((data) => {
      let food = data["meals"][0];
      let ingredient = getIngredient(food);
      let strListIngrediente = createListIngredient(ingredient);
      let main = document.getElementById("main");
      let str_food = createDetailsFood(food, strListIngrediente);
      main.innerHTML = str_food;
    });
};

// obtencion de ingredientes existentes
const getIngredient = (food) => {
  let ingredientesKey = Object.keys(food).filter((key) =>
    key.includes("strIngredient")
  );
  let ingredientesCantidad = Object.keys(food).filter((key) =>
    key.includes("strMeasure")
  );
  let ingredienteExistentes = {};
  for (let i = 0; i < ingredientesKey.length; i++) {
    if (food[ingredientesKey[i]] !== "") {
      ingredienteExistentes[food[ingredientesKey[i]]] =
        food[ingredientesCantidad[i]];
    }
  }

  return ingredienteExistentes
}

//creacion de html que muestra los ingredientes
const createListIngredient = (ingredients)=>{
  let strListIngrediente =`<table class="table">\n<thead>\n<tr>\n<th scope="col">Ingredientes</th>\n<th scope="col">Cantidades</th>\n</thead>\n<tbody>`
  for(let ingredient in ingredients ){
    strListIngrediente+=`<tr><td>${ingredient}</td><td>${ingredients[ingredient]}</td>`
  }
  strListIngrediente+=`</table>`
  return strListIngrediente
}

//creacion del html que muestra el detalle de la comida 
const createDetailsFood =(food,strListIngrediente)=>{
  let str_food=`
  <div id="ruta">
  <a href="/">Inicio > </a> 
  <a href="#" style="color:#f39b17;"> ${food.strMeal}</a> 
  </div>
  <figure class="banner">
      <img
          src=${food.strMealThumb}
          alt="Banner-meal"
      />
      <h1>${food.strMeal}</h1>
  </figure>
  <div class="grid-container-information">
          <div class="category">
              <img src="./assets/icons/maceta.svg" alt="icon-youtube">
              <p>
                  ${food.strCategory}
              </p>
          </div>
          <div class="information-area">
              <img src="./assets/icons/mundial.svg" alt="icon-youtube">
              <p>
                  ${food.strArea}
              </p>
          </div>
          <div class="information-tags">
              <img src="./assets/icons/tag.svg" alt="icon-youtube">
              <p>

                  🏷️ ${food.strTags || "No tags"}
              </p>
          </div>
          <div class="information-youtube">
              <a href="${food.strYoutube}">
                  <img src="./assets/icons/youtube.svg" alt="">

              </a>
          </div>
  </div>
  
  <div class="container">
  <div class="row">
      <div class="col" id="ingredient">
      <h1 class="text-center">
          INGREDIENTES
      </h1>
      <div>
      ${strListIngrediente}
      </div>
    </div>
    <div class="col d-none d-lg-block text-center image-meal">
      <img
          src=${food.strMealThumb}
          alt=${food.strMeal}
      />
    </div>
    </div>
  </div>
  <div class="container-instructions">
  <div class="row">
      <div class="col-12">
          <h1 class="text-center">
              INSTRUCCIONES
          </h1>
      </div>   
      <div class="col-12">
      ${food.strInstructions}
      </div>
  </div>
`;
  return str_food;
};

//Búsqueda por nombre mediante el buscador
export const searchByName = () => {
  const inputSearch = document.getElementById("inputSearch");
  const iconSearch = document.getElementById("btnSearch");

  //busqueda por buton icon
  iconSearch.addEventListener("click", (e) => {
    if (inputSearch.value) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch.value}`
      )
        .then((res) => res.json())
        .then((data) => showData(data))
        .catch(() => {});
    }
  });

  //busca al presionar enter
  inputSearch.addEventListener("keypress", (e) => {
    e.key === "Enter"
      ? inputSearch.value
        ? fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch.value}`
          )
            .then((res) => res.json())
            .then((data) => showData(data))
            .catch(() => {})
        : null
      : null;
  });
};

// muestra recetas que coincidan con la búsqueda después de dar enter
const showData = (data) => {
  const { meals } = data;
  const cardResultados = document.getElementById("main");

  let strSearch = `
<div id="ruta">
  <a href="/">Inicio > </a> 
  <a href="#" style="color:#f39b17;"> Busqueda</a> 
  </div>
  <h2 class="text-center aling m-3" id="tituloResultados"> Resultados para '${inputSearch.value}' </h2>
    <div class="container">
        <div class="row text-center h5" id="cardResultados">
  `;

  // muestra resultados
  meals.map((item) => {
    strSearch += `
    <div class="col-xs-12 col-sm-6 col-md-3 ">
      <div class="card text-bg-dark  imagen_event"  data-id=${item.idMeal}>
        <img src=${item.strMealThumb} class="card-img" data-id=${item.idMeal} alt="${item.strMeal}">
        <div class="card-img-overlay" data-id=${item.idMeal}>
          <div class="text_card_image" data-id=${item.idMeal}>
            <div><i class="fa-solid fa-utensils" data-id=${item.idMeal}></i> ${item.strCategory}</div>        
          </div>  
        </div>
      </div>
      <p class="mt-2">${item.strMeal}</p>
    </div>
    `;
  });
  strSearch += "</div> </div>";
  cardResultados.innerHTML = strSearch;
  let elementos = document.querySelectorAll(".imagen_event");
  elementos.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      let id = e.target.dataset.id;
      searchDetailFood(id);
    });
  });
};

//busqueda de comida por categoria
export const searchByCategory = (id, category, mainTitle) => {
  let str_text = `<h1 class="mt-2 font-courgette">${mainTitle}</h1>`;
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category)
    .then((res) => res.json())
    .then((data) => {
      let recetas = data["meals"];
      recetas = recetas.slice(0, 4);
      recetas.forEach((meal) => {
        str_text += createCard(
          meal.strMealThumb,
          meal.strMeal,
          category,
          meal.idMeal
        );
      });
      document.getElementById(id).innerHTML = str_text;
      let elementos = document.querySelectorAll(".imagen_event");
      elementos.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.stopImmediatePropagation();
          let id = e.target.dataset.id;
          searchDetailFood(id);
        });
      });
    });
};

//creacion del card  que tiene la informacion de la comida
export function createCard(urlImage, titulo_text, categoria, idMeal) {
  let card = `
      <div class="col-xs-12 col-sm-6 col-md-3 ">
          <div class="card text-bg-dark imagen_event "  data-id=${idMeal}>
              <img src=${urlImage} class="card-img" alt="${titulo_text}">
              <div class="card-img-overlay" data-id=${idMeal}>
                  <div class="text_card_image" >
                      <div class="mt-1" data-id=${idMeal}>
                          <i class="fa-solid fa-utensils" data-id=${idMeal} ></i> ${categoria}
                      </div>
                  </div>
              </div>
          </div>
          <p class="mt-2 font-courgette">${titulo_text} </p>
      </div>
      `;
  return card;
}
