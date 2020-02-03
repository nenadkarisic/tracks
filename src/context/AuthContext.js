import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'signout':
            return { token: null, errorMessage: '' }
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('Signup');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ email, password }) => {
    try {
        // make api request to signup with that email and password
        const response = await trackerApi.post('/signup', { email, password });

        // Store the token
        await AsyncStorage.setItem('token', response.data.token);

        // if we signup, then we modify our state, and say that we are authenticated
        dispatch({ type: 'signin', payload: response.data.token });

        // navigate to main Flow, or for example TrackList
        navigate('TrackList');

    } catch (err) {
        // if signing up fails, we probably need to reflect an error message somewhere
        dispatch({ type: 'add_error', payload: 'Something went wrong with signup' });
    }
};



const signin = dispatch => async ({ email, password }) => {
    try {
        // Try to signin
        const response = await trackerApi.post('/signin', { email, password });

        // Store the token
        await AsyncStorage.setItem('token', response.data.token);

        // if we sign in, then we modify our state, and say that we are authenticated
        dispatch({ type: 'signin', payload: response.data.token });

        // navigate to main Flow, or for example TrackList
        navigate('TrackList');
    } catch (err) {
        console.log(err);
        // Handle error by showing error message
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
    }
};


const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
};


// Older form of this function before refactoring to make it compact
// const signout = dispatch => {
//     return () => {

//     };
// };


export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);