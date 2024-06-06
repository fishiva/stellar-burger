import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo } from '@components';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { IngredientDetails } from '../../components/ingredient-details';
import { getIngredients } from '../../services/indridientsSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getUser } from '../../services/authenticationSlice';
import { ProtectedRoute } from '../../utils/ProtectedRoute';


const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  },[dispatch])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={
          <ProtectedRoute onlyUnAuth> 
            <Login />
          </ProtectedRoute>} 
        />
        <Route path='/register' element={ 
          <ProtectedRoute onlyUnAuth> 
              <Register />
          </ProtectedRoute>} 
        />
        <Route path='/forgot-password' element={
          <ProtectedRoute onlyUnAuth> 
            <ForgotPassword />
          </ProtectedRoute>} 
        />
        <Route path='/reset-password' element={
          <ProtectedRoute onlyUnAuth> 
            <ResetPassword />
          </ProtectedRoute>} 
        />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>} 
        />
        <Route path='/profile/orders' element={
          <ProtectedRoute >
            <ProfileOrders />
          </ProtectedRoute>} 
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/profile/orders/:number' element={
          <ProtectedRoute >
            <OrderInfo />
          </ProtectedRoute>} 
        />
      </Routes>

      <Routes>
        {backgroundLocation && (
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Заказ оформлен ' 
                children={<OrderInfo />}
                onClose={() => navigate(-1)}
              />
            }
          />
        )}
        {backgroundLocation && (
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                children={<IngredientDetails />}
                onClose={() => navigate(-1)}
              />
            }
          />
        )}
        {backgroundLocation && (
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Заказ'
                children={
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                }
                onClose={() => navigate('/profile/orders')}
              />
            }
          />
        )}
      </Routes> 
    </div>
  );
};

export default App;
