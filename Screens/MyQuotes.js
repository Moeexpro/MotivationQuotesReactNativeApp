import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity,StatusBar, Linking,RefreshControl, Alert,FlatList,StyleSheet,ImageBackground,Image,PermissionsAndroid} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5'
import  admob,{BannerAd, BannerAdSize,TestIds,InterstitialAd,AdEventType,RewardedAd,MaxAdContentRating,RewardedAdEventType} from '@react-native-firebase/admob'
import Tts from 'react-native-tts';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';
import Share from 'react-native-share'
import Fontisto from "react-native-vector-icons/Fontisto";

import Publish from './PublishQuote';
import { NavigationContainer } from '@react-navigation/native';



Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);


const MyQuotes = ({navigation,route}) => {

    const [Quotes, setQuotes] = useState([]);
    const [refreshing,setRefreshing]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const {author} = route.params;

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


  const  showInterstitialAd = () => {

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
    
  
    const randomQuote = async() => {
      setIsLoading(true);
     
      try {
          
        const list = [];
      await firestore()
        .collection('UserQuotes')
    
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
             Author,Quote
            } = doc.data();
            if(Author === author)
            {
            list.push({
                id: doc.id,
                Author:Author,
                Quote:Quote
            });
         
        
        }
          });
        
        });

     console.log(list)
    
    
     setQuotes(list)
    
} catch (e) {
    console.log(e);
  }
    }


    const DeleteQuote = async(id) =>{
await firestore().collection('UserQuotes').get().then((documentSnapshot)=>{
    documentSnapshot.forEach((doc)=>{
if(id === doc.id)
{
    firestore().collection('UserQuotes').doc(id).delete().then(()=>{
      Alert.alert('Quote Deleted')
      navigation.navigate('MyQuoteScreen')
    })
}
    })
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
  
   
  
    const speakNow = (Quote,Author) => {
      Tts.stop();
      Tts.speak(Quote + ' by ' + Author);
      Tts.addEventListener('tts-start', (event) => setIsSpeaking(true));
      Tts.addEventListener('tts-finish', (event) => setIsSpeaking(false));
    }
  
    const copyText = (Quote) => {
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

    const onRefresh = () => {
      setRefreshing(true);
      if(auth().currentUser=== null)
      {
        navigation.navigate('Home')
        Alert.alert('Log In First')
      }
      else
      {
        getPermissions();
        randomQuote();
      }
      setTimeout(() => {
        setRefreshing(false)
      }, 100)};
      useEffect(() => {
        getPermissions();
        setTimeout(() => {
          onRefresh()
        
         },1000)
         if(author=== null)
         {
           navigation.navigate('Home')
           Alert.alert('Publish First')
         }
         else
         {
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
           randomQuote();
         }
    
      
        
      },[]);

    
    return (
      <View style={styles.main}>
      <ImageBackground source={require('../assets/images/header.jpg')} style={{height:'100%',width:'100%'}} >
 
<View style={{height:"90%"}}> 

<FlatList 

data={Quotes}
renderItem={({item})=>{

return(
  <TouchableOpacity
 
  style={{  backgroundColor:"#262626",  marginTop:5, borderRadius:5, padding:20, }}> 
 
   <View>
   
   <Image source={require("../assets/images/Mark.png")} style={{width:30, height:30}} />

   <Text style={{fontFamily:"KulimPark-Light", fontSize:20, color:"red"}}>
       { item.Quote }
    </Text>
    </View>
    <View style={{alignItems:"flex-end", marginTop:5}}>
    <Text style={{color:"#66ff66",fontFamily:"KulimPark-Light", fontSize:18}}>
      {item.Author}
    </Text>
   </View>
   <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:30, width:"100%", padding:5}}>
       
  <TouchableOpacity style={{ width:"25%", padding:5,}}
  
  >
  <Fontisto color="white" size={20} name="heart" style={{alignSelf:"center"}} />
  
  </TouchableOpacity>
 <TouchableOpacity  style={{width:"25%",padding:5}} onPress={()=>{
    copyText(item.Quote+" "+item.Author);
 } }>
 <Icon name="copy" color="white"size={20} style={{alignSelf:"center"}}/>
 </TouchableOpacity>
 <TouchableOpacity  style={{ width:"25%",padding:5}}
 onPress={()=>{speakNow(item.Quote,item.Author)}}
 >
  <FontAwesome name="volume-up" size={20} color={isSpeaking ? '#fff' : "#5372F0"} />
 </TouchableOpacity>
 <TouchableOpacity  style={{ width:"15%",padding:5}} onPress={
     ()=>{
         ShareQuote(item.Quote)
     }
 }>
 <Icon name="share" color="white"size={20} style={{alignSelf:"center"}}/>       
</TouchableOpacity> 
<TouchableOpacity  style={{ width:"15%",padding:5}} onPress={
     ()=>{
         DeleteQuote(item.id)
     }
 }>
 <Icon name="trash-alt" color="white"size={20} style={{alignSelf:"center"}}/>       
</TouchableOpacity> 
  </View>
  
  </TouchableOpacity>
)
}}
/>

</View>
 
              
</ImageBackground>
</View>
)

              }

const styles = StyleSheet.create({
  main : {
      backgroundColor:"#4C1130",
      flex:1,
  },
  button : {
      width:"90%",
      height:"8%",
      backgroundColor:"#38b750",
      justifyContent:"space-around",
      alignItems:"center",
      marginTop:10,
      alignSelf:"center",
      flexDirection:"row",
  },
  buttonText: {
      color:"white",
      alignContent:"center",
      fontSize:20,
      alignSelf:"center",
  },
  modal:{ 
          backgroundColor:"#1a1a1a",
            flex: 1,
            flexDirection: 'column',
            width:"100%",
            height:"70%",
  
  }
})
  
  export default MyQuotes;

