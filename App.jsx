import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react'
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import Userprofile from './screens/Userprofile';
import Productpage from './screens/Productpage';
import UserCart from './screens/UserCart';
import Placeorder from './screens/Placeorder';
import Trackorder from './screens/Trackorder';


import { firebase } from "./Firebase/firebaseConfig";


const App = () => {

  const Stack = createNativeStackNavigator();

  const [islogged, setIslogged] = useState(false)

  const retriveData = async ()=>{
    try {
      const data =await AsyncStorage.getItem('keepLoggedIn');
      setIslogged(data);
      // navigation.navigate('Home');
      // console.log(data); 
    } catch (error) {
      
    }
  };

  useEffect(() => {
    retriveData();
    
  }, [])
  //  const user = firebase.auth().currentUser;
  // if (user) {
  //   navigation.navigate('Home');
  // }

  
// function MyDrawer() {
//   const Drawer = createDrawerNavigator();
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Profile" component={Userprofile} />
//     </Drawer.Navigator>
//   );
// }


    return (
      
        <NavigationContainer>
          <Stack.Navigator>
         <Stack.Screen name="Welcome" component={WelcomeScreen}
         options={{
          headerShown: false,
        }} />
        
         <Stack.Screen name="Home" component={HomeScreen} 
         options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Signup" component={SignupScreen}
         options={{
          headerShown: false,
        }}  />
        <Stack.Screen name="Login" component={LoginScreen} 
         options={{
          headerShown: false,
        }} />
       
        <Stack.Screen name="Profile" component={Userprofile} 
         options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Product" component={Productpage} 
         options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Cart" component={UserCart} 
         options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Placeorder" component={Placeorder}
         options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Trackorder" component={Trackorder}
         options={{
          headerShown: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;