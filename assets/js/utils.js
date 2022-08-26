//Búsqueda por nombre mediante el buscador
export const searchByName = () => {
  const inputSearch = document.getElementById('inputSearch')
  //busca al presionar enter
  inputSearch.addEventListener('keypress', (e) => {
    e.key === 'Enter' ? (
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch.value}`)
        .then(res => res.json())
        .then(data => showData(data))
        .catch(() =>{
          cardResultados.innerHTML = '<p>⚠️ No se encontraron resultados</p>'
        })
    ) : null
  })
}

const getIngredient =(food)=>{
  let ingredientesKey = Object.keys(food).filter(key=> key.includes("strIngredient")  )
  let ingredientesCantidad = Object.keys(food).filter(key=>  key.includes("strMeasure") )
  let ingredienteExistentes = {}
  for(let i =0;i<ingredientesKey.length;i++){
    if(food[ingredientesKey[i]]!==""){
      ingredienteExistentes[food[ingredientesKey[i]]]=food[ingredientesCantidad[i]]
    }
  }
  return ingredienteExistentes
}

const createListIngredient = (ingredients)=>{
  let strListIngrediente =`  <ul class="list-group list-group-flush">`
  for(let ingredient in ingredients ){
    strListIngrediente+=`<li class="list-group-item"> ${ingredient} -- ${ingredients[ingredient]} </li>`
  }
  strListIngrediente+=`</ul>`
  return strListIngrediente
}

const createDetailsFood =(food,strListIngrediente)=>{

  let str_food=`
  <figure class="banner">
      <img
          src=${food.strMealThumb}
          alt="Banner-meal"
      />
      <h1>${food.strMeal}</h1>

      <div class="grid-container-information">
          <div class="category">
              <p>
                  🍽️
              </p>
          </div>
          <div class="information-area">
              <p>
                  🌎
              </p>
          </div>
          <div class="information-tags">
              <p>
                  🏷️
              </p>
          </div>
          <div class="information-youtube">
              <a href="#">
                  <img src="./assets/icons/youtube.svg" alt="">
              </a>
          </div>
      </div>
  </figure>
  <div class="container-ingredient">
      <div class="ingredients-list">
          <h1 class="text-center">
              INGREDIENTES
          </h1>
          <div>
          ${strListIngrediente}
          </div>
      </div>
      <div class="image-meal">
          <img
              src=${food.strMealThumb}
              alt=${food.strMeal}
          />
      </div>
  </div>
  <div class="container my-4">
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
`
  return str_food
}

export const searchRandomFood=()=>{
  const buttonRandomFood = document.getElementById("foodRandom");

  buttonRandomFood.addEventListener('click',()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      let food = data["meals"][0]
      let ingredient = getIngredient(food)
      let strListIngrediente = createListIngredient(ingredient)
      let main  = document.getElementById("main")
      let str_food = createDetailsFood(food,strListIngrediente)
      main.innerHTML=str_food;
    })
  })

}
// muestra recetas que coincidan con la búsqueda después de dar enter
const showData = data => {
  const { meals } = data
  const cardResultados = document.getElementById('cardResultados')
  const contenedorRecetas = document.getElementById('contenedorRecetas')
  contenedorRecetas.style.display = 'none'

  // muestra titulo de la busqueda
  const titulo = document.getElementById('tituloResultados')
  titulo.innerText = `Resultados para '${inputSearch.value}'`

  while(cardResultados.firstChild){
    cardResultados.removeChild(cardResultados.firstChild)
  }

  // muestra resultados
  meals.map(item => {
    cardResultados.innerHTML += `
    <div class="col-3">
      <div class="card text-bg-dark">
        <img src=${item.strMealThumb} class="card-img" alt="${item.strMeal}">
        <div class="card-img-overlay">
          <div class="text_card_image">
            <div><i class="fa-solid fa-utensils"></i> ${item.strCategory}</div>        
          </div>  
        </div>
      </div>
      <p class="mt-2">${item.strMeal}</p>
    </div>
    `
  })
}

export  const searchByCategory = (id, category, mainTitle) => {
    let str_text = `<h1 class="mt-2">${mainTitle}</h1>`;
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category)
      .then((res) => res.json())
      .then((data) => {
        let recetas = data["meals"];
        recetas = recetas.slice(0, 5);
        recetas.forEach((meal) => {
          str_text += createCard(meal.strMealThumb, meal.strMeal, category);
        });
        document.getElementById(id).innerHTML = str_text;
      });
  };
  
  export const handleSerachRandom = () => {
    
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });
  };
  
  export function createCard(urlImage, titulo_text, categoria) {
    let card = `
      <div class="col">
          <div class="card text-bg-dark">
              <img src=${urlImage} class="card-img" alt="${titulo_text}">
              <div class="card-img-overlay">
                  <div class="text_card_image">
                      <div class="mt-1">
                          <i class="fa-solid fa-utensils"></i> ${categoria}
                      </div>
                      
                  </div>
              
              </div>
          </div>
          <p class="mt-2">${titulo_text} </p>
      </div>
      `;
    return card;
  }
  