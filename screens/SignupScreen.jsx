import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React  from 'react'
import { useState } from 'react';
import { FontAwesome,MaterialIcons,MaterialCommunityIcons, AntDesign,Zocial, Entypo } from '@expo/vector-icons';

import {firebase} from '../Firebase/firebaseConfig';

const SignupScreen = ({navigation}) => {
  const [namefocus,setNamefocus] = useState(false);
  const [numberfocus,setNumberfocus] = useState(false);
  const [emailfocus,setEmailfocus] = useState(false);
  const [addressfocus,setAddressfocus] = useState(false);
  const [passwordfocus,setPassowrdfocus] = useState(false);
  const [cpasswordfocus,setCpassowrdfocus] = useState(false);
  const [showpassword,setshowpassword] = useState(false);

  // Taking form Data
  const[email,setEmail] = useState('');
  const[address,setAdddress] = useState('');
  const[name,setName] = useState('');
  const[phone,setPhone] = useState('');
  const[password,setPassword] = useState('');
  const[cpassword,setcPassword] = useState('');

  const [customError,setCustomError] = useState('');
  const [success,setSuccess] = useState(null);

  const handleSignup = () => {
   
    if (password != cpassword){
      setCustomError('Password do not match');
      // alert('Password do not match');
      
      return;
    }
    if (phone.length!=10 && !isNaN(phone)){
      setCustomError('Please enter a valid Number');
      return;
    }if(email.includes('@') && email.includes('.')){

    }else {
      setCustomError('Please enter a valid Email');
    }
   
    
    try {


      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
         console.log('User created');
        if(userCredentials?.user.uid){
        const userRef = firebase.firestore().collection('UserData')
        // const user = FirebaseAuth.createUserWithEmailAndPassword(email, password);
        //  AsyncStorage.setItem('isLoggedIn', 'true');
        userRef.add({
          email: email,
          address: address,
          password: password,
          phone: phone,
          name: name,
          uid:userCredentials?.user.uid
        })
          .then(() => {
          alert('User created successfully')
          navigation.navigate('Login')
        }).catch((error) => {
          // console.log('firestore error ' , error)
        })
      }
      })
      .catch((error) => {
        console.log('signup firebase failed',error.message);
        if(error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
          setCustomError('Email is already use ')
        }
        else if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
          setCustomError('Password should be at least 6 characters');
        }
        else if(error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).'){
          setCustomError('Email is Invalid');
        }else {
          setCustomError(error.message)
        }
      })
    } catch (error) {
      console.log('system error',error.message);
    }
  }
  
/////////// For google Facebook Signup////////////////
  const gfSignup = () => {
    alert('This feature is available soon. Please sign up with email and password')
  }
  return (
    <View style={styles.container}>
    
      <Text style={styles.head1}>Sign Up</Text>
        {customError != '' && <Text style={styles.errormsg}>
          {customError}</Text>}
      <View style={styles.inputout}>
        <FontAwesome name="user" size={24} color={namefocus=== true ? 'red' : 'pink'}  />
        <TextInput style={styles.input} placeholder= 'Name                 '
        onFocus={() => {
          setNamefocus(true);
          setNumberfocus(false)
          setEmailfocus(false);
          setAddressfocus(false);
          setPassowrdfocus(false);
          setCpassowrdfocus(false);
          setCustomError('') 
        }}
        onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputout}>
        <MaterialIcons name="smartphone" size={24} color={numberfocus=== true ? 'red' : 'blue'}  />
        <TextInput style={styles.input} placeholder= 'Mobile-No.                  ' keyboardType='number-pad'
        onFocus={() => {
          setNamefocus(false);
          setNumberfocus(true)
          setEmailfocus(false);
          setAddressfocus(false);
          setPassowrdfocus(false);
          setCpassowrdfocus(false);
          setCustomError('') 
        }}
        onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.inputout}>
      <Zocial name="email" size={24} color={emailfocus=== true ? 'red' : 'blue'}  />
        <TextInput style={styles.input} placeholder= 'Email'
        onFocus={() => {
          setNamefocus(false);
          setNumberfocus(false)
          setEmailfocus(true);
          setAddressfocus(false);
          setPassowrdfocus(false);
          setCpassowrdfocus(false);
          setCustomError('') 
        }}
        onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputout}>
      <Entypo name="location" size={24} color={addressfocus=== true ? 'red' : 'blue'}  />
        <TextInput style={styles.input} placeholder= 'Enter Your Address'
        onFocus={() => {
          setNamefocus(false);
          setNumberfocus(false)
          setEmailfocus(false);
          setAddressfocus(true);
          setPassowrdfocus(false);
          setCpassowrdfocus(false);
          setCustomError('') 
        }}
        onChangeText={(text) => setAdddress(text)}
        />
      </View>
      
      
      <View style={styles.inputout}>
      <MaterialIcons name="lock" size={24} color={passwordfocus=== true ? 'red' : 'black'} />
        <TextInput style={styles.input} placeholder= 'Password '
        onFocus={() => {
          setNamefocus(false);
          setNumberfocus(false)
          setEmailfocus(false);
          setAddressfocus(false);
          setCpassowrdfocus(false);
          setPassowrdfocus(true);
          setCustomError('') 

        }}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={showpassword=== false ? true : false}
        />
        <MaterialCommunityIcons name={showpassword== false ? "eye-off"  :"eye"}size={24} color={showpassword=== true ? 'red' : 'black'}
        onPress={() => setshowpassword(!showpassword)}/>
      </View>

      <View style={styles.inputout}>
        <MaterialIcons name="lock" size={24} color={cpasswordfocus=== true ? 'red' : 'black'} />
        <TextInput style={styles.input} placeholder= 'Confirm-Password '
        onFocus={() => {
          
          setNamefocus(false);
          setNumberfocus(false)
          setEmailfocus(false);
          setAddressfocus(false);
          setCpassowrdfocus(true);
          setPassowrdfocus(false);
          setCustomError('')
        }}
        onChangeText={(text) => setcPassword(text)}
        secureTextEntry={showpassword=== false ? true : false}
        />
        <MaterialCommunityIcons name={showpassword== false ? "eye-off"  :"eye"}size={24} color={showpassword=== true ? 'red' : 'black'}
        onPress={() => setshowpassword(!showpassword)}/>
      </View>

      <TouchableOpacity style={styles.btn} onPress={()=>handleSignup()}>
        <Text style={styles.btntext}>Sign-up</Text>
      </TouchableOpacity>

      <TouchableOpacity>
         <Text style={styles.forget}>Forget Password ?</Text>
      </TouchableOpacity>
      <Text style={styles.or}>OR</Text>
      <Text style={styles.swt}>Sign-In With</Text>

      <View style={styles.gf}>
        <TouchableOpacity onPress={()=>gfSignup()}>
          <View style={styles.gficon}>
          <AntDesign name="google" size={40} color="red" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>gfSignup()}>
          <View style={styles.gficon}>
          <AntDesign name="facebook-square" size={40} color="#06a7cf" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.dtext}>
        <Text>Already Have an Account ?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.signup}>Login</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container:{
        flex: 1,
        alignItems:'center',
        width: '100%',
        marginTop:25,
  },
  head1:{
        fontSize: 45,
        fontWeight:'bold',
        color:'green',
        marginBottom:7,
    },
    inputout:{
        flexDirection: 'row',
        width: '80%',
        marginVertical: 7,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal:10,
        paddingVertical:10,
        alignSelf:'center',
        elevation: 30,

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
        height: 50,
        width: '80%',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'green',
        paddingHorizontal:5,
        elevation: 50,
        marginVertical: 10,
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
      marginTop:7,
  },
  or:{
      color:'#2ca543',
      fontSize: 22,
      textAlign:'center',
      marginTop:6,
  },
  swt:{
      color:'#d33986',
      fontSize: 25,
      fontWeight:'400',
      textAlign:'center',
      marginTop:5,
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
      marginVertical: 10,
  },
  dtext:{
      marginTop:6,
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