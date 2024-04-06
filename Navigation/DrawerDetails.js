import React, { useEffect } from 'react';
import { View, StyleSheet,Button,PermissionsAndroid,Image } from 'react-native';
import SocialButton from '../Screens/SocialButton';
import auth from '@react-native-firebase/auth'
import { Block, Text, theme } from "galio-framework";

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { GoogleSignin } from '@react-native-community/google-signin'
import RandomQuote from '../Screens/Random';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import  {BannerAd, BannerAdSize,TestIds,InterstitialAd,AdEventType} from '@react-native-firebase/admob'


export function DrawerContent(props) {

    const GoogleLogIn = async() =>{
      try
      {
        const interstitialAd = InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/1033173712');
    
        // Add event handlers
        interstitialAd.onAdEvent((type, error) => {
            if (type === AdEventType.LOADED) {
                interstitialAd.show();
            }
        });
    
        // Load a new advert
        interstitialAd.load();
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS,
          {
            title: " Quotes & Jokes hub App Account Permission",
            message:
              "Quotes & Jokes hub App needs access to your accounts  " +
              "so you can login.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const { idToken } = await GoogleSignin.signIn();
              
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          
          // Sign-in the user with the credential
          return auth().signInWithCredential(googleCredential);
          
        } else {
          console.log("permission denied");
        }
     
         
      }
      catch(error) {
          console.log(error)
      }
      
    }

    const GoogleLogOut = async() => {
        auth().signOut().then(()=>{props.navigation.navigate('Home')})
         
    }

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '204097252941-sf9ci88vb0kpfahhl6j838uqnhc5t7ml.apps.googleusercontent.com',
          });
    })
    
    return(
       
          <View style={{flex:1}}>
     
            <DrawerContentScrollView {...props}>
            </DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            
                           
                        </View>

                       
                    </View>

                   
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home" 
                                color='#FF6347'
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                       
                        
                        
                       <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="quote-right" 
                                color='#FF6347'
                                size={size}
                                />
                            )}
                            label="Quote of Day"
                            onPress={() => {props.navigation.navigate('Random')}}
                        />


                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="feather-alt" 
                                color='#FF6347'
                                size={size}
                                />
                            )}
                            label="Publish Quote"
                            onPress={()=>{props.navigation.navigate('PublishQuoteScreen')}}
                           
                        />
                        

<DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="id-badge" 
                                color='#FF6347'
                                size={size}
                                />
                            )}
                            label="About Us"
                            onPress={()=>{props.navigation.navigate("ProfileSceen")}}
                           
                        />
                         
                         
                        
                     
                      
                       
                      
                      
                        
                        
                       
                  
               </View>
          
            </View>
        
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    container: {
      flex: 1
    },
    header: {
      paddingHorizontal: 28,
      paddingBottom: theme.SIZES.BASE,
      paddingTop: theme.SIZES.BASE * 3,
      justifyContent: "center"
    },
    headerIcon: {
      marginTop: -20
    },
    logo: {
      height: 40,
      width: 37
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });