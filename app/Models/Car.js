export default class Car {
  constructor(data) {
    this._id = data._id;
    this.make = data.make;
    this.model = data.model;
    this.year = data.year;
    this.description = data.description;
    this.price = data.price;
    this.imgUrl = data.imgUrl;
  }

  get FormTemplate() {
    return /* html */ `
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
  }

  get ListTemplate() {
    return /* html */ `
     <div class="col-12 col-md-4 col-lg-3">
        <div class="card">
            <img src="${this.imgUrl}" class="card-img-top" alt="a car image">
            <div class="card-body">
                <div class="card-title">${this.make} - ${this.model}</div>
                <div class="card-subtitle">${this.price}</div>
                <p class="card-text">${this.description}</p>
            </div>
            <button class="btn btn-info" onclick="app.carsController.editCar('${this._id}')">Edit</button>
            <button class="btn btn-danger" onclick="app.carsController.deleteCar('${this._id}')">Delete</button>
        </div>
     </div>
    `;
  }
}
