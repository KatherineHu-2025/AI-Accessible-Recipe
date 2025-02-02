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
import { RecipeProvider } from "./context/RecipeContext"; 
import RecipeResultsScreen from "./(tabs)/recipeResults";
import RecipeDetailScreen from "./(tabs)/recipeDetail";  // ✅ Import new detail screen


export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    CookingEquipment: undefined;
    DietaryPreference: undefined; 
    Seasoning: undefined;  
    FinishSetting: undefined;
    FridgePage: undefined;
    StartCooking:undefined;
    RecipeProvider:undefined;
    RecipeResults: undefined;
    RecipeDetail: { recipe: { name: string; ingredients: string[]; instructions: string[] } }; // ✅ Add RecipeDetail
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return (
        <RecipeProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="CookingEquipment" component={CookingEquipmentScreen} />
                <Stack.Screen name="DietaryPreference" component={DietaryPreferenceScreen} />  
                <Stack.Screen name="Seasoning" component={SeasoningSettings} />
                <Stack.Screen name="FinishSetting" component={FinishSettingScreen} />
                <Stack.Screen name="FridgePage" component={FridgePage} />
                <Stack.Screen name="StartCooking" component={StartCookingScreen} />
                <Stack.Screen name="RecipeResults" component={RecipeResultsScreen} />
                <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} /> 
            </Stack.Navigator>
        </RecipeProvider>
    );
};

export default AuthNavigator;