import {BASE_URL} from "./constants";

export class IngredientsApi {
  constructor({address, headers}) {
    this._address = address;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json()
    }

    return Promise.reject(`Error ${res.status}`)
  }

  getIngredients() {
    return fetch(`${this._address}`, {
        headers: this._headers
    })
    .then((res) => {
        return this._checkResponse(res)
    })
  }

  makeOrder() {
    
  }

}

const allIngredientsApi = new IngredientsApi({
  address: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default allIngredientsApi;