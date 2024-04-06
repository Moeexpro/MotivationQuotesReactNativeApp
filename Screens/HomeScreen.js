import React, { Component } from 'react'
import {StyleSheet, View, Image, Alert, Dimensions, FlatList,  Text, TouchableOpacity, Button,ScrollView,StatusBar} from 'react-native'
import  admob,{BannerAd, BannerAdSize,TestIds,InterstitialAd,AdEventType,RewardedAd,MaxAdContentRating,RewardedAdEventType} from '@react-native-firebase/admob'
import Lists from './Lists.js';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

 class HomeScreen extends Component {
     
  
       
     


      state = {
          currentPage : 0,
       
            storagePermission:null,
           
      }


      

    componentDidMount = ()=>{
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
       
    }
    
    showInterstitialAd = () => {

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
  
    showRewardedAd = () =>{
      //  // Create a new instance
      //  const myRewardedAd = RewardedAd.createForAdRequest("ca-app-pub-9152919921144751/1128032966");
      //  // Add event handlers
      //  myRewardedAd.onAdEvent((type, error, reward) => {
      //      if (type === RewardedAdEventType.LOADED) {
      //       myRewardedAd.show();
      //      }
  
      //      if (type === RewardedAdEventType.EARNED_REWARD) {
      //       alert('Earned' + reward);
      //      }
  
      //  });
      //  // Load a new advert
      //  myRewardedAd.load();
      //  // Rewarded
      //  // RewardedAd.createForAdRequest(TestIds.REWARDED)
  
  
      // Create a new instance
    }

   
    render() {
        

        let devicesWidth = Dimensions.get("window").width;
        let devicesHeight = Dimensions.get("window").height;
        return (
          <ScrollView style={styles.container}>
    
          <View style={styles.sliderContainer}>
            <Swiper
              autoplay
              horizontal={false}
              height={200}
              activeDotColor="#FF6347">
              <View style={styles.slide}>
                <Image
                  source={require('../assets/images/pixel6.png')}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require('../assets/images/pixel8.png')}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require('../assets/images/pixel1.png')}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
            </Swiper>
          </View>

          <View style={styles.categoryContainer}>
       
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            this.props.navigation.navigate("JokeOfTheDayScreen")
          }>
          <View style={styles.categoryIcon}>
          <Icon name='grin-tears' size={30} color='#FF6347'/>
          </View>
          <Text style={styles.categoryBtnTxt}>Joke Of the Day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>  {this.props.navigation.navigate("MemeOfTheDayScreen")}}>
          <View style={styles.categoryIcon}>
          <Icon name='grin-squint-tears' size={30} color='#FF6347'/>
          </View>
          <Text style={styles.categoryBtnTxt}>Meme of The Day</Text>
        </TouchableOpacity>
        </View>
      

      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {this.props.navigation.navigate("UserQuotesScreen")}}>
          <View style={styles.categoryIcon}>
          <Icon 
                                name=
                                'id-card'
                               
                                size={30}
                                color='#FF6347'
                                />
              
          </View>
          <Text style={styles.categoryBtnTxt}>User Quotes</Text>
        </TouchableOpacity>
        
        </View>
    
        <View style={{height:30,  alignItems:"center"}}>
                 <Text style={{fontFamily:"KulimPark-Regular",fontWeight:"bold", fontSize:18, color:'#FF6347'}}>
                     Popular Quotes
                 </Text>
             </View>
              
             <Lists props={this.props} color="#fff"/>
                
                
                




                
        </ScrollView>
           
               
        )
    }
}

const styles = StyleSheet.create({
    main :{
        flex :1,
       
    },
    item: {
       width:"100%",
       height:"90%",
      
      },
      imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
      },
      image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
      },
      popularText :{
          color:"white", 
          fontFamily:"KulimPark-Regular", 
         
          fontSize:18, 
          marginLeft:22,
          padding:2
        },
        container: {
          flex: 1,
          backgroundColor:'#000000'
        },
        sliderContainer: {
          height: 200,
          width: '90%',
          marginTop: 10,
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 8,
        },
      
        wrapper: {},
      
        slide: {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'transparent',
          borderRadius: 8,
        },
        sliderImage: {
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          borderRadius: 8,
        },
        categoryContainer: {
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          marginTop: 25,
          marginBottom: 10,
        },
        categoryBtn: {
          flex: 1,
          width: '30%',
          marginHorizontal: 0,
          alignSelf: 'center',
        },
        categoryIcon: {
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          width: 70,
          height: 70,
          backgroundColor: '#fdeae7' /* '#FF6347' */,
          borderRadius: 50,
        },
        categoryBtnTxt: {
          alignSelf: 'center',
          marginTop: 5,
          color: '#de4f35',
        },
        cardsWrapper: {
          marginTop: 20,
          width: '90%',
          alignSelf: 'center',
        },
        card: {
          height: 100,
          marginVertical: 10,
          flexDirection: 'row',
          shadowColor: '#999',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        },
        cardImgWrapper: {
          flex: 1,
        },
        cardImg: {
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          borderRadius: 8,
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
        },
        cardInfo: {
          flex: 2,
          padding: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          borderLeftWidth: 0,
          borderBottomRightRadius: 8,
          borderTopRightRadius: 8,
          backgroundColor: '#fff',
        },
        cardTitle: {
          fontWeight: 'bold',
        },
        cardDetails: {
          fontSize: 12,
          color: '#444',
        },
});

export default HomeScreen;