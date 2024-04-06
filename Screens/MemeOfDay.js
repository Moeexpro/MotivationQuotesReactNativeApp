import Tts from 'react-native-tts';
import React, { useState, useEffect, useRef } from 'react';

import RNFetchBlob from 'rn-fetch-blob';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';
import ViewShot,{captureRef} from "react-native-view-shot";

import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Share from 'react-native-share'
import {View, Text, TouchableOpacity,StatusBar, Linking, PermissionsAndroid,ImageBackground,Image,Dimensions,ScrollView,RefreshControlBase} from 'react-native';
import  admob,{BannerAd, BannerAdSize,TestIds,InterstitialAd,AdEventType,MaxAdContentRating} from '@react-native-firebase/admob'

import Icon from 'react-native-vector-icons/FontAwesome5'


Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);


const MemeOFDay = () => {

    const [Meme, setMeme] = useState('Loading...');
    const [Title,SetTitle] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const viewShotRef = useRef();
   

   const getPermissions = async ()=>{
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Needs Storage Permissions",
            message:
              "Quote and Jokes App Needs Storage Permissions to Download/Share Files.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission Granted")
        } else {
          this.refs.toast.show('Saving Failed! Storage Permission Required.');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    const rand = () => {
      admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,
  
        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,
  
        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
    
       
      });
         
      fetch("https://meme-api.herokuapp.com/gimme").then(res => res.json()).then(result => {
        setMeme(result.url);
        SetTitle(result.title);
        setIsLoading(false);
      })
    }
  
    const randomQuote = async() => {
     
         

     await fetch("https://meme-api.herokuapp.com/gimme").then(res => res.json()).then(result => {
        setMeme(result.url);
        SetTitle(result.title);
        setIsLoading(false);
      })
    }

    const getInterAd = ()=>{
      // Create a new instance
      const interstitialAd = InterstitialAd.createForAdRequest('ca-app-pub-1427919207889091/5614052089');
      // Add event handlers
      interstitialAd.onAdEvent((type, error) => {
          if (type === AdEventType.LOADED) {
              interstitialAd.show();
          }
      });
      // Load a new advert
      interstitialAd.load();
    }


    const ShareQuote = async(er) => {
    
     
    
         
      let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', er)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then((base64Data) => {
        // here's base64 encoded image
        var imageUrl = 'data:image/png;base64,' + base64Data;
        let shareImage = {
          
          url: imageUrl,
          // urls: [imageUrl, imageUrl], // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
        };
        Share.open(shareImage)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });
        // remove the file from storage
        return fs.unlink(imagePath);
      });
   
     
  }
  
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  const imageWidth = dimensions.width;
  useEffect(()=>{
    
    randomQuote()
    getPermissions();
    
  })
   
  
  
  
    return (
      
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5372F0',
        }} >
          <ImageBackground source={require('../assets/images/Meme.jpg')} style={{height:'100%',width:'100%'}} >
          <ScrollView>
          <StatusBar barStyle="light-content" />
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 26,
              fontWeight: '600',
              color: '#333',
              marginBottom: 20,
            }}>
            Meme of the Day
          </Text>
          <FontAwesome5
            name="quote-left"
            style={{fontSize: 20, marginBottom: -12}}
            color="#000"
          />
         <View>
       <ViewShot ref={viewShotRef}>
        
          <Image source={{uri:Meme}} style={{height:400,width:350,resizeMode:'contain'}} />
          </ViewShot>
        
          </View>
          <FontAwesome5
            name="quote-right"
            style={{
              fontSize: 20,
              textAlign: 'right',
              marginTop: -20,
              marginBottom: 20,
            }}
            color="#000"
          />
          <Text
            style={{
              textAlign: 'right',
              fontWeight: '300',
              fontStyle: 'italic',
              fontSize: 16,
              color: '#000',
            }}>
            —— {Title}
          </Text>
          <TouchableOpacity
            onPress={rand}
            style={{
              backgroundColor: isLoading ? 'rgba(83, 114, 240, 0.7)' : 'rgba(83, 114, 240, 1)',
              padding: 20,
              borderRadius: 30,
              marginVertical: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              {isLoading ? "Loading..." : "New Meme"}
            </Text>
          </TouchableOpacity>


         
          <View style={{flexDirection: 'row',justifyContent:'space-around'}}>
          <TouchableOpacity  style={{ width:"25%",padding:5}} onPress={
       ()=>{
           ShareQuote(Meme)
       }
   }>
   <Icon name="share" color='#FF6347' size={20} style={{alignSelf:"center"}}/>       
</TouchableOpacity> 
  
            
            
           

          </View>
        </View>
      
                
            </ScrollView>
        </ImageBackground>
      </View>
    );
  };
  
  export default MemeOFDay;

