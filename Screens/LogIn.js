import { useEffect, useState } from "react";
import SocialButton from "./SocialButton";
import { GoogleSignin } from '@react-native-community/google-signin'
import React from 'react'
import { View,Text,PermissionsAndroid,RefreshControl } from "react-native";
import auth from '@react-native-firebase/auth'


const LoginScreen = ({navigation}) => {

const [LoggedIn,SetLoggedIn] = useState(false)
const [UserName,SetUserName] = useState('')

const [refreshing,setRefreshing]=useState(false);

  

  const GoogleLogOut = async() =>{
    try {
      SetLoggedIn(false)
      
await GoogleSignin.revokeAccess();
      await auth().signOut();
      navigation.navigate('Home')
    
  } catch (e) {
      console.log(e);
  }
  }


  const GoogleLogIn = async() =>{
    try
    {
      
        const { idToken } = await GoogleSignin.signIn();
        
            
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
        // Sign-in the user with the credential
       SetLoggedIn(true)
        return auth().signInWithCredential(googleCredential);
       
        
      
       
    }
    catch(error) {
        console.log(error)
    }
    
  }
  const onRefresh = () => {
    setRefreshing(true);
    if(auth().currentUser)
    {
      SetLoggedIn(true)
      SetUserName(auth().currentUser.displayName)
     
    }
    GoogleSignin.configure({
        webClientId: '204097252941-sf9ci88vb0kpfahhl6j838uqnhc5t7ml.apps.googleusercontent.com',
      });
    setTimeout(() => {
      setRefreshing(false)
    }, 100)};
    useEffect(() => {
    
      setTimeout(() => {
        onRefresh()
      
       },1000)
       if(auth().currentUser)
       {
         SetLoggedIn(true)
         SetUserName(auth().currentUser.displayName)
       }
       GoogleSignin.configure({
           webClientId: '204097252941-sf9ci88vb0kpfahhl6j838uqnhc5t7ml.apps.googleusercontent.com',
         });
    
      
    },[]);

  
  return (
    <View style={{flex:1, alignItems:'center',alignContent:'center',justifyContent:'center',backgroundColor:'#000000'}}>
     

     {LoggedIn? (
<View style={{backgroundColor:'#000000',alignContent:'center',alignItems:'center'}}>
  <Text>Welcome {UserName}</Text>

<View style={{alignItems:'center'}}>
 <SocialButton 
 
 buttonTitle="Log Out"
 btnType="google"
 color="#de4d41"
 backgroundColor="#f5e7ea"
 onPress={() => {GoogleLogOut()}}
/>
</View>
</View>
     ):(

      <SocialButton 
      buttonTitle="Sign In with Google"
      btnType="google"
      color="#f5e7ea"
      backgroundColor="#de4d41"
      onPress={() => {GoogleLogIn()}}
    />
     )}
      
     

    </View>
  );
};

export default LoginScreen;

