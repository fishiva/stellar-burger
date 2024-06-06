import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './indridientsSlice'
import { combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import constructorReducer from './constructorSlice';
import orderReducer from './orderSlice';
import authenticationSlice from './authenticationSlice';


const rootReducer = combineReducers({
  ingredientsSlice: ingredientsReducer,
  constructorItems : constructorReducer,
  order: orderReducer,
  authentication: authenticationSlice
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
