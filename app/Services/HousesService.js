import store from "../store.js";
import House from "../Models/House.js";

const _SANDBOX_URL = "http://bcw-sandbox.herokuapp.com/api/houses/";

class HousesService {
    async createHouse(houseData) {
        let response = await fetch(_SANDBOX_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(houseData)
        });
        let data = await response.json();
        let newHouse = new House(data.data);
        store.State.houses.push(newHouse);
        store.commit("houses", store.State.houses);
    }
    async getHouses() {
        let response = await fetch(_SANDBOX_URL);
        let data = await response.json();
        let houses = data.data.map(h => new House(h));
        houses.reverse();
        store.commit("houses", houses);
    }
}

const service = new HousesService();
export default service;
