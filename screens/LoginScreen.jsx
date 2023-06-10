import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React  from 'react'
import { useState, useEffect} from 'react';
import { FontAwesome,MaterialIcons,MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import {firebase} from '../Firebase/firebaseConfig'

// const AuthContext = React.createContext();

const LoginScreen = ({navigation}) => {
  const [usernamefocus,setUsernamefocus] = useState(false);
  const [passwordfocus,setPassowrdfocus] = useState(false);
  const [showpassword,setshowpassword] = useState(false);

  const [customError,setCustomError] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [success,setSuccess] = useState('');

  const [userlogged, setUserlogged] = useState(null);



  const handleLogin = () => {

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) =>{
      var user = userCredential.user;
      // console.log(user);
      console.log('Login successfully')
      navigation.navigate('Home');
      // AsyncStorage.setItem('keepLoggedIn', JSON.stringify(user));
    })
    .catch((error) =>{
      var errorMassege = error.message;
      // console.error(errorMassege);
      if (errorMassege ==='Firebase: The email is badly formatted.(auth/invalid-email).'){
        setCustomError('Please enter a valid email address')
      }else{
        setCustomError('Incorrect email or password')
      }
    })
  }

  ////////////For Google facebook login //////////////////////////////////

  const gfLogin = () => {
    alert('This feature is available soon. Please Login with email and password')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.head1}>Log In</Text>
      {customError != '' && <Text style={styles.errormsg}>
          {customError}</Text>}
      <View style={styles.inputout}>
        <FontAwesome name="user-circle-o" size={24} color={usernamefocus=== true ? 'red' : 'blue'}  />
        <TextInput style={styles.input} placeholder= 'Username'
        onFocus={() => {
          setUsernamefocus(true);
          setPassowrdfocus(false);
          setshowpassword(false);
          setCustomError('');
        }}
        onChangeText={(text) => 
          {setEmail(text);
        }}
        />
      </View>
      
      <View style={styles.inputout}>
      <MaterialIcons name="lock" size={24} color={passwordfocus=== true ? 'red' : 'black'} />
        <TextInput style={styles.input} placeholder= 'Password '
        onFocus={() => {
          setUsernamefocus(false);
          setPassowrdfocus(true);
          setCustomError('');
        }}
        onChangeText ={(text) => {setPassword(text)}}
        secureTextEntry={showpassword=== false ? true : false}
        />
        <MaterialCommunityIcons name={showpassword== false ? "eye-off"  :"eye"}size={24} color={showpassword=== true ? 'red' : 'black'}
        onPress={() => setshowpassword(!showpassword)}/>
      </View>

      <TouchableOpacity style={styles.btn} onPress={()=>handleLogin()}>
        <Text style={styles.btntext}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
      <Text style={styles.forget}>Forget Password ?</Text>
      </TouchableOpacity>
      <Text style={styles.or}>OR</Text>
      <Text style={styles.swt}>Sign-In With</Text>

      <View style={styles.gf}>
        <TouchableOpacity onPress={()=>gfLogin()}>
          <View style={styles.gficon}>
          <AntDesign name="google" size={40} color="red" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>gfLogin()}>
          <View style={styles.gficon}>
          <AntDesign name="facebook-square" size={40} color="#06a7cf" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.dtext}>
        <Text>Don't Have an Account ?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
          <Text style={styles.signup}>Sign-Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        // justifyContent:'center',
        width: '100%',
        marginTop:100,
    },
    head1:{
        fontSize: 45,
        fontWeight:'bold',
        color:'green',
        textAlign:'center',
        marginBottom:40,
    },
    inputout:{
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal:10,
        paddingVertical:15,
        alignSelf:'center',
        elevation: 50,

    },
    input:{
      fontFamily:'sans-serif',
      fontSize: 18,
      color:'black',
      textAlign:'left',
      width: '80%',
      marginLeft: 10,
    },
    btn:{
        width: '80%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'green',
        paddingHorizontal:10,
        elevation: 50,
        marginVertical: 20,
    },
    btntext: {
        fontSize: 30,
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
        width: '80%',
        marginLeft: 10,
    },
    forget:{
      color:'#19c1eb',
      fontSize: 20,
      textAlign:'center',
      marginTop:10,
    },
    or:{
      color:'#2ca543',
      fontSize: 22,
      textAlign:'center',
      marginTop:12,
    },
    swt:{
      color:'#d33986',
      fontSize: 28,
      fontWeight:'400',
      textAlign:'center',
      marginTop:10,
    },
    gf:{
      flexDirection:"row",
    },
    gficon:{
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor:'white',
      padding:10,
      elevation: 25,
      margin:15,
      marginVertical: 20,
    },
    dtext:{
      marginTop:15,
      flexDirection:"row",
    },
    signup: {
      fontSize: 17,
      fontWeight:'bold',
      marginLeft: 10,
      lineHeight:20,
      color:'green',
      textAlign:'center',
  
    },
    errormsg:{
      color:'red',
      fontSize:15,
      fontWeight:'bold',
      textAlign:'center',
      borderColor:'red',
      borderWidth:1,
      borderRadius:10,
      padding:10,
    }
})