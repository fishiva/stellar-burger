import { TUser } from '@utils-types';
import userReducer,{registerUser,loginUser,updateUser,logout,initialState} from './authenticationSlice';
import {Iauthentication} from './authenticationSlice'
import { TAuthResponse, refreshToken } from '@api';
import { error } from 'console';

describe('authenticationSlice', function() {
    const userRegData = {
        email: 'fishchenko01@yandex.ru',
        name: 'Ivan',
        password: '12345'
    };

    const userTest = {
        success: true,
        user: {
            email: 'fishchenko01@yandex.ru',
            name: 'Ivan' 
        }
    }

    const userTestResponse = {
        success: true,
        refreshToken: '1001',
        accessToken: '1010',
        user: {
            email: 'fishchenko01@yandex.ru',
            name: 'Ivan' 
        }
    };

    it('Проверка registerUser.pending', () => {
        const expectedState: Iauthentication = {
            ...initialState,
            isLoading: true,
            isAuth: false
        };

        const actualState = userReducer({
            ...initialState,
            isLoading: false
        },
        registerUser.pending('', userRegData)
    );

    expect(actualState).toEqual(expectedState);
    });

    it('Проверка registerUser.fullfield', () => {
        const expectedState = {
            ...initialState,
            data: {
                ...initialState.data,
                user: {
                    ...initialState.data.user,
                    email: 'fishchenko01@yandex.ru',
                    name: 'Ivan'
                }
            },
            isAuth: true
        };

        const actualState = userReducer({
            ...initialState,
            isAuth: false
        },
        registerUser.fulfilled(userTestResponse,'', userRegData)
    );

    expect(actualState).toEqual(expectedState);
    });

    it('Проверка registerUser.rejected', () => {
        const testError = new Error('test Error');

        const expectedState = {
            ...initialState,
            error:testError.message
        };

        const actualState = userReducer({
            ...initialState,
            isAuth: false
        },
        registerUser.rejected(testError,'', userRegData)
    );

    expect(actualState).toEqual(expectedState);
    });
    
    it('Проверка loginuser.pending', () => {
        const expectedState: Iauthentication = {
            ...initialState,
            isLoading: true,
            isAuth: false
        };

        const actualState = userReducer({
            ...initialState,
            isLoading: false
        },
        loginUser.pending('', userRegData)
    );

    expect(actualState).toEqual(expectedState);
    });

    it('Проверка loginuser.fullfield', () => {
        const expectedState = {
            ...initialState,
            data: {
                ...initialState.data,
                accessToken: '',
                refreshToken:'',
                success: true,
                user: {
                    ...initialState.data.user,
                    email: 'fishchenko01@yandex.ru',
                    name: 'Ivan',
                }
            },
            isAuth: true
        };

        const actualState = userReducer({
            ...initialState,
            isAuth: true
        },
        loginUser.fulfilled(userTestResponse,'', userRegData)
    );

    expect(actualState).toEqual(expectedState);
    });

    it('Проверка loginuser.rejected', () => {
        const testError = new Error('test Error');

        const expectedState = {
            ...initialState,
            error:testError.message
        };

        const actualState = userReducer({
            ...initialState,
            isAuth: false
        },
        loginUser.rejected(testError,'', userRegData)
    );

    expect(actualState).toEqual(expectedState);
    });

    it('Проверка updateUser.fullfield', () => {
        const expectedState: Iauthentication = {
            ...initialState,
            isAuth: true,
            isAuthCheckedSelector: true,
            data: {
                ...initialState.data,
                user: {
                    email:'fishchenko01@yandex.ru',
                    name:'Ivan'
                }
            }
        };

        const actualState = userReducer({
            ...initialState,
            isAuth: true
        },
        updateUser.fulfilled(userTestResponse,'',userRegData)
    );

    expect(actualState).toEqual(expectedState);
    });

    it('Проверка updateUser.rejected', () => {
        const testError = new Error('test Error');

        const expectedState = {
            ...initialState,
            error: testError.message
        };

        const actualState = userReducer({
            ...initialState,
            isAuthCheckedSelector: false
        },
        updateUser.rejected(testError,'',userRegData)
    );

    expect(actualState).toEqual(expectedState);
    });


    it('Проверка logout.fullfield', () => {
        const expectedState: Iauthentication = {
            ...initialState,
            isAuth: false,
            data: {
                ...initialState.data,
                success: true,
                user: {
                    email:'',
                    name:''
                }
            }
        };

        const actualState = userReducer({
            ...initialState,
            isAuth: true
        },
        logout.fulfilled(userTestResponse,'')
    );

    expect(actualState).toEqual(expectedState);
    });

    it('Проверка logout.rejected', () => {
        const testError = new Error('test Error');

        const expectedState = {
            ...initialState,
            error: testError.message
        };

        const actualState = userReducer({
            ...initialState,
        },
        logout.rejected(testError,'')
    );

    expect(actualState).toEqual(expectedState);
    });
    
})