import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import logo from '../assets/logo.png';
import {firebase} from '../Firebase/firebaseConfig'

const WelcomeScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To GallaMart</Text>
      <View style={styles.logoout}>
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.text}>
          Find the best grocerry nearest to you 
        </Text>
        <View style={styles.hr}/>
        <View style={styles.btnout}>
             <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                <Text style={styles.btn}>SignUp</Text>
            </TouchableOpacity> 
             <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.btn}>Login</Text>
            </TouchableOpacity> 
        </View>
      </View>
    </View>
  
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'tomato',
    },
    title:{
        fontSize: 45,
        marginTop:-70,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    logoout: {
      width: '100%',
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:70,
    },
    logo: {
      width: '100%',
      height: '100%',
      borderWidth: 3,
      borderStyle:'solid',
      borderColor: 'white',
    },
    text: {
      textAlign: 'center',
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
    },
    hr: {
        backgroundColor: 'white',
        width:'70%',
        height: 3,
    },
    btnout: {
        flexDirection: 'row',
        marginBottom: -40,
        marginTop:10,
    },
    btn: {
      fontSize: 27,
      fontWeight: 'bold',
      color: 'red',
      textAlign: 'center',
      marginVertical: 10,
      marginHorizontal: 20,
      padding: 10,
      borderRadius: 10,
      paddingHorizontal: 20,
      backgroundColor:'white',
    },
});