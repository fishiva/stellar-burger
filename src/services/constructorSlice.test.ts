import constructorSlice, {
    addIngridients,
    removeIngridients,
    moveIngredients,
  } from "./constructorSlice";
import { nanoid } from "nanoid";
import { jest } from '@jest/globals';
// import { initialState } from "./indridientsSlice";
import {IcostructorSlice} from './constructorSlice'
const ingredients =  [
  {
      _id: "1",
      name: "Ингредиент 1",
      type: "main",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  },
  {
      _id: "2",
      name: "Ингредиент 2",
      type: "main",
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  },
  {
      _id: "3",
      name: "Ингредиент 3",
      type: "main",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
  },
];

describe("constructorSlice", () => {

  it("обработка экшена addIngridients", () => {
   
    const testData = {
      _id: "0345678765434567890987",
      name: "Ингредиент 0",
      type: "main",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    }

    const state = constructorSlice({
      bun: null,
      ingredients: [],
    },
    addIngridients(testData));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).not.toBeNull();
    expect(state.ingredients[0].id).not.toBeUndefined();
    expect(state.ingredients[0]._id).toEqual('0345678765434567890987')
    expect(state.ingredients[0].name).toEqual('Ингредиент 0')
    });

  it("обработка экшена addIngridients для buns", () => {
  
    const testData = {
      _id: "0345678765434567890987",
      name: "Ингредиент 0",
      type: "main",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    }

    const state = constructorSlice({
      bun: null,
      ingredients: [],
    },
    addIngridients(testData));

    expect(state.bun).not.toBeNull;
    });

  it("обработка экшена removeIngridients", () => {
    const state = {
      bun: null,
      ingredients: [
        {
          ...ingredients[0],
          id: 'key1',
        },
        {
          ...ingredients[1],
          id: 'key2',
        },
      ],
    };
    const action = removeIngridients(state.ingredients[0].id);
    const newState = constructorSlice(state, action);
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual(state.ingredients[1]);
  });

  it("обработка экшена moveIngredients", () => {
    const ing_1 = {
      _id: "1",
      name: "Ингредиент 1",
      type: "main",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      id: '1'
    };
    const ing_2 = {
      _id: "2",
      name: "Ингредиент 2",
      type: "main",
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
      id: '2'
  };

  const initialState: IcostructorSlice = { bun: null,ingredients: [ing_1 , ing_2]};
    const state = constructorSlice(
    initialState,
    moveIngredients({ index: 0, newIndex: 1 }));
  
    expect(state.ingredients).toEqual([ing_2 , ing_1]);
  });
});