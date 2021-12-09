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
    return fetch(`${this._address}/ingredients`, {
        headers: this._headers
    })
    .then((res) => {
        return this._checkResponse(res)
    })
  }

  makeOrder(items) {
    return fetch(`${this._address}/orders`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        ingredients: items
      })
  })
  .then((res) => {
      return this._checkResponse(res)
  })
  }

}

const allIngredientsApi = new IngredientsApi({
  address: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default allIngredientsApi;