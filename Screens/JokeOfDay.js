import Tts from 'react-native-tts';
import React, { useState, useEffect } from 'react';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';
import Share from 'react-native-share'
import Fontisto from "react-native-vector-icons/Fontisto";
import {View, Text, TouchableOpacity,StatusBar, Linking, PermissionsAndroid,ImageBackground} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/FontAwesome5'
import  {BannerAd, BannerAdSize,TestIds,InterstitialAd,AdEventType} from '@react-native-firebase/admob'

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);


const JokeOFDay = () => {

    const [Joke, setJoke] = useState('Loading...');
   
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
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
         alert('Saving Failed! Storage Permission Required.');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    
  
    const randomQuote = () => {
      setIsLoading(true);
      fetch("https://api.icndb.com/jokes/random").then(res => res.json()).then(result => {
        setJoke(result.value.joke);
        
        setIsLoading(false);
      })
    }
    const ShareQuote = async(er) => {
      const sharingoptions = {
          message:er
      }

     
      try
      {
        const shareResponse = await Share.open(sharingoptions)
      }
    
  
    
        catch(error) {
            console.log(error)
        }

  }
  
    useEffect(() => {
      randomQuote();
    getPermissions();
    }, []);
  
    const speakNow = () => {
      Tts.stop();
      Tts.speak(Joke );
      Tts.addEventListener('tts-start', (event) => setIsSpeaking(true));
      Tts.addEventListener('tts-finish', (event) => setIsSpeaking(false));
    }
  
    const copyToClipboard = () => {
      Clipboard.setString(Joke);
      Snackbar.show({
        text: 'Joke copied!',
        duration: Snackbar.LENGTH_SHORT,
      });    
    }
  
    const tweetNow = () => {
      const url = "https://twitter.com/intent/tweet?text=" + Quote;
      Linking.openURL(url);
    }
  
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5372F0',
        }}>
          <ImageBackground source={require('../assets/images/Joker.jpg')} style={{height:'100%',width:'100%'}} >
          <StatusBar barStyle="light-content" />
        <View
          style={{
            width: '90%',
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
            Joke of the Day
          </Text>
          <FontAwesome5
            name="quote-left"
            style={{fontSize: 20, marginBottom: -12}}
            color="#000"
          />
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              lineHeight: 26,
              letterSpacing: 1.1,
              fontWeight: '400',
              textAlign: 'center',
              marginBottom: 10,
              paddingHorizontal: 30,
            }}>
            {Joke}
          </Text>
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
         
          </Text>
          <TouchableOpacity
            onPress={randomQuote}
            style={{
              backgroundColor: isLoading ? 'rgba(83, 114, 240, 0.7)' : 'rgba(83, 114, 240, 1)',
              padding: 20,
              borderRadius: 30,
              marginVertical: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              {isLoading ? "Loading..." : "New Joke"}
            </Text>
          </TouchableOpacity>
  
          <View style={{flexDirection: 'row',justifyContent:'space-around'}}>
            <TouchableOpacity
              onPress={speakNow}
              style={{
                borderWidth: 2,
                borderColor: '#5372F0',
                borderRadius: 50,
                padding: 15,
                backgroundColor: isSpeaking ? '#5372F0' : '#fff'
              }}>
              <FontAwesome5 name="volume-up" size={22} color={isSpeaking ? '#fff' : "#5372F0"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={{
                borderWidth: 2,
                borderColor: '#5372F0',
                borderRadius: 50,
                padding: 15,
              }}>
              <FontAwesome5 name="copy" size={22} color="#5372F0" />
            </TouchableOpacity>
            <TouchableOpacity  style={{ width:"25%",padding:5}} onPress={
       ()=>{
           ShareQuote(Joke)
       }
   }>
   <Icon name="share" color='#FF6347' size={40} style={{alignSelf:"center"}}/>       
</TouchableOpacity> 
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: '#5372F0',
                borderRadius: 50,
                padding: 15,
              }}>
              <Text style={{color:'red', fontSize:16, marginLeft:10}}>5</Text>
             
 <Fontisto color='red' size={17} name="heart" style={{marginTop:4, marginLeft:20}}/>
            </TouchableOpacity>

          </View>
        </View>
     
                
        </ImageBackground>
      </View>
    );
  };
  
  export default JokeOFDay;

