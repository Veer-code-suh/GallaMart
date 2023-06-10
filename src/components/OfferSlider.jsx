import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import Slider6 from '../../assets/Slider6.jpg';
import Slider2 from '../../assets/Slider2.png';
import Slider3 from '../../assets/Slider3.jpg';
import Slider4 from '../../assets/Slider7.jpg';
// import Slider1 from '../../assets/Slider1.jpg';


const OfferSlider = () => {
  return (
    <View>
      <View style={styles.slider}>
        <Swiper autoplay={true} autoplayTimeout={4}>
          <View style={styles.slide}>
            <Image source ={Slider6} style={styles.img}/>
          </View>
          <View style={styles.slide}>
          <Image source ={Slider2} style={styles.img}/>
          </View>
          <View style={styles.slide}>
          <Image source ={Slider3} style={styles.img}/>
          </View>
          <View style={styles.slide}>
          <Image source ={Slider4} style={styles.img}/>
          </View>
        </Swiper>
      </View>
    </View>
  )
}

export default OfferSlider

const styles = StyleSheet.create({
  slider: {
    width:'100%',
    height:200,
    borderRadius:15,
  },
  slide:{
    width:200,
    height:200,
    justifyContent:'center',
    borderRadius:20,
 
  },
  img:{
    width:380,
    marginLeft:4,
    height:210,
    borderRadius:15,
  },
 
});