export default class House {
    constructor(data) {
        this._id = data._id;
        this.bedrooms = data.bedrooms;
        this.bathrooms = data.bathrooms;
        this.imgUrl = data.imgUrl;
        this.levels = data.levels;
        this.year = data.year;
        this.price = data.price;
        this.description = data.description;
    }

    get ListTemplate() {
        return /* html */ `
     <div class="col-12 col-md-4 col-lg-3">
        <div class="card">
            <img src="${this.imgUrl}" class="card-img-top" alt="a car image">
            <div class="card-body">
                <div class="card-title">Rooms: ${this.bedrooms} Baths: ${this.bathrooms}</div>
                <div class="card-subtitle">${this.price}</div>
                <p class="card-text">${this.year}</p>
                <p class="card-text">${this.levels}</p>
                <p class="card-text">${this.description}</p>
            </div>
            <button class="btn btn-info" onclick="app.housesController.editHouses('${this._id}')">Edit</button>
            <button class="btn btn-danger" onclick="app.housesController.deleteHouses('${this._id}')">Delete</button>
        </div>
     </div>
    `;
    }
}