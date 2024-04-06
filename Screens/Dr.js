

import React from 'react';
import JokeOFDay from './JokeOfDay';
import MemeOFDay from './MemeOfDay';
import AttiudeL from './Attitude';
import LoginScreen from './LogIn';
import Publish from './PublishQuote';
import MyQuotes from './MyQuotes';
import UserQuotes from './UserQuotes';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../Navigation/DrawerDetails'
import { NavigationContainer } from '@react-navigation/native';
import { startClock } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerActions } from '@react-navigation/native';
import RandomQuote from './Random';
import HomeScreen from './HomeScreen';
import Detais from './QuoteDetailScreen';
import Profile from './Profile';
import { stackScreen1, stackScreen2, stackScreen3, stackScreen4,StackScreen5 } from './Stack';


const Stack = createStackNavigator();
const drawer = createDrawerNavigator();


 const Draw = () => {

return(


<drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <drawer.Screen name="Home" component={stackScreen1} />
           <drawer.Screen name="Random" component={stackScreen2}/>
          <drawer.Screen name= "LogIn" component = {LoginScreen} />
          <drawer.Screen name= "PublishQuoteScreen" component = {stackScreen3} />
          <drawer.Screen name= "MyQuoteScreen" component = {stackScreen4} />
          <drawer.Screen name="ProfileSceen" component={StackScreen5}/>


         
        
        </drawer.Navigator>
)
}

export default Draw;