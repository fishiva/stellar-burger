import {getFeedsApi, getOrdersApi, orderBurgerApi, getOrderByNumberApi, TFeedsResponse } from '../utils/burger-api';
import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const getFeeds = createAsyncThunk(
  'orders/getFeeds',
  async () => {
      return await getFeedsApi();
  }
);

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => {
      return await getOrdersApi();
  }
);

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  async (data: string[]) => {
      return (await orderBurgerApi(data)).order;
  }
)

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => {
      return await getOrderByNumberApi(number);
  }
);

interface OrdersInterface {
  orders: TOrder[],
  feed: TFeedsResponse | null,
  feedorders: TOrder[],
  orderConfirmation: TOrder | null,
  orderRequest: boolean,
  error: string | undefined,
  loading: boolean,
  modalOrder: TOrder | null,
  orderModalData: null | TOrder
}

export const initialState : OrdersInterface = {
  orders: [],
  feed: null,
  feedorders: [],
  orderConfirmation: null,
  orderRequest: false,
  error: undefined,
  loading: false,
  modalOrder: null,
  orderModalData: null
}

const orderSlice = createSlice ({
  name: 'orderSlice',
  initialState,
  reducers:{
    resetOrder(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.feedorders = action.payload.orders;
      })

      .addCase(getFeeds.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })

      .addCase(getOrders.fulfilled, (state,action) => {
        state.loading = false;
        state.orders = action.payload
      })

      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.orderRequest = false;
        state.orderModalData = action.payload;

      })      

      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        // state.loading = false;
        state.modalOrder = action.payload.orders[0];
      })
  }
})

export const orders  = (state: RootState) => state.order.orders;

export default orderSlice.reducer;

export const { resetOrder } = orderSlice.actions;