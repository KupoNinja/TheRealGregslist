import HousesService from "../Services/HousesService.js";
import store from "../store.js";

//Private
function _draw() {
  let houses = store.State.houses;
  console.log(houses);
}

//Public
export default class HousesController {
  constructor() {
    store.subscribe("houses", _draw);
    }
    
    async getHouses() {
        try {
            await HousesService.getHouses();
        } catch (error) {
            console.log(error);
        }
    }
}
