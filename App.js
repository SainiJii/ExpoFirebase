import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as firebase from 'firebase';
import apiKeys from './config/keys';
import Login from './screens/Login';
import Home from './screens/Home';


const Stack = createStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    
    <NavigationContainer>
      <Stack.Navigator 
      // initialRouteName = {'Home'}
      >
      <Stack.Screen name={'Login'} component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name={'Home'} component={Home} options={{ headerShown: false }}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}