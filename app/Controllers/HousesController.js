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

function _drawHouseForm() {
    let template = /* html */ `
      <form id="house-form" onsubmit="app.housesController.createHouse()">
        <input name="_id" type="text" class="d-none" disabled />
        <div class="form-group">
          <label for="bedrooms">Bedrooms:</label>
          <input name="bedrooms" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="bathrooms">Bathrooms:</label>
          <input name="bathrooms" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="levels">Levels:</label>
          <input name="levels" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="year">Year:</label>
          <input name="year" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input name="price" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            name="description"
            type="text"
            class="form-control"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="imgUrl">Image URL:</label>
          <input name="imgUrl" type="text" class="form-control" />
        </div>
        <button type="submit">Submit</button>
      </form>
    `;
  document.getElementById("form").innerHTML = template;
}

//Public
export default class HousesController {
  constructor() {
    store.subscribe("houses", _drawHouseList);
    }
    
    showHouseForm() {
        _drawHouseForm();
        this.getHouses();
    }

    async getHouses() {
        try {
            await HousesService.getHouses();
        } catch (error) {
            console.log(error);
        }
    }

    async createHouse() {
        try {
            event.preventDefault();
            let form = event.target;
            // @ts-ignore
            let houseData = {
                // @ts-ignore
                bedrooms: form.bedrooms.value,
                // @ts-ignore
                bathrooms: form.bathrooms.value,
                // @ts-ignore
                imgUrl: form.imgUrl.value,
                // @ts-ignore
                levels: form.levels.value,
                // @ts-ignore
                year: form.year.value,
                // @ts-ignore
                price: form.price.value,
                // @ts-ignore
                description: form.description.value
            }
            // @ts-ignore
            let id = form._id.value;
            if (id) {
                houseData._id = id;
                await HousesService.updateHouse(houseData);
            } else {
                await HousesService.createHouse(houseData);
            }
            // @ts-ignore
            form.reset();
        } catch (error) {
            console.log(error);
        }
    }

    async editHouse(id) {
        _drawHouseForm();
        let house = store.State.houses.find(h => h._id == id);
        let form = document.getElementById("house-form");
        // @ts-ignore
        form.bedrooms.value = house.bedrooms;
        // @ts-ignore
        form.bathrooms.value = house.bathrooms;
        // @ts-ignore
        form.imgUrl.value = house.imgUrl;
        // @ts-ignore
        form.levels.value = house.levels;
        // @ts-ignore
        form.year.value = house.year;
        // @ts-ignore
        form.price.value = house.price;
        // @ts-ignore
        form.description.value = house.description
        // @ts-ignore
        form._id.value = house._id;
    }

    async updateHouse() {
        try {
            await HousesService.updateHouse();
        } catch (error) {
            console.log(error);
            
        }
    }

    async deleteHouse(id) {
        try {
            await HousesService.deleteHouse(id);
        } catch (error) {
            console.log(error);
            
        }
    }
}
