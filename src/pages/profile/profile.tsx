import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import store, { useDispatch, useSelector } from '../../services/store';
import { users } from '../../services/authenticationSlice';
import { updateUser } from '../../services/authenticationSlice';
import { updateUserApi } from '@api';
export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const user = useSelector((store) => store.authentication.data.user);
  // const user = {
  //   name: '',
  //   email: ''
  // };

  const [isSubmit, setIsSubmit] = useState(false);

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || '',
    }));
  }, [user]);

  const isFormChanged =
    formValue.name === user.name || 
    formValue.email === user?.email ||
    !!formValue.password;

console.log(isFormChanged);
console.log(user.name);
console.log(formValue.name);

  const dispatch = useDispatch();
  
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmit(true);

    const user = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password
    }
    // dispatch(updateUser(formValue));
    updateUserApi(user).finally(()=> setIsSubmit(false));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      isSubmit = {isSubmit}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
