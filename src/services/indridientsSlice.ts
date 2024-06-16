import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";
import { getIngredientsApi } from "@api";
import { RootState } from "./store";


export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients",
    async () => {
        return await getIngredientsApi();
    }
)

interface Iingredients {
    ingredients: TIngredient[],
    loader: boolean
    error: string | undefined
    buns: TIngredient[],
    mains: TIngredient[],
    sauces: TIngredient[]
}

const initialState: Iingredients = {
    ingredients: [],
    loader: false,
    error: undefined,
    buns: [],
    mains: [],
    sauces: []
}

const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
        .addCase(getIngredients.pending, (state) => {
          state.loader = true;
          state.error = undefined;
        })
        .addCase(getIngredients.rejected, (state, action) => {
          state.loader = false;
          state.error = action.error.message;
        })
        .addCase(getIngredients.fulfilled, (state, action) => {
          state.loader = false;
          state.ingredients = action.payload;    
        })
    }
});


export const isloading = (state: RootState) => state.ingredientsSlice.loader;
export const ingredients = (state: RootState) => state.ingredientsSlice.ingredients;
export const bunss = (state: RootState) => state.ingredientsSlice.buns;

export default ingredientsSlice.reducer;