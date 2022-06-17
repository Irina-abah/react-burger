import { AnyAction } from 'redux';
import { ingredientsReducer } from './ingredients';
import { initialState } from './ingredients';
import * as types from '../actions/ingredients';

describe('ingredients reducer', () => {

  const foodData = [
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
    }
  ]

  const dataCount = [
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
  ]

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
      foodData: dataCount
    };
    const expectedState = {
      ...initialState,
      foodData: dataCount,
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

})