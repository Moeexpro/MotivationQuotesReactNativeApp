import React, {Component, useEffect, useState} from "react";
import {StyleSheet, View, Image, TouchableOpacity, FlatList, Alert, Text, Modal, PermissionsAndroid,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from "react-native-vector-icons/Fontisto";
import Data from "./AttitudeList";
import Tts from 'react-native-tts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-community/clipboard';
import Snackbar from 'react-native-snackbar';
import Share from 'react-native-share'


Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);


const AttiudeL = ({navigation,route}) => {

const [QuoteData,SetQuoteData] = useState(Data);
const [accdata,SetaccData] = useState([]);
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


copyText = (text)=>{
    Clipboard.setString(text);
    Snackbar.show({
        text: 'Quote copied!',
        duration: Snackbar.LENGTH_SHORT,
      });  
    
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


useEffect(()=>{
  getPermissions();
})



return(
    <View style={styles.main}>
       <ImageBackground  source={require('../assets/images/Attitude.jpg')} style={{height:'100%',width:'100%'}}>
   
 <View style={{height:"90%"}}> 

<FlatList 

data={QuoteData}
renderItem={({item})=>{
  
return(
  <View>
    <TouchableOpacity
   
    style={{  backgroundColor:"#262626",  marginTop:5, borderRadius:5, padding:20, }}> 
   
     <View>
     <Image source={require("../assets/images/quotesIc.png")} style={{width:30, height:30}} />
     
   
     <Text style={{fontFamily:"KulimPark-Light", fontSize:20, color:"white"}}>
         { item.body }
      </Text>
      </View>
      <View style={{alignItems:"flex-end", marginTop:5}}>
      <Text style={{color:"#66ff66",fontFamily:"KulimPark-Light", fontSize:18}}>
        {item.by}
      </Text>
     </View>
     <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:30, width:"100%", padding:5}}>
         
    <TouchableOpacity style={{ width:"25%", padding:5,}}
    
    >
    <Fontisto color="white" size={20} name="heart" style={{alignSelf:"center"}} />
    </TouchableOpacity>
   <TouchableOpacity  style={{width:"25%",padding:5}} onPress={()=>{
       this.copyText(item.body+" "+item.by);
   } }>
   <Icon name="copy" color="white"size={20} style={{alignSelf:"center"}}/>
   </TouchableOpacity>
   <TouchableOpacity  style={{ width:"25%",padding:5}}
   onPress={()=>{speakNow(item.body,item.by)}}
   >
    <FontAwesome name="volume-up" size={20} color={isSpeaking ? '#fff' : "#5372F0"} />
   </TouchableOpacity>
   <TouchableOpacity  style={{ width:"25%",padding:5}} onPress={
       ()=>{
           ShareQuote(item.body)
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
      backgroundColor:"#1a1a1a",
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



export default AttiudeL;