
import React from 'react';
import JokeOFDay from './Screens/JokeOfDay';
import MemeOFDay from './Screens/MemeOfDay';
import AttiudeL from './Screens/Attitude';
import LoginScreen from './Screens/LogIn';
import Publish from './Screens/PublishQuote';
import MyQuotes from './Screens/MyQuotes';
import UserQuotes from './Screens/UserQuotes';





import { HeaderBackButton } from '@react-navigation/stack';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './Navigation/DrawerDetails';
import { NavigationContainer } from '@react-navigation/native';
import { startClock } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerActions } from '@react-navigation/native';
import RandomQuote from './Screens/Random';
import HomeScreen from './Screens/HomeScreen';
import Detais from './Screens/QuoteDetailScreen';
import Draw from './Screens/Dr';

const Stack = createStackNavigator();
const drawer = createDrawerNavigator();


const App = () => {





  return (
    <NavigationContainer>
     
    <Draw/>

    </NavigationContainer>
  )
}
export default App;
