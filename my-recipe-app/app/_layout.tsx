import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./(auth)/login";
import SignupScreen from "./(auth)/signup";

// ✅ Define navigation types
export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
};

// ✅ Create the stack navigator
const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
};

// ✅ Remove NavigationContainer from here
export default AuthNavigator;
