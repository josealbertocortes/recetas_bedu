import {searchByCategory, searchByName, searchRandomFood} from './utils.js'
//import '../css/style.css'
//import '../css/stylemeal.css'

(function main(){
    searchRandomFood()
    searchByName()
    searchByCategory("recetasPollo", "Chicken", "Recetas con pollo")
    searchByCategory("recetasCarne", "Beef", "Recetas con carne")
    searchByCategory("recetasPescado", "Seafood", "Recetas con mariscos")
    
    
})()
