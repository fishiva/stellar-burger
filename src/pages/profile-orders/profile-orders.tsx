import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import store, { useDispatch, useSelector } from '../../services/store';
import {orders as order, getOrders, orders} from '../../services/orderSlice'


export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(order);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
