import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./(auth)/login";  // ✅ Keep parentheses
import SignupScreen from "./(auth)/signup";  // ✅ Keep parentheses
import CookingEquipmentScreen from "./(tabs)/cooking_equipment";  // ✅ Keep parentheses
import DietaryPreferenceScreen from "./(tabs)/dietary_preference";  
import SeasoningSettings from "./(tabs)/seasoning"; 
import FinishSettingScreen from "./(tabs)/finish_setting";  
import FridgePage from "./(tabs)/fridgePage";
import StartCookingScreen from "./(tabs)/start_cooking";

export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    CookingEquipment: undefined;
    DietaryPreference: undefined; 
    Seasoning: undefined;  
    FinishSetting: undefined;
    FridgePage: undefined;
    StartCooking:undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="CookingEquipment" component={CookingEquipmentScreen} />
            <Stack.Screen name="DietaryPreference" component={DietaryPreferenceScreen} />  
            <Stack.Screen name="Seasoning" component={SeasoningSettings} />
            <Stack.Screen name="FinishSetting" component={FinishSettingScreen} />
            <Stack.Screen name="FridgePage" component={FridgePage} />
            <Stack.Screen name="StartCooking" component={StartCookingScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
