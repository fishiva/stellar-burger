import { createSlice, PayloadAction, nanoid} from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient } from "@utils-types";
import { ingredients } from "./indridientsSlice";


interface IcostructorSlice { 
    bun: TIngredient | null,
    ingredients: TConstructorIngredient[];
}

const initialState: IcostructorSlice  = {
    bun: null,
    ingredients: []
}

const contructorSlice = createSlice({

    name: "constructorSlice",
    initialState,
    reducers: {
        setbun:( state, action: PayloadAction<TIngredient>)  => {
            state.bun = action.payload;
        },

        addIngridients: {
          reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
              state.ingredients.push(action.payload);
          },
          prepare: (ingredients: TIngredient) => {
                      const key = nanoid();
                      return { payload: {...ingredients, id: key } };
          }
        },

        removeIngridients: (state, action: PayloadAction<string>) => {
          state.ingredients = state.ingredients.filter( (ingredient) => ingredient.id !== action.payload)
        },

        moveIngredients: (
          state,
          action: PayloadAction<{ index: number; newIndex: number }>
        ) => {
          const { index, newIndex } = action.payload;
          const finalIndex = index + newIndex;
          if (finalIndex >= 0 && finalIndex < state.ingredients.length) {
            const a = state.ingredients[index];
            state.ingredients[index] = state.ingredients[finalIndex];
            state.ingredients[finalIndex] = a;
        }},

        reset: (state) => {
          state.bun = null;
          state.ingredients = [];
        }
    }
})

export default contructorSlice.reducer;

export const {setbun, addIngridients,removeIngridients, moveIngredients, reset} = contructorSlice.actions;