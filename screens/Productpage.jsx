import { StyleSheet, Text, TextInput, View ,ScrollView, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import BottomNav from "../src/components/BottomNav";
import {firebase} from '../Firebase/firebaseConfig'


const Productpage = ({navigation, route}) => {

    const data =route.params;
    // console.log(data)
    if(route.params === undefined) {
        navigation.navigate('Home')
    }

    const [quantity, setQuantity] = useState('1');

    const addtocart = () => {
    // console.log('addtocart')
    const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
     
    const data1 = {data,productquantity:quantity}
    // console.log('data1',data1)

    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          cart: firebase.firestore.FieldValue.arrayUnion(data1)
        })
        alert('Added to cart.  Go to cart For Order')
        navigation.navigate('Cart');
      } 
     else {
      docRef.set({
        cart:[data1],
      }) 
     }
    })
  };

  const increaseQuantity = () => {
    setQuantity((parseInt(quantity) + 1).toString())
  }
  const decreaseQuantity = () => {
    if (parseInt(quantity)>1){
       setQuantity((parseInt(quantity) - 1).toString())
    }
  }
   
   const cartdata = JSON.stringify({cart: [{data,productquantity:quantity}] })

  //  console.log(cartdata);

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={styles.s1}>
        <Image source={{
            uri: data.productImageUrl 
        }} style={styles.cardimgin}/>
      </View>

      <View style={styles.s2}>
        <View style={styles.s2in}>
            <Text style={styles.head1}> {data.productName}</Text>
            <Text style={styles.head2}>  ₹{data.productPrice}/-</Text>
            <Text style={styles.head3}>{data.productQuantity}  </Text>
        </View>

        <View style={styles.container3}>
          <View style={styles.hr}></View>
          <Text style={styles.txt3}>Product Quantity</Text>
          <View style={styles.pmout}>
            <Text style={styles.plusminus} onPress={() => decreaseQuantity()}>-</Text>
            <TextInput value={quantity} style={styles.pminput}/>
            <Text style={styles.plusminus} onPress={() => increaseQuantity()}>+</Text>
          </View>
        </View> 

        <View style={styles.container4}>
         <Text style={styles.tptxt}>Total Price</Text>
         <Text style={styles.ptx}>
         ₹{(
          parseInt(data.productPrice)*parseInt(quantity)
         ).toString()}/-
         </Text>
        </View>


        <View style={styles.s3}>
         <Text style={styles.abouthd}>About Product</Text>  
         <Text style={styles.abouttxt}>{data.productDescription}</Text>  
        </View>  

        
      </View>  
  </ScrollView>
  <View style={styles.btncont}>
     
     <TouchableOpacity onPress={() => addtocart()}>
      <Text style={styles.btn2}>Add To Cart</Text>
     </TouchableOpacity>

     <TouchableOpacity onPress ={() => {
        navigation.navigate('Placeorder', {cartdata}) }}>
      <Text style={styles.btn1} 
      > Buy Now  </Text>
     </TouchableOpacity>
  </View>
  <BottomNav navigation={navigation}/>
  </>
  )
}

export default Productpage

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  s1:{
    width: '100%',
    height: 300,
    // borderWidth:5,
    // borderColor: 'skyblue',
    // borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardimgin:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
s2in:{
  width: '95%',
  marginTop: 10,
  flexDirection:'row',
  justifyContent: 'space-between',
  borderWidth:1,
  borderColor:'pink',
  borderRadius: 10,
  marginLeft:8,
  alignItems: 'center',
},
head1:{
       fontWeight:'700',
        fontSize:25,
        color:'green',
        // borderWidth:2,
        // borderColor: 'red',
        paddingRight: 25,
        padding:10,
        borderRadius:8,
        textAlign: 'center',
        marginLeft: 10,
    },
    head2:{
        fontSize:20,
        // borderWidth:2,
        paddingRight: 25,
        // borderColor: 'red',
        padding: 10,
        borderRadius:8,
        textAlign: 'center',
        // backgroundColor: 'green',
    },
    head3:{
        fontSize:20,
        // borderWidth:2,
        paddingLeft: 20,
        // borderColor: 'red',
        padding: 10,
        borderRadius:8,
        textAlign: 'center',
        marginRight:10,
        // backgroundColor: 'green',
    },
    s3:{
      backgroundColor:'pink',
      padding:20,
      height: 200,
      borderRadius:20,
      margin:15,
    },
    abouthd:{
      fontSize:25,
      fontWeight:'700',
      color:'white',
    },
    abouttxt:{
      fontSize:15,
      fontWeight:'400',
    },
  btncont:{
    justifyContent:'center',
    width:'100%',
    flexDirection:'row',
    backgroundColor:'white',
  },
    btn1:{
      backgroundColor:'red',
      padding:10,
      borderRadius:10,
      fontSize:22,
      fontWeight:'700',
      color:'white',
      marginLeft:55,
      margin:10,
      flexDirection:'row',
    },
   
    btn2:{
      backgroundColor:'red',
      padding:10,
      borderRadius:10,
      fontSize:22,
      fontWeight:'700',
      color:'white',
      margin:10,
      marginRight: 55,
},

container3:{
 width:'90%',
 alignItems:'center',
 alignSelf:'center',
},
txt3:{
  color:'blue',
  fontSize: 20,
  // fontWeight:'bold',
  marginTop:10,
},
plusminus:{
  backgroundColor:'red',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:10,
  elevation:10,
  padding:10,
  color:'white',
  fontSize:20,
  fontWeight:'bold',
},
pminput:{
  backgroundColor:'white',
  alignItems:'center',
  textAlign:'center',
  justifyContent:'center',
  borderRadius:10,
  elevation:10,
  padding:10,
  fontSize:20,
  fontWeight:'bold',
  width:50,
  marginHorizontal:10
},
pmout:{
  flexDirection:'row',
  alignItems:'center',
  margin: 10,
},
container4:{
  flexDirection:'row',
  padding:10,
  width: '90%',
  marginLeft:10,
  marginTop:10,
  borderWidth:1,
  borderColor:'green',
  borderRadius:10,
  justifyContent:'space-between',
},
tptxt:{
  fontSize:25,
  fontWeight:'300',
  color:'red',
},
ptx:{
  fontSize:25,
  fontWeight:'bold',
  color:'green',
}
})