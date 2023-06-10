import { StyleSheet,StatusBar, Text, View, ScrollView  } from 'react-native';
import React, {useState, useEffect} from 'react';
import HomeHeadNav from "../src/components/HomeHeadNav";
import Categories from "../src/components/Categories";
import OfferSlider from "../src/components/OfferSlider";
import Cardslider from "../src/components/Cardslider";
import BottomNav from "../src/components/BottomNav";

import {firebase} from '../Firebase/firebaseConfig'


const HomeScreen = ({navigation}) => {
  const [productData, setProductData] = useState([]);
  const [HomeData, setHomeData] = useState([]);
  const [FoodData, setFoodData] = useState([]);
  const [DailyData, setDailyData] = useState([]);

  const productRef = firebase.firestore().collection('ProductData')
  useEffect(() =>{
    productRef.onSnapshot(snapshot => {
      setProductData(snapshot.docs.map(doc => doc.data()))
    })
  },[])

  useEffect(() =>{
    setHomeData(productData.filter(item => item.productType === 'home-item'))
    setFoodData(productData.filter(item => item.productType === 'food-item'))
    setDailyData(productData.filter(item => item.productType === 'daily-item'))
  },[productData])

  // console.warn(productData)

  // const [userlogged, setUserlogged] = useState(null);
  // useEffect(() => {
  //   const checklogin = () => {
    
  //     firebase.auth().onAuthStateChanged((user) => {
  //      if(user){
  //       // console.log(user);
  //       setUserlogged(user);
  //       navigation.navigate('Home');
  //      }else{
  //        setUserlogged('');
  //       console.log('No user logged in')
  //       navigation.navigate('Welcome');
        
  //      }
  //     })
  //   checklogin()  
  //   }
  //   }, []);
    
    // console.log(userlogged);

  return (
    <>
    <HomeHeadNav navigation={navigation}/> 
    <ScrollView>
        <StatusBar/>
        <Categories/>
        <OfferSlider/>
        <Cardslider title ={"Today special"} data ={productData} navigation={navigation}/> 
        <Cardslider title ={"Food Product"} data ={FoodData} navigation={navigation}/>
        <Cardslider title ={"Daily Product"} data ={DailyData} navigation={navigation}/>    
        <Cardslider title ={"Home Product"} data ={HomeData} navigation={navigation}/>     
             
    </ScrollView>
    <BottomNav navigation={navigation}/>
   </> 
  )
}

export default HomeScreen

// const styles = StyleSheet.create({})