import { StyleSheet, Text, View, TextInput,Button, TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'

import {firebase} from '../Firebase/firebaseConfig';

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// 
// import { firebase } from 'firebase/compat/app';


const Otp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState('');
  // const recaptchaVerifier = useState(null)
  const SendVerification = () => {
   const phoneProvider = new firebase.auth.PhoneAuthProvider();
   phoneProvider
   .verifyPhoneNumber(phoneNumber)
     .then(setVerificationId);
     setPhoneNumber('');
  };

  const confirmCode =  async() => {
     await firebase.auth().signInWithCredential(credential)
    .then(() =>{
      setCode('');
    })
    .catch((error) =>{
      alert(error)
    })
    Alert.alert('Login Success');
  };

  return (
    <View style={styles.container}>
    {/* //   <FirebaseRecaptchaVerifierModal
    //     ref ={recaptchaVerifier}
    //     firebase={firebase}
    //   /> */}
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={SendVerification}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter Otp"
        keyboardType="number-pad"
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm Verification Code</Text>
      </TouchableOpacity>
      {/* {confirmation && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Verification Code"
            keyboardType="number-pad"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    width: '90%',
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// const Otp = () => {

//     const [mobileNo,setMobileNo] = useState('');
//     const [otpInput,setotpInput] = useState('');
//     const [confirmotp,setConfirmOtp] = useState('');
//     const Sendotp= () =>{
//         try {
//             // const mobile = "+91" + mobileNo;
//           const response =  firebase.auth().signInWithPhoneNumber('mobileNo');
//           setConfirmOtp(response);
//           console.log(response);
//           alert('Success');
//         } catch (error) {
//             console.log(error)
//         }
//     };

//     const Submitotp=() =>{
//         try {
            
//         } catch (error) {
//             console.log(error)
//         }
//     };

//   return (
//     <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
//       <TextInput style={{borderWidth: 1,width: '80%', marginBottom:5}}
//       placeholder="Enter Your Mobile No"
//       onChangeText={(value) => setMobileNo(value)}/>
//       <Button title ="Send Otp" onPress={()=>Sendotp()}/>
//       <TextInput style={{borderWidth: 1,width: '80%', marginBottom:5}}
//       placeholder="Enter otp"
//       onChangeText={(value) => setotpInput(value)}/>
//       <Button title ="Confirm Otp" onPress={()=>Submitotp()}/>
//     </View>
//   )
// }

export default Otp

// const styles = StyleSheet.create({})