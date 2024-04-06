import React, { useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    PermissionsAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import  admob,{BannerAd, BannerAdSize,TestIds,InterstitialAd,AdEventType,RewardedAd,MaxAdContentRating,RewardedAdEventType} from '@react-native-firebase/admob'

import { useTheme } from 'react-native-paper';


import { useState } from 'react';



const Publish = ({navigation}) => {

   const [Message,SetMessage] = useState('');
   const [Name,SetName] = useState('');

    const { colors } = useTheme();


  const showRewardedAd = () =>{
        //  // Create a new instance
       
    
    
        // Create a new instance
        const rewardAd = RewardedAd.createForAdRequest("ca-app-pub-1427919207889091/7173619720",
          {requestNonPersonalizedAdsOnly:true,
          keywords:['fashion','clothing']}
        );
        // rewardAd
        // Add event handlers
        rewardAd.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                rewardAd.show();
            }
    
            if (type === RewardedAdEventType.EARNED_REWARD) {
                
                console.log('Rewards are = ','Publish Your Own Quote');
                
              
            }
        });
        
    
        // Load a new advert
        rewardAd.load();
      }
    


const submitForm = async(Message,Name) => {
    if(Message && Name)
    {
    await firestore().collection('UserQuotes').add({
        Author: Name,
        Quote:Message,
        Likes:0
    }).then(()=>{
        
        
        alert("Quote Published!");
        navigation.navigate('UserQuotesScreen')
    })
}
    else
    {
        alert('Enter all records')
    }


}

   useEffect(()=>{
      
         
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


       
   })
    return (

<View style={styles.container}>
<StatusBar backgroundColor='#009387' barStyle="light-content"/>
<View style={styles.header}>
  <Text style={styles.text_header}>Publish Your Quote</Text>
</View>
<Animatable.View 
  animation="fadeInUpBig"
  style={[styles.footer, {
      backgroundColor: colors.background
  }]}
>

  <Text style={[styles.text_footer, {
      color: colors.text
  }]}>Write Your Quote</Text>
  
  <View style={styles.action} >
      <FontAwesome 
          name="user-o"
          color={colors.text}
          size={20}
      />
      <TextInput 
          placeholder="Your Quote"
          placeholderTextColor="#666666"
          style={[styles.textInput, {
              color: colors.text
          }]}
          autoCapitalize="none"
          onChangeText={(val) => SetMessage(val)}
         value={Message}
      />
      <View style={{paddingTop:70}}>
        <FontAwesome 
          name="user-o"
          color={colors.text}
          size={20}
      />
     
      <TextInput
          placeholder="Your Name As Author"
          placeholderTextColor="#666666"
          style={[styles.textInput, {
              color: colors.text
          }]}
          autoCapitalize="none"
          onChangeText={(val) => SetName(val)}
         value={Name}
      />
    </View>
      

  <View style={styles.button}>
  
      <TouchableOpacity
          style={styles.signIn}
          onPress={() => {submitForm(Message,Name)}}
      > 
      <LinearGradient
          colors={['#08d4c4', '#01ab9d']}
          style={styles.signIn}
      >
          <Text>PublishQuote</Text>
      </LinearGradient>
      </TouchableOpacity>

     </View>
  </View>
</Animatable.View>

                
</View>
);
        
       
        }

export default Publish;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
       
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
     
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
       
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 90
    },
    actionError: {
       
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
       
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 100
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
