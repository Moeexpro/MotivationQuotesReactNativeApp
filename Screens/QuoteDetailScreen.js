import React, {Component, useEffect, useState,useRef} from "react";
import {StyleSheet, View, Image, TouchableOpacity, FlatList, Alert, Text, Modal, PermissionsAndroid,ImageBackground,RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from "react-native-vector-icons/Fontisto";
import Data from "./Dat";
import Tts from 'react-native-tts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';
import Share from 'react-native-share'
import ViewShot from "react-native-view-shot";
import  {BannerAd, BannerAdSize,TestIds,InterstitialAd,AdEventType} from '@react-native-firebase/admob'
import RNFetchBlob from 'rn-fetch-blob';
import { ScrollView } from "react-native-gesture-handler";

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);


const Detais = ({navigation,route}) => {
  const viewShotRef =  useRef();

const [QuoteData,SetQuoteData] = useState(Data);
const [accdata,SetaccData] = useState([]);
const [isSpeaking, setIsSpeaking] = useState(false);
const [url,SetUrl] = useState('');
const [bgImages, setBgImgages] = useState([]);
const [bodyBgImage, setBodyBgImage] = useState();
const [refreshing,setRefreshing] = useState(false)
    
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





const copyText = (text)=>{
    Clipboard.setString(text);
    Snackbar.show({
        text: 'Quote copied!',
        duration: Snackbar.LENGTH_SHORT,
      });  
    
}



const ShareQuote = async(er) => {
  let imagePath = null;
 await viewShotRef.current.capture().then((uri) => {
   console.log(uri)
const sharingoptions = {
  url: "data:image/jpeg;base64,"+uri,
}
Share.open(sharingoptions)
    })

}

const imageretrieve = () => {
  console.log(title);
  const {title} = route.params;


    
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


const getimage = () => {
  const {title} = route.params
  console.log(title)
  
  setBodyBgImage(bgImages[10])
  

}

const handlerefresh = () => {
  setRefreshing(false);
  imageretrieve();
}

const speakNow = (Quote,Author) => {
    Tts.stop();
    Tts.speak(Quote + ' by ' + Author);
    Tts.addEventListener('tts-start', (event) => setIsSpeaking(true));
    Tts.addEventListener('tts-finish', (event) => setIsSpeaking(false));
  }

const geturl = () => {
  SetUrl('https://source.unsplash.com/random/300x200?sig=${Math.random()}')
}




  useEffect(() => {
    const {title} = route.params;
   
    getPermissions();
    imageretrieve();
   
   
    let data = QuoteData.filter(
      (d)=>{
          return d.category==title
      }
     
    
  
  );
  
  SetaccData(data)
    
    
  
    
  },[]);


  




return(
    <View style={styles.main} >
      
        <ImageBackground source={require('../assets/images/Quotes.jpg')} style={{height:'100%',width:'100%'}} >
       
 <View style={{height:'90%'}}  >
 
<FlatList 


data={accdata}
renderItem={({item})=>{
  
return(
  
  <View>
  

  
    <TouchableOpacity onPress={()=>{navigation.navigate('ShareScreen',{Body:item.body,Author:item.by})}}
    style={{    marginTop:5, borderRadius:5, padding:10 }}> 
      
     <View >
      {getimage()}
     <ViewShot ref={viewShotRef} options={{result:'base64',quality:0.9,format:'jpg'}}>
       <ImageBackground source={{uri:bodyBgImage}} >
     
       <FontAwesome5
            name="quote-left"
            style={{fontSize: 20, marginBottom: -12}}
            color="orange"
          />
     <Text style={{fontFamily:"sans-serif-condensed", fontStyle:'italic', fontSize:20, fontWeight:'bold', color:"white",paddingVertical:100,paddingHorizontal:20}}>
         { item.body }
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
        {item.by}
      </Text>
     </View>
     </ImageBackground>
     </ViewShot>
     </View>
     
    
     
     <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:30, width:"100%", padding:5}}>
         
    <TouchableOpacity style={{ width:"10%", padding:5,}}
    
    >
    <Fontisto color="white" size={20} name="heart" style={{alignSelf:"center"}} />
    </TouchableOpacity>
   <TouchableOpacity  style={{width:"10%",padding:5}} onPress={()=>{
      copyText(item.body+" "+item.by);
   } }>
   <Icon name="copy" color="white"size={20} style={{alignSelf:"center"}}/>
   </TouchableOpacity>
   <TouchableOpacity  style={{ width:"10%",padding:5}}
   onPress={()=>{speakNow(item.body,item.by)}}
   >
    <FontAwesome name="volume-up" size={20} color={isSpeaking ? '#fff' : "#5372F0"} />
   </TouchableOpacity>
   <TouchableOpacity  style={{ width:"10%",padding:5}} onPress={
       ()=>{
          imageretrieve()
       }
   }>
   <Icon name="eye-dropper" color="red"size={20} style={{alignSelf:"center"}}/>       
   
</TouchableOpacity> 

   <TouchableOpacity  style={{ width:"10%",padding:5}} onPress={
       ()=>{
        navigation.navigate('ShareScreen',{Body:item.body,Author:item.by})
       }
   }>
   <Icon name="share" color="white"size={20} style={{alignSelf:"center"}}/>       
   
</TouchableOpacity> 

  </View>
  </TouchableOpacity>

  
    
    </View>
    
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



export default Detais;