import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import constructorReducer from '../../services/constructorSlice'
// import {setbun, addIngridients,removeIngridients, moveIngredients, reset} from '../../services/constructorSlice'
import { RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { orderBurger  } from '../../services/orderSlice';
import {reset} from '../../services/constructorSlice';
import { resetOrder } from '../../services/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useSelector((state) => state.constructorItems);

  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const orderRequest = useSelector((state) => state.order.orderRequest);

  const orderModalData = useSelector((state) => state.order.orderModalData) ;
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.authentication.isAuth);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const order = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    order.push(constructorItems.bun._id);
    order.unshift(constructorItems.bun._id);

    if (isAuth) {
      dispatch(orderBurger(order));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(reset());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};  
