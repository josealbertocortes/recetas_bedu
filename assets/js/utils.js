
//busqueda random de comida 
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

//inicio de la creacion de la pagina de detalle
const searchDetailFood=(id)=>{
  fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id)
  .then(res=>res.json())
  .then((data)=>{
    let food = data["meals"][0]
    let ingredient = getIngredient(food)
    let strListIngrediente = createListIngredient(ingredient)
    let main  = document.getElementById("main")
    let str_food = createDetailsFood(food,strListIngrediente)
    main.innerHTML=str_food;
  })
}

// obtencion de ingredientes existentes
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


//creacion de html que muestra los ingredientes
const createListIngredient = (ingredients)=>{
  let strListIngrediente =`  <ul class="list-group list-group-flush">`
  for(let ingredient in ingredients ){
    strListIngrediente+=`<li class="list-group-item"> ${ingredient} -- ${ingredients[ingredient]} </li>`
  }
  strListIngrediente+=`</ul>`
  return strListIngrediente
}

//creacion del html que muestra el detalle de la comida 
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
                  🍽️ ${food.strCategory}
              </p>
          </div>
          <div class="information-area">
              <p>
                  🌎 ${food.strArea}
              </p>
          </div>
          <div class="information-tags">
              <p>
                  🏷️ ${food.strTags||'No tags'}
              </p>
          </div>
          <div class="information-youtube">
              <a href="#">
                  <img src="./assets/icons/youtube.svg" alt="">
              </a>
          </div>
      </div>
  </figure>
  <div class="m-0 p-0">
  <a href="/" class="boton__search__random regresar my-2 ms-2" >Inicio</a> 
  </div>
  <div class="container">
  <div class="row">
    
      <div class="col">
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

//Búsqueda por nombre mediante el buscador
export const searchByName = () => {
  const inputSearch = document.getElementById('inputSearch')
  const iconSearch = document.getElementById("btnSearch")

  //busqueda por buton icon
  iconSearch.addEventListener('click', (e) => {
    
    if(inputSearch.value){
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch.value}`)
      .then(res => res.json())
      .then(data => showData(data))
      .catch(() =>{

      })
    }


  })

  //busca al presionar enter
  inputSearch.addEventListener('keypress', (e) => {
    e.key === 'Enter' ? inputSearch.value? (  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch.value}`)
    .then(res => res.json())
    .then(data => showData(data))
    .catch(() =>{

    })):null :null 
    
    
       
  })

}

// muestra recetas que coincidan con la búsqueda después de dar enter
const showData = data => {
  const { meals } = data
  const cardResultados = document.getElementById('main')

  let strSearch = `

<h2 class="text-center aling" id="tituloResultados"> Resultados para '${inputSearch.value}' </h2>
<a href="/" class="boton__search__random regresar my-2 ms-2" >Inicio</a> 
    <div class="container">
        <div class="row text-center h5" id="cardResultados">
  `


  // muestra resultados
  meals.map(item => {    
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
    `
  })
  strSearch+="</div> </div>"
  cardResultados.innerHTML =strSearch
  let elementos = document.querySelectorAll(".imagen_event")
  elementos.forEach(item=>{
    item.addEventListener("click",(e)=>{
      e.stopImmediatePropagation();
      let id = e.target.dataset.id
      searchDetailFood(id)
    })
    
  })
}


//busqueda de comida por categoria 
export  const searchByCategory = (id, category, mainTitle) => {
    let str_text = `<h1 class="mt-2 font-courgette">${mainTitle}</h1>`;
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category)
      .then((res) => res.json())
      .then((data) => {
        let recetas = data["meals"];
        recetas = recetas.slice(0, 4);
        recetas.forEach((meal) => {
          str_text += createCard(meal.strMealThumb, meal.strMeal, category,meal.idMeal);
        });
        document.getElementById(id).innerHTML = str_text;
        let elementos = document.querySelectorAll(".imagen_event")
        elementos.forEach(item=>{
          item.addEventListener("click",(e)=>{
            e.stopImmediatePropagation();
            let id = e.target.dataset.id
            searchDetailFood(id)
          })
          
        })

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
  