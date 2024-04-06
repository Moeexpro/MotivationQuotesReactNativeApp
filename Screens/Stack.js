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
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { startClock } from 'react-native-reanimated';
import { View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import RandomQuote from './Random';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Detais from './QuoteDetailScreen';
import Details from './Details'
import SplashScreen from './Splash';

const Stack = createStackNavigator();
const drawer = createDrawerNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };

const stackScreen1 = ({navigation}) => {
    return(
    <Stack.Navigator >
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{title:'',headerShown:false}}/>
      <Stack.Screen name="Home" component={HomeScreen}  options={{
          title: 'Home',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
          }}
    />
             <Stack.Screen name= "QuotesList" component = {Detais}
              options={{
                title: 'Details',
                headerLeft: () => (
                  <View style={{marginLeft: 10}}>
                    <Icon.Button
                      name="ios-menu"
                      size={25}
                      color='#FF0000'
                      backgroundColor='#fff'
                      onPress={() => navigation.openDrawer()}
                    />
                  </View>
                )
                
            }}
             />
              <Stack.Screen name= "ShareScreen" component = {Details}
              options={{
                title: 'Quote Details',
                headerLeft: () => (
                  <View style={{marginLeft: 10}}>
                    <Icon.Button
                      name="ios-menu"
                      size={25}
                      color='#FF0000'
                      backgroundColor='#fff'
                      onPress={() => navigation.openDrawer()}
                    />
                  </View>
                )
                
            }}
             />
            <Stack.Screen name= "AttitudeScreen" component = {AttiudeL}  options={{
          title: 'Attitude Quotes',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
      }} />
  
  <Stack.Screen name= "JokeOfTheDayScreen" component = {JokeOFDay}  options={{
          title: 'Joke OF the Day',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
      }}/>
             <Stack.Screen name= "MemeOfTheDayScreen" component = {MemeOFDay}  options={{
          title: 'Meme of The Day',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
      }} />
            
  
  
            
            <Stack.Screen name= "UserQuotesScreen" component = {UserQuotes} options={{
          title: 'User Quotes',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
      }} />
            
              <Stack.Screen name= "LogIn" component = {LoginScreen} options={{
          title: 'LogIn Screen',
          headerLeft: () => (
            <View style={{marginLeft: 20}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
      }} />
           
           
    </Stack.Navigator>
    )
    
  }
  
  const stackScreen2 = ({navigation}) => {
    return(
    <Stack.Navigator>
     
     <Stack.Screen name= "Random" component = {RandomQuote} options={{
          title: 'Quote of The Day',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
      }} />
            
           
           
    </Stack.Navigator>
    )
    
  }
  
  const stackScreen3 = ({navigation}) => {
    return(
    <Stack.Navigator>
     
            <Stack.Screen name= "PublishQuoteScreen" component = {Publish} options={{
          title: 'Publish Quote',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
      }}  />
           
    </Stack.Navigator>
    )
    
  }
  
  const stackScreen4 = ({navigation}) => {
    return(
      <Stack.Navigator>
            <Stack.Screen name= "MyQuoteScreen" component = {MyQuotes} options={{
          title: 'My Quotes',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
      }} />
      
    </Stack.Navigator>
    )
    
  }


  const StackScreen5 = ({navigation}) =>{
    return(
    <Stack.Navigator>
       <Stack.Screen name= "ProfileSceen" component = {Profile} options={{
          title: 'About Us',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='#FF0000'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          )
          
      }} />
    </Stack.Navigator>
    )
  }
export {stackScreen1,stackScreen2,stackScreen3,stackScreen4,StackScreen5}  