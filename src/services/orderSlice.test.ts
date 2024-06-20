import orderReducer from './orderSlice';
import {getOrders, orderBurger, initialState} from './orderSlice';


describe('orderSlice', function() {
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
  });

  it('обработка запроса getOrders.fullfield', function(){

    const testData = [
      {
          _id: "6671abbe856777001bb1bdff",
          ingredients: [
              "643d69a5c3f7b9001cfa093c",
              "643d69a5c3f7b9001cfa0941",
              "643d69a5c3f7b9001cfa093c"
          ],
          status: "done",
          name: "Краторный био-марсианский бургер",
          createdAt: "2024-06-18T15:46:06.786Z",
          updatedAt: "2024-06-18T15:46:07.216Z",
          number: 43275
      }
    ]
    const state = orderReducer({
      ...initialState
    },
      getOrders.fulfilled(testData,'')
    );
  
      expect(state).toEqual({
        orders: testData,
        feed: null,
        feedorders: [],
        orderConfirmation: null,
        orderRequest: false,
        error: undefined,
        loading: false,
        modalOrder: null,
        orderModalData: null
      });
  });

  it('обработка запроса orderBurger.pending', function(){
    const state = orderReducer({
      ...initialState,
      loading: true
    },
      orderBurger.pending('',[])
    );
  
      expect(state).toEqual({
        orders: [],
        feed: null,
        feedorders: [],
        orderConfirmation: null,
        orderRequest: true,
        error: undefined,
        loading: true,
        modalOrder: null,
        orderModalData: null
      });
  });

  it('обработка запроса orderBurger.fullfield', function(){

    const testData = 
      {
          _id: "6671abbe856777001bb1bdff",
          ingredients: [
              "643d69a5c3f7b9001cfa093c",
              "643d69a5c3f7b9001cfa0941",
              "643d69a5c3f7b9001cfa093c"
          ],
          status: "done",
          name: "Краторный био-марсианский бургер",
          createdAt: "2024-06-18T15:46:06.786Z",
          updatedAt: "2024-06-18T15:46:07.216Z",
          number: 43275
      }
    
    const state = orderReducer({
      ...initialState,
    },
      orderBurger.fulfilled(testData,'',[])
    ); 
    expect(state.orderRequest).toBe(false)
    expect(state.orders).toContainEqual(testData);
    expect(state.orderModalData).toEqual(testData);
  });
})