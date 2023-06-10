import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity,Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';

import {firebase} from '../Firebase/firebaseConfig';
import BottomNav from './../src/components/BottomNav';
// import { firebase } from 'firebase/compat/app';

const UserCart = ({navigation}) => {
    const [cartdata, setCatdata] = useState(null);
    const [totalCost, setTotalCost] = useState('0');

    const getCartData = async () => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);

        docRef.get().then((doc) => {
            if(doc.exists){
            // console.log('data exists');
            const data = JSON.stringify(doc.data());
            // console.log(data);
            setCatdata(data);
            }
            else {
                console.log('No data found')
            }
        }).catch((err) => {
            console.error("Error",err);
        });
    }
    useEffect(() => {
        getCartData();
    },[]);
    // console.log(cartdata);

    useEffect(() => {
      if (cartdata != null) {
        const productPrice = JSON.parse(cartdata).cart;
        // console.log(productPrice);

        let totalproductPrice = 0;
        productPrice.map((item) =>{
         totalproductPrice = (parseInt(item.data.productPrice) * parseInt(item.productquantity)) + totalproductPrice;
        })
        setTotalCost(JSON.stringify(totalproductPrice))
      }
    },[cartdata])

    const deleteItem = (item) => {
      const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
      docRef.update({
        cart: firebase.firestore.FieldValue.arrayRemove(item)
      })
      getCartData();
    }

  return (
    <View style={styles.containerout}>
     <View style={styles.container}>
       <Text style={styles.head1}>Your Cart</Text> 
       {cartdata == null || JSON.parse(cartdata).cart.length == 0 ?
       
        <Text style={styles.head2}>Your cart is Empty  <TouchableOpacity style={styles.shopbutton} onPress={()=>navigation.navigate('Home')}><Text style={styles.shopbuttontxt}>Go to Shop</Text></TouchableOpacity></Text>
        :
       <> 
       <ScrollView>
        <FlatList style={styles.cardlist} data={JSON.parse(cartdata).cart}
          renderItem={
          ({item}) => {
            return (
              <View style={styles.cartcard}>
                <Image source={{uri:item.data.productImageUrl}}
                style={styles.cartimg}/> 
                <View style={styles.cartcardin}>
                  <View style={styles.c1}>
                    <Text style={styles.txt1}>
                      {item.productquantity}
                      &nbsp;
                      {item.data.productName}
                    </Text>
                    <Text style={styles.txt2}> ₹ {item.data.productPrice}/each</Text>
                  </View>
                  <TouchableOpacity style={styles.c4}
                  onPress={() => deleteItem(item)}>
                    <Text style={styles.txt3}>Delete</Text>
                    <AntDesign name="delete" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
         }
        />
      </ScrollView>
      <View style={styles.btncont}>
        <View style={styles.c3}>
          <Text style={styles.txt5}>Total Price </Text>
          <Text style={styles.txt6}> ₹ {totalCost}</Text>
        </View>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btntxt} 
          onPress={() =>navigation.navigate('Placeorder',{cartdata})}>Place Order</Text>
        </TouchableOpacity>
      </View>
     </>
      
      }
      </View>
     <BottomNav navigation={navigation}/>
    </View>
  )
}

export default UserCart

const styles = StyleSheet.create({
  containerout:{
    flex: 1,
    width:'100%',
  },
  container:{
    flex: 1,
    width:'100%', 
  },
  shopbuttontxt:{
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'skyblue',
    borderRadius: 10,
    color: 'black',
    marginTop: 10,

  
  },
  head1:{
    fontSize:40,
    padding:10,
    borderRadius:10,
    backgroundColor: 'skyblue',
    fontWeight:'bold',
    textAlign: 'center',
    color: 'red',
  },
  head2:{
    fontSize:30,
    fontWeight:'300',
    textAlign: 'center',
    marginVertical: 20,
    elevation: 10,
    backgroundColor: 'white',
    width:'90%',
    height:'50%',
    alignSelf:'center',
    paddingVertical:'20%',
    borderRadius: 20,
    // color: 'red',
  },
  cartlist:{
    width:'100%',
  },
  cartcard:{
    flexDirection:'row',
    backgroundColor:'white',
    marginVertical:8,
    borderRadius: 10,
    width:'95%',
    alignSelf:'center',
    elevation: 10,
    alignItems:'center',
  },
  cartimg:{
    width: 150,
    height: 120,
    borderRadius: 10,
  },
  cartcardin:{
    flexDirection:'row',
    width:'58%',
    // alignItems:'center',
    // justifyContent:'center',
  },
  c1:{
    marginLeft:10,
  },
  c4:{
   marginLeft:20,
   alignItems:'center',
  },
  txt1:{
    fontSize:20,
    fontWeight: 'bold',
    color:'green',
  },
  txt2:{
    fontSize:20,
    color:'skyblue',
    fontWeight:'500',
    marginRight:10,
  },
  txt3:{
    fontSize:15,
    color:'red',
    fontWeight:'500',
  },
  btncont:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
  },

  btntxt:{
    backgroundColor:'red',
    color:'white',
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 5,
    width:'100%',
    marginRight: 10,
    textAlign:'center',
  },
  btn2:{
    padding:10,
    
  },
  c3:{
    justifyContent:'space-between',
    flexDirection:'row',
    marginTop: 10,
    alignItems:'center',
    // marginRight: 100,
  },
  txt5:{
    fontSize:23,
    fontWeight: 'bold',
    color:'green',
    marginLeft:10,
  },
  txt6:{
    fontSize:25,
    fontWeight: 'bold',
    color:'#ff1a1a',
    marginLeft:10,
  },
})