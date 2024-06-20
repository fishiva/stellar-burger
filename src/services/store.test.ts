import ingredientsReducer from './indridientsSlice'
import constructorReducer from './constructorSlice';
import orderReducer from './orderSlice';
import authenticationSlice from './authenticationSlice';
import {rootReducer} from './store'

describe('RootReducer inicialization', function() {
    it('test rootReducer-1',() => {
    const initAction = {type: '@@INIT'};
    const state = rootReducer(undefined,initAction);

    expect(state).toEqual({
        ingredientsSlice: ingredientsReducer(undefined,initAction),
        constructorItems : constructorReducer(undefined,initAction),
        order: orderReducer(undefined,initAction),
        authentication: authenticationSlice(undefined,initAction)
    });
    });
});

describe('RootReducer inicialization', function() {
    it('test rootReducer-2', () => {
    const fakeAction = {type: 'FAKE'};
    const state = rootReducer(undefined,fakeAction);

    expect(state).toEqual({
        ingredientsSlice: ingredientsReducer(undefined,fakeAction),
        constructorItems : constructorReducer(undefined,fakeAction),
        order: orderReducer(undefined,fakeAction),
        authentication: authenticationSlice(undefined,fakeAction)
    });
    });
});