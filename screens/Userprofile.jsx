import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import BottomNav from "../src/components/BottomNav";
import {firebase} from '../Firebase/firebaseConfig'
const Userprofile = ({navigation}) => {

  const [userlogged, setUserlogged] = useState(null);
  const [userdata, setUserdata] = useState(null);
  // const [islogged, setIslogged] = useState(false)
  useEffect(() => {
    const checklogin = () => {
    firebase.auth().onAuthStateChanged((user) => {
     if(user){
      // console.log(user);
      setUserlogged(user.uid);
     }else{
      setUserlogged();
       console.log('No user logged in')
      //  navigation.navigate('Login')
     }
    });
  checklogin()  
  }
  }, []);
  
    const getuserdata = async () => {
    const docRef = firebase.firestore().collection('UserData')
    .where('uid', '==', firebase.auth().currentUser.uid)
    const doc = await docRef.get();
    if(!doc.empty) {
      doc.forEach((doc) => {
        setUserdata(doc.data());
      })
    } else{
      // navigation.navigate('Login'); 
      console.log('No user logged in');
    }
    }
  useEffect(() => {
    getuserdata();
  },[userlogged])


  // const Userprofile = ({navigation}) => {
  
    // const [islogged, setIslogged] = useState(false)
  
    // const retriveData = async ()=>{
    //   try {
    //     const data =await AsyncStorage.getItem('userRef');
    //     setIslogged(data);
    //     // navigation.navigate('Home');
    //     // console.log(data); 
    //   } catch (error) {
        
    //   }
    // };
  
    // useEffect(() => {
    //   retriveData();
      
    // }, []) 
  

  
   const handleLogout = () => {
    firebase.auth().signOut()
    .then(() => {
      setUserlogged(null);
      console.log('User logged out');
      navigation.navigate('Welcome');

    })
  }

 ////////////////// Update Data/////////////////////

 const [edit,setEdit] = useState(false);
 const [newname,setNewName] = useState('');
 const [newaddress,setNewAddress] = useState('');
 const [newphone,setNewPhone] = useState('');

 const updateuser = async () => {
  const docRef = firebase.firestore().collection('UserData')
    .where('uid', '==', firebase.auth().currentUser.uid)
    const doc = await docRef.get();

    if(!doc.empty){
      if(newname !== ''){
        doc.forEach((doc) =>{
          doc.ref.update({name: newname})
        })
    }
  }
    setEdit(false);

 };

 const [Passwordedit,setPasswordedit] = useState(false);
 const [oldpassword,setOldPassword] = useState('');
 const [newpassword,setNewPassword] = useState('');

 const updatePassword = async () => {
  setPasswordedit(false);
 };

  return (
  <>
    {edit == false && Passwordedit == false &&
     <View style={styles.container}>
      <Text style={styles.head1}>Your Profile</Text>
      <View style={styles.containerin}>
        <Text style={styles.head2}>Name : 
      
          {userdata ? 
           <Text style={styles.head2in}>
            {userdata.name}</Text> :
            'loading...'}
            </Text>
            
        < Text style={styles.head2}>Phone :   
           {userdata ? 
           <Text style={styles.head2in}>
             {userdata.phone}</Text> :
            'loading...'}
            </Text>
        <Text style={styles.head2}>Email :  
      
          {userdata ? 
            <Text style={styles.head2in}>
             { userdata.email}</Text> :
            'loading...'}
          </Text>
        <Text style={styles.head2}>Address :  
      
          {userdata ? 
           <Text style={styles.head2in}>
            {userdata.address}</Text> : 
            'loading...'}
          </Text>
      </View>
      <TouchableOpacity onPress={() =>{setEdit(!edit)}} >
        <Text style={styles.logout}>Edit Details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>{setPasswordedit(!Passwordedit)}} >
        <Text style={styles.logout}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLogout()} >
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>}
    {edit == true &&
     <View style={styles.container}>
      <Text>Edit Profile</Text>
      <TextInput style={styles.input} placeholder='Name'
      onchangetext={(e) =>setNewName(e)}/>
      <TextInput style={styles.input} placeholder='Mobile Number'
      onchangetext={(e) =>setNewPhone(e)}/>
      <TextInput style={styles.input} placeholder='Address'
      onchangetext={(e) =>setNewAddress(e)}/>

    <TouchableOpacity onPress={() => updateuser()} >
        <Text style={styles.logout}>Submit</Text>
    </TouchableOpacity>
    </View>
     }

    {Passwordedit == true &&
     <View style={styles.container}>
      <Text>Change Password</Text>
      <TextInput style={styles.input} placeholder='Old Password'
      onchangetext={(e) =>setOldPassword(e)}/>
      <TextInput style={styles.input} placeholder='New Password'
      onchangetext={(e) =>setNewPassword(e)}/>
    <TouchableOpacity onPress={() => updateuser()} >
        <Text style={styles.logout}>Submit</Text>
    </TouchableOpacity>
    </View>
     }
    <BottomNav navigation={navigation}/>


  </>
   
    
  )
}

export default Userprofile

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'pink',
  },
  head1:{
    fontSize: 35,
    color: 'green',
    backgroundColor: 'skyblue',
    padding: 10,
    width: '100%',
    textAlign:'center',
  },
  containerin:{
    width: '97%',
    // alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    padding: 10,
    backgroundColor: 'black',
    opacity:0.84,
  },
  head2:{
    fontSize: 21,
    fontWeight:'500',
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
  },
  head2in:{
   fontWeight:'400',
   fontSize: 18,
   marginLeft: 10,
  },
  logout:{
    fontSize: 25,
    padding: 15,
    backgroundColor:'skyblue',
    borderRadius: 5,
    color:'red',
    fontWeight:'500',
  }
})