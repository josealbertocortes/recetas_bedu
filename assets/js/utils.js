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
  