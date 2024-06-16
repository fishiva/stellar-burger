import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { users } from '../../services/authenticationSlice';
export const AppHeader: FC = () => <AppHeaderUI userName = {useSelector(users).name} />;
