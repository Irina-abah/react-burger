import { AnyAction } from 'redux';
import { ingredientsReducer } from './ingredients';
import { initialState } from './ingredients';
import * as types from '../actions/ingredients';

describe('ingredients reducer', () => {

  const data = [
    {
       "_id":"60666c42cc7b410027a1a9b1",
       "name":"Краторная булка N-200i",
       "type":"bun",
       "proteins":80,
       "fat":24,
       "carbohydrates":53,
       "calories":420,
       "price":1255,
       "image":"https://code.s3.yandex.net/react/code/bun-02.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
       "__v":0,
       "count":0,
       "index": 0,
        "dragId": 0,
        "num": 0
    },
    {
       "_id":"60666c42cc7b410027a1a9b5",
       "name":"Говяжий метеорит (отбивная)",
       "type":"main",
       "proteins":800,
       "fat":800,
       "carbohydrates":300,
       "calories":2674,
       "price":3000,
       "image":"https://code.s3.yandex.net/react/code/meat-04.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
       "__v":0,
       "count":0,
       "index": 0,
        "dragId": 0,
        "num": 0
    },
    {
       "_id":"60666c42cc7b410027a1a9b6",
       "name":"Биокотлета из марсианской Магнолии",
       "type":"main",
       "proteins":420,
       "fat":142,
       "carbohydrates":242,
       "calories":4242,
       "price":424,
       "image":"https://code.s3.yandex.net/react/code/meat-01.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
       "__v":0,
       "count":0,
       "index": 0,
        "dragId": 0,
        "num": 0
    }
  ];

  const testBun = {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0,
    "count":0,
    "index": 0,
     "dragId": 0,
     "num": 0
 };

  it('should return unitial state', () => {
    expect(ingredientsReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should handle Get Ingredients request', () => {
    const action = {
      type: types.GET_INGREDIENTS_REQUEST
    };
    const expectedState = {
      ...initialState,
      foodDataRequest: true,
    };

    expect(ingredientsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Get Ingredients success', () => {
    const action = {
      type: types.GET_INGREDIENTS_SUCCESS,
      foodData: data
    };
    const expectedState = {
      ...initialState,
      foodData: data,
      foodDataRequest: false,
      foodDataFailed: false
    };

    expect(ingredientsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle Get Ingredients error', () => {
    const action = {
      type: types.GET_INGREDIENTS_FAILED
    };
    const expectedState = {
      ...initialState,
      foodDataFailed: true,
      foodDataRequest: false,
    };

    expect(ingredientsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle adding bun', () => {
    const action = {
      type: types.ADD_BUN,
      bun: testBun
    };
    const expectedState = {
      ...initialState,
      constructor: {
        ...initialState.constructor,
        selectedBun: testBun
      }
    };

    expect(ingredientsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle adding inner ingredient', () => {
    const action = {
      type: types.ADD_INNER_ITEM,
      item: data[1]
    };
    const expectedState = {
      ...initialState,
      constructor: {
        ...initialState.constructor,
        innerItems: [ ...initialState.constructor.innerItems, data[1]]
      }
    };

    expect(ingredientsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle removing inner ingredient', () => {
    const action = {
      type: types.REMOVE_INNER_ITEM,
      item: data[1]
    };
    const expectedState = {
      ...initialState,
      constructor: {
        ...initialState.constructor,
        innerItems: [...initialState.constructor.innerItems].filter(item => item.dragId !== action.item.dragId)
      }
    };

    expect(ingredientsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle updating constructor list', () => {
    const action = {
      type: types.UPDATE_CONSTRUCTOR_LIST,
      updatedItems: data.slice(1)
    };
    const expectedState = {
      ...initialState,
      constructor: {
        ...initialState.constructor,
        innerItems: data.slice(1)
      }
    };

    expect(ingredientsReducer(initialState, action)
    ).toEqual(expectedState)
  })

  it('should handle reset constructor', () => {
    const action = {
      type: types.RESET_CONSTRUSTOR,
      innerItems: data.slice(1)
    };
    const expectedState = {
      ...initialState,
      constructor: {
        ...initialState.constructor,
        selectedBun: null,
        innerItems: []
      }
    };

    expect(ingredientsReducer(initialState, action)
    ).toEqual(expectedState)
  })

})