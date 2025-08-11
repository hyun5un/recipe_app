import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 기본 화면들
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import LoginScreen from '../screens/hyunsun/LoginScreen';
import SignupScreen from '../screens/hyunsun/SignupScreen';

// 프로필 관련 화면들
import ProfileScreen from '../screens/profile/ProfileScreen';
import SelectAllergyScreen from '../screens/profile/SelectAllergyScreen';
import SelectToolScreen from '../screens/profile/SelectToolScreen';
import SelectIngredientsScreen from '../screens/profile/SelectIngredientsScreen';

// ## '나의 레시피' 관련 스크린 4개 추가 ##
import MyRecipe from '../screens/MyRecipe/MyRecipe';
import AddRecipeScreen from '../screens/MyRecipe/AddRecipeScreen';
import EditRecipeScreen from '../screens/MyRecipe/EditRecipeScreen';
import MyRecipeDetailScreen from '../screens/MyRecipe/MyRecipeDetailScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        {/* 기본 화면 */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        
        {/* 프로필 화면 */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SelectAllergyScreen" component={SelectAllergyScreen} />
        <Stack.Screen name="SelectToolScreen" component={SelectToolScreen} />
        <Stack.Screen name="SelectIngredientsScreen" component={SelectIngredientsScreen} />
        
        {/* ## '나의 레시피' 관련 스크린 4개 등록 ## */}
        <Stack.Screen name="MyRecipe" component={MyRecipe} />
        <Stack.Screen name="AddRecipeScreen" component={AddRecipeScreen} />
        <Stack.Screen name="EditRecipeScreen" component={EditRecipeScreen} />
        <Stack.Screen name="MyRecipeDetailScreen" component={MyRecipeDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;