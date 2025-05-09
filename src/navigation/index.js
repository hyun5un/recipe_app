import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

import Profile from '../screens/ProfileScreen';  
import ProfileEdit from '../screens/ProfileEditScreen'; 
import Select_cate from '../components/select_cate';
import Select_ingre from '../components/select_ingre';
import Select_main from '../components/select_main';
import LoadingScreen from '../screens/LoadingScreen';
import Recommend from '../components/recommend';
import SelectAllergyScreen from '../screens/SelectAllergyScreen';
import SelectToolScreen from '../screens/SelectToolScreen';
import SelectIngredientsScreen from '../screens/SelectIngredientsScreen';
import TodaysIngredient from '../screens/TodaysIngredient';
import AiRecommend from '../screens/AiRecommend';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="Select_cate" component={Select_cate} />
        <Stack.Screen name="Select_ingre" component={Select_ingre} />
        <Stack.Screen name="Select_main" component={Select_main} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Recommend" component={Recommend} />
        <Stack.Screen name="SelectAllergyScreen" component={SelectAllergyScreen} />
        <Stack.Screen name="SelectToolScreen" component={SelectToolScreen} />
        <Stack.Screen name="SelectIngredientsScreen" component={SelectIngredientsScreen} />
        <Stack.Screen name="TodaysIngredient" component={TodaysIngredient} />
        <Stack.Screen name="AiRecommend" component={AiRecommend} />
       
  

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
