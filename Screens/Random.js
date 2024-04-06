import React, { useState, useEffect,useRef } from 'react';
import {View, Text, TouchableOpacity,StatusBar, Linking, PermissionsAndroid,ImageBackground,TextInput,Button} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Tts from 'react-native-tts';
import ViewShot from 'react-native-view-shot';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';
import Share from 'react-native-share'
import Fontisto from "react-native-vector-icons/Fontisto";
import  {BannerAd, BannerAdSize,TestIds,InterstitialAd,AdEventType} from '@react-native-firebase/admob'
import { ScrollView } from 'react-native-gesture-handler';


Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);


const RandomQuote = () => {
  const viewShotRef =  useRef();
    const [Quote, setQuote] = useState('Loading...');
    const [Author, setAuthor] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [bgImages, setBgImgages] = useState([]);
    const [bodyBgImage, setBodyBgImage] = useState();
    const [search,getsearch] = useState('');

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

    const retrieveImage = () => {
      fetch(`https://pixabay.com/api/?key=25646567-07dec3e2059be0cda075bcb40`)
      .then(response => response.json())
      .then(images =>{
          images = images.hits.map(image => image.largeImageURL);
          setBgImgages(images)
        }
      )
      // if we could not retrieve images from the API
    
      setBodyBgImage(bgImages[Math.floor(Math.random()*bgImages.length)]);




     
    
    }

    const imageretri = (sea) => {





      fetch(`https://pixabay.com/api/?key=25646567-07dec3e2059be0cda075bcb40&q=${sea}`)
          .then(response => response.json())
          .then(images =>{
              images = images.hits.map(image => image.largeImageURL);
              setBgImgages(images)
            }
          )
          // if we could not retrieve images from the API
        
          setBodyBgImage(bgImages[Math.floor(Math.random()*bgImages.length)]);
    
     
    
    
    
    
    
    
     
     
    
    
    }
  
    const randomQuote = () => {
      setIsLoading(true);
      fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
      })
      setBodyBgImage(bgImages[Math.floor(Math.random()*bgImages.length)]);
    }

    const ShareQuote = async(er) => {
      await viewShotRef.current.capture().then((uri) => {
        console.log(uri)
     const sharingoptions = {
       url: "data:image/jpeg;base64,"+uri,
     }
     Share.open(sharingoptions)
         })
     
     

       
    }
  
    useEffect(() => {
      randomQuote();
      fetch(`https://pixabay.com/api/?key=25646567-07dec3e2059be0cda075bcb40`)
      .then(response => response.json())
      .then(images =>{
          images = images.hits.map(image => image.largeImageURL);
          setBgImgages(images)
        }
      )
      // if we could not retrieve images from the API
    
      setBodyBgImage(bgImages[Math.floor(Math.random()*bgImages.length)]);
    
      getPermissions();
    }, []);
  
    const speakNow = () => {
      Tts.stop();
      Tts.speak(Quote + ' by ' + Author);
      Tts.addEventListener('tts-start', (event) => setIsSpeaking(true));
      Tts.addEventListener('tts-finish', (event) => setIsSpeaking(false));
    }
  
    const copyToClipboard = () => {
      Clipboard.setString(Quote);
      Snackbar.show({
        text: 'Quote copied!',
        duration: Snackbar.LENGTH_SHORT,
      });    
    }
  
    const tweetNow = () => {
      const url = "https://twitter.com/intent/tweet?text=" + Quote;
      Linking.openURL(url);
    }
  
    return (
      <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
         
        }}>
           <ImageBackground source={require('../assets/images/Quoteofday.jpg')} style={{height:'100%',width:'100%'}} >
          <StatusBar barStyle="light-content" />
        <View
          style={{
            width: '100%',
            backgroundColor: '#000',
            borderRadius: 20,
            padding: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 26,
              fontWeight: '600',
              color: 'orange',
              marginBottom: 20,
            }}>
            Quote of the Day
          </Text>
          <View style={{flexDirection:'row'}}> 
       <TextInput placeholderTextColor="#666666" placeholder ="Search Background here such as Attitude" onChangeText={(ty)=>{getsearch(ty)}} value={search}/>
     <Button  title="Search" onPress={()=>{imageretri(search)}}/>      
     </View>
          <ViewShot ref={viewShotRef} options={{result:'base64',quality:0.9,format:'jpg'}}>
          <ImageBackground source={{uri:bodyBgImage}} >
          <FontAwesome5
            name="quote-left"
            style={{fontSize: 20, marginBottom: -12}}
            color="orange"
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
              lineHeight: 26,
              letterSpacing: 1.1,
              fontWeight: '400',
              textAlign: 'center',
              fontFamily:'Roboto',
              fontStyle:'italic',
              marginBottom: 20,
              paddingHorizontal: 20,
              paddingVertical:50
            }}>
            {Quote}
          </Text>
          <FontAwesome5
            name="quote-right"
            style={{
              fontSize: 20,
              textAlign: 'right',
              marginTop: -20,
              marginBottom: 20,
            }}
            color="orange"
          />
          <Text
            style={{
              textAlign: 'right',
              fontWeight: '300',
              fontStyle: 'italic',
              fontSize: 16,
              color: 'orange',
            }}>
            —— {Author}
          </Text>
          </ImageBackground>
          </ViewShot>
          <TouchableOpacity
            onPress={randomQuote}
            style={{
              backgroundColor: isLoading ? 'rgba(83, 114, 240, 0.7)' : 'rgba(83, 114, 240, 1)',
              padding: 20,
              borderRadius: 30,
              marginVertical: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              {isLoading ? "Loading..." : "New Quote"}
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
              <FontAwesome name="volume-up" size={22} color={isSpeaking ? '#fff' : "#5372F0"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={{
                borderWidth: 2,
                borderColor: '#5372F0',
                borderRadius: 50,
                padding: 15,
              }}>
              <FontAwesome5 name="copy" size={20} color="#5372F0" />
            </TouchableOpacity>
            <TouchableOpacity  style={{ width:"10%",padding:5}} onPress={
       ()=>{
           ShareQuote(Quote)
       }
   }>
   <Icon name="share" color='#FF6347' size={20} style={{alignSelf:"center"}}/>       
</TouchableOpacity> 
            <TouchableOpacity onPress={()=>{retrieveImage()}}
              style={{
                borderWidth: 10,
                borderColor: '#5372F0',
                borderRadius: 50,
                padding: 15,
              }}>
                 
          <FontAwesome5 name="eye-dropper" size={20} color="#5372F0" />
          <Text style={{color:'#fff'}}>Change Background</Text>
            </TouchableOpacity>
            
            
          </View>
        
        </View>
    
        </ImageBackground>
      </View>
      </ScrollView>
    );
  };
  
  export default RandomQuote;

