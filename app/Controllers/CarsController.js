import CarsService from "../Services/CarsService.js";
import store from "../store.js";

//Private
function _drawCarList() {
  let cars = store.State.cars;
  let template = "";
  cars.forEach(car => (template += car.ListTemplate));
  document.getElementById("listings").innerHTML = template;
  console.log(cars);
}

function _drawCarForm() {
  let template = /* html */ `
      <form id="car-form" onsubmit="app.carsController.createCar()">
        <input name="_id" type="text" class="d-none" disabled />
        <div class="form-group">
          <label for="make">Make:</label>
          <input name="make" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="model">Model:</label>
          <input name="model" type="text" class="form-control" />
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
export default class CarsController {
  constructor() {
    store.subscribe("cars", _drawCarList);
  }

  showCarForm() {
    _drawCarForm();
    this.getCars();
  }

  async getCars() {
    try {
      await CarsService.getCars();
    } catch (error) {
      console.log(error);
    }
  }

  async createCar() {
    try {
      event.preventDefault();
      let form = event.target;
      let carData = {
        // @ts-ignore
        make: form.make.value,
        // @ts-ignore
        model: form.model.value,
        // @ts-ignore
        year: form.year.value,
        // @ts-ignore
        price: form.price.value,
        // @ts-ignore
        description: form.description.value,
        // @ts-ignore
        imgUrl: form.imgUrl.value
      };

      // @ts-ignore
      let id = form._id.value;
      if (id) {
        carData._id = id;
        await CarsService.updateCar(carData);
      } else {
        await CarsService.createCar(carData);
      }
      // @ts-ignore
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }
  async editCar(id) {
    let car = store.State.cars.find(c => c._id == id);
    let form = document.getElementById("car-form");
    // @ts-ignore
    form.make.value = car.make;
    // @ts-ignore
    form.model.value = car.model;
    // @ts-ignore
    form.year.value = car.year;
    // @ts-ignore
    form.price.value = car.price;
    // @ts-ignore
    form.description.value = car.description;
    // @ts-ignore
    form.imgUrl.value = car.imgUrl;
    // @ts-ignore
    form._id.value = car._id;
  }

  async updateCar() {
    try {
      // @ts-ignore
      await CarsService.editCar();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCar(id) {
    try {
      await CarsService.deleteCar(id);
    } catch (error) {
      console.log(error);
    }
  }
}