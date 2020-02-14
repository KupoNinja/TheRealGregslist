import HousesService from "../Services/HousesService.js";
import store from "../store.js";

//Private
function _drawHouseList() {
    let houses = store.State.houses;
    let template = "";
    houses.forEach(h => (template += h.ListTemplate));
    document.getElementById("listings").innerHTML = template;
    console.log(houses);
}

//Public
export default class HousesController {
  constructor() {
    store.subscribe("houses", _drawHouseList);
    }
    
    async getHouses() {
        try {
            await HousesService.getHouses();
        } catch (error) {
            console.log(error);
        }
    }
}
