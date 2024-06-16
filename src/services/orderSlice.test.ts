import orderReducer from './orderSlice';
import {getOrders, orderBurger} from './orderSlice';

describe('orderSlice', function() {
  const initialState = {
    orders: [],
    feed: null,
    feedorders: [],
    orderConfirmation: null,
    orderRequest: false,
    error: undefined,
    loading: false,
    modalOrder: null,
    orderModalData: null
  };

  it('обработка запроса getOrders.pending', function(){
    const state = orderReducer({
      ...initialState,
      loading: true
    }
      ,
      getOrders.pending('')
    );
  
      expect(state).toEqual({
        orders: [],
        feed: null,
        feedorders: [],
        orderConfirmation: null,
        orderRequest: false,
        error: undefined,
        loading: true,
        modalOrder: null,
        orderModalData: null
      });
  })

  it('обработка запроса getOrders.fullfield', function(){
    
    const state = orderReducer(
      initialState,
      getOrders.pending('')
    );
  
      expect(state).toEqual({
        orders: [],
        feed: null,
        feedorders: [],
        orderConfirmation: null,
        orderRequest: false,
        error: undefined,
        loading: true,
        modalOrder: null,
        orderModalData: null
      });
  })

})