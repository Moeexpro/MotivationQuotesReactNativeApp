import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity,StatusBar,RefreshControl, Linking,PermissionsAndroid,ImageBackground,FlatList,StyleSheet,Image} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Tts from 'react-native-tts';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';
import Share from 'react-native-share'
import Fontisto from "react-native-vector-icons/Fontisto";

import Publish from './PublishQuote';
import  admob,{BannerAd, BannerAdSize,TestIds,InterstitialAd,AdEventType,RewardedAd,MaxAdContentRating,RewardedAdEventType} from '@react-native-firebase/admob'


Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);


const UserQuotes = ({navigation}) => {

    const [Quotes, setQuotes] = useState([]);
    const [liked,SetLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [refreshing,setRefreshing]=useState(false);
    const [bgImages, setBgImgages] = useState([]);
const [bodyBgImage, setBodyBgImage] = useState();
  

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
    
    const imageretrieve = () => {
      fetch(`https://pixabay.com/api/?key=25646567-07dec3e2059be0cda075bcb40`)
      .then(response => response.json())
      .then(images =>{
          images = images.hits.map(image => image.largeImageURL);
          setBgImgages(images)
         
        }
       
      )
      setBodyBgImage(bgImages[Math.floor(Math.random()*bgImages.length)])
     
    
    }

    const getimage = () => {
     
     
      
      setBodyBgImage(bgImages[10])
      
    
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
             Author,Quote,Likes
            } = doc.data();
            list.push({
                id: doc.id,
                Author:Author,
                Quote:Quote,
                Likes:Likes
            });
         
        
          
          });
         
        });

     console.log(list)
    
    
     setQuotes(list)
    
} catch (e) {
    console.log(e);
  }
    }

    const UpdateQuote = async(id,like) =>{
        
        if(liked)
        {
        await firestore().collection('UserQuotes').get().then((documentSnapshot)=>{
            documentSnapshot.forEach((doc)=>{
        if(id === doc.id)
        {
            firestore().collection('UserQuotes').doc(id).update({
                Likes:like-1
            })
        }
            })
        })
    }
    else
    {
        SetLiked(true);
        await firestore().collection('UserQuotes').get().then((documentSnapshot)=>{
            documentSnapshot.forEach((doc)=>{
        if(id === doc.id)
        {
            firestore().collection('UserQuotes').doc(id).update({
                Likes:like+1
            })
        }
            })
        })

    }
            }
    

            const ShareQuote = async(er) => {
             

          }
  
          const onRefresh = () => {
            setRefreshing(true);
            randomQuote();
            imageretrieve();
            setTimeout(() => {
              setRefreshing(false)
            }, 100)};
            useEffect(() => {
              getPermissions();
              setTimeout(() => {
                onRefresh()
              
               },1000)

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
               imageretrieve();
              randomQuote();
            
              
            },[]);
  
    const speakNow = (Quote,Author) => {
      Tts.stop();
      Tts.speak(Quote + ' by ' + Author);
      Tts.addEventListener('tts-start', (event) => setIsSpeaking(true));
      Tts.addEventListener('tts-finish', (event) => setIsSpeaking(false));
    }
  
    const copyToClipboard = (Quote) => {
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
      <View style={styles.main}>
      <ImageBackground source={require('../assets/images/header.jpg')} style={{height:'100%',width:'100%'}} >
 
<View style={{height:"90%"}}> 

<FlatList 

data={Quotes}
renderItem={({item})=>{

return(
  <TouchableOpacity onPress={()=>{navigation.navigate('ShareScreen',{Body:item.Quote,Author:item.Author})}}
 
  style={{  backgroundColor:"#262626",  marginTop:5, borderRadius:5, padding:20, }}> 
 
   <View>
   {getimage()}
   <ImageBackground source={{uri:bodyBgImage}} >
   <FontAwesome5
            name="quote-left"
            style={{fontSize: 20, marginBottom: -12}}
            color="orange"
          />
     <Text style={{fontFamily:"sans-serif-condensed", fontStyle:'italic', fontSize:20, fontWeight:'bold', color:"white",paddingVertical:100,paddingHorizontal:20}}>
         { item.Quote }
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
      <View style={{alignItems:"flex-end", marginTop:5}}>
      <Text style={{color:"#66ff66",fontFamily:"KulimPark-Light", fontSize:18, color:'orange'}}>
        {item.Author}
      </Text>
     </View>
     </ImageBackground>
     </View>
   <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:30, width:"100%", padding:5}}>
       
  <TouchableOpacity style={{ width:"25%", padding:5,}}
  onPress={()=>{UpdateQuote(item.id,item.Likes)}}
  >
  <Fontisto color="white" size={20} name="heart" style={{alignSelf:"center"}} />
  <Text>{item.Likes}</Text>
  </TouchableOpacity>
 <TouchableOpacity  style={{width:"25%",padding:5}} onPress={()=>{
    copyToClipboard(item.Quote+" "+item.Author);
 } }>
 <Icon name="copy" color="white"size={20} style={{alignSelf:"center"}}/>
 </TouchableOpacity>
 <TouchableOpacity  style={{ width:"25%",padding:5}}
 onPress={()=>{speakNow(item.Quote,item.Author)}}
 >
  <FontAwesome name="volume-up" size={20} color={isSpeaking ? '#fff' : "#5372F0"} />
 </TouchableOpacity>
 <TouchableOpacity  style={{ width:"25%",padding:5}}onPress={
       ()=>{
        navigation.navigate('ShareScreen',{Body:item.Quote,Author:item.Author})
       }
   }>
 <Icon name="share" color="white"size={20} style={{alignSelf:"center"}}/>       
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
  
  export default UserQuotes;

