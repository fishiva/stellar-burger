import { getIngredients }  from "./indridientsSlice";
import ingredientsReducer from './indridientsSlice'
describe('ingredientsSlice', function() {
  const initialState = {
    ingredients: [],
    loader: false,
    error: undefined,
    buns: [],
    mains: [],
    sauces: []
  }
  it('обработка запроса getIngredients.pending', function() {
    const state = ingredientsReducer(
    initialState
    ,
    getIngredients.pending('')
  );

    expect(state).toEqual({
      ingredients: [],
      loader: true,
      error: undefined,
      buns: [],
      mains: [],
      sauces: []
    });
  });

  it('обработка запроса getIngredients.fullfield', function() {
    const testData = [{
      _id: "1",
      name: "Ингредиент 1",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0
    }];

    const state = ingredientsReducer({
      ...initialState,
      loader: true 
    },
    getIngredients.fulfilled(testData,'')
  );

    expect(state).toEqual({
      ingredients: testData,
      loader: false,
      error: undefined,
      buns: [],
      mains: [],
      sauces: []
    });
  });


  // it('обработка запроса getIngredients.rejected', function() {
  //   const testError = 'Test Error';
  //   const state = ingredientsReducer({
  //   ...initialState,
  //   loader:true,
  //   error: testError
  //   },
  //   getIngredients.rejected({error:testError},'')
  // );

  //   expect(state).toEqual({
  //     ingredients: [],
  //     loader: false,
  //     error: testError,
  //     buns: [],
  //     mains: [],
  //     sauces: []
  //   });
  // });
});