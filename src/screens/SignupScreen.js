import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthForm
                headerText="Sign Up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                // onSubmit={({ email, password }) => signup({ email, password })}
                onSubmit={signup}
            />
            <NavLink
                routeName="Signin"
                text="Already have an account? Sign in instead!"
            />
        </View>
    );
};

// If we define navigationOptions and assign it a function, we cam return an object that's going to customize our StackNavigator, and change the way in which React Navigation behaves and shows this screen!
// Here we want to hide the header...
SignupScreen.navigationOptions = () => {
    return {
        header: null
    };
};
// OR, we don't have to assign it a function (if we don't need to send it any props that the function needs to use), we can just assign an object (with our configuration options) to navigationObjects
// SignupScreen.navigationOptions = {
//     header: null
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    }
});

export default SignupScreen;