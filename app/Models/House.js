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
        return this;
    }
}