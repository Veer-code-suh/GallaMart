import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

const BottomNav = ({navigation}) => {
  return (
    <View style={styles.container}>

        <TouchableOpacity style={styles.icon1}>
        <FontAwesome5 name="home" size={30} color="#00ace6"
        onPress={() => {navigation.navigate('Home')}}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon2}>
        <FontAwesome5 name="search" size={32} color="white"
        onPress={() => {navigation.navigate('Home')}} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon1}>
        <FontAwesome5 name="shopping-cart" size={30} color="#00ace6" 
        onPress={() => {navigation.navigate('Cart')}}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon1}>
        <FontAwesome5 name="map-marked-alt" size={30} color="#00ace6" 
        onPress={() => {navigation.navigate('Trackorder')}}/>
        </TouchableOpacity>
      
    </View>
  )
}

export default BottomNav

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '99%',
    borderTopColor: 'red',
    borderTopWidth:1,
    borderTopEndRadius:20,
    borderTopStartRadius:20,
  },
  icon1:{
    color:'#00ffcc',
  },
  icon2:{
    backgroundColor:'red',
    padding: 5,
    borderRadius:50,
    position: 'relative',
    top:-15,
  }
})