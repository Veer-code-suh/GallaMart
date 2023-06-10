import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React ,{useState, useEffect} from 'react'
import HomeHeadNav from "../src/components/HomeHeadNav";
import BottomNav from "../src/components/BottomNav";
import {firebase} from '../Firebase/firebaseConfig';


const Trackorder = ({navigation}) => {

    const [orders, setOrders] =useState([])

    const getorders = async () => {
        const ordersRef = firebase.firestore().collection('UserOrders').where('orderuseruid', '==', firebase.auth().currentUser.uid)

        ordersRef.onSnapshot(snapshot => {
            setOrders(snapshot.docs.map(doc => doc.data()))
        })
    }

    useEffect(() => {
        getorders()
    },[])

    const convertDate = (date) => {
      let newDate = new Date(date.seconds * 1000)
      return newDate.toDateString()
    }

    const cancelOrder =(orderitem) => {
      const orderRef = firebase.firestore().collection('UserOrders')
      .doc(orderitem.orderid);
      orderRef.update({
        orderstatus: 'cancelled'
      })
    }
    
  return (
    <>
    <HomeHeadNav navigation={navigation}/>
    <ScrollView style={styles.container}>
      <Text style={styles.head1}>Track Orders</Text>
     {orders.sort(
      (a, b) => b.orderdate.seconds-a.orderdate.seconds
     ).map((order, index) =>{
      return (
        <View style={styles.ordercard} key={index}>
          <Text style={styles.orderindex}>{index + 1}</Text>
          <Text style={styles.ordertxt}>Order Id : {order.orderid}</Text>
          <Text style={styles.ordertxt2}>Order Date : {convertDate(order.orderdate)}</Text>
          {order.orderstatus == 'ontheway' && <Text style={styles.orderotw}>Your order is on the way</Text>}
          {order.orderstatus == 'deliverd' && <Text style={styles.orderdelivered}>Your order is delivered</Text>}
          {order.orderstatus == 'cancelled' && <Text style={styles.ordercancelled}>Your order is cancelled</Text>}
          {order.orderstatus == 'pending' && <Text style={styles.orderpending}>Your order is confirm</Text>}

          <View style={styles.row1}>
            <Text style={styles.ordertxt1}>Delivery Agent name & contact</Text>
            {
            order.deliveryboy_name ? <Text style={styles.ordertxt2}>{order.delveryboy_name}</Text> 
            : <Text style={styles.ordertxt2}>Not Assigned</Text>
            }

            {
              order.deliveryboy_phone ? <Text style={styles.ordertxt2}>{order.deliveryboy_phone}</Text> : null
            }
          </View>

        <FlatList style={styles.c1} data ={order.orderdata} renderItem={
         ({item}) => {
          return (
            <View style={styles.rowout}>
             <View style={styles.row}>
              <View style={styles.left}>
                <Text style={styles.qty}>{item.productquantity}</Text>
                <Text style={styles.pr}>{item.data.productName}</Text>
                <Text style={styles.price}>₹ {item.data.productPrice}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.totalprice}>₹ {parseInt(item.productquantity)*
                parseInt(item.data.productPrice)}</Text>
              </View>
              </View> 
            </View>
            
             
          )
         } 
        }
        />

        <Text style={styles.totalprice}>Total: ₹ {order.ordercost}</Text>
        {
          order.orderstatus === 'delivered' ? <Text style={styles.ordertxt5}>Thank You for ordering with us</Text> : null
        }

        {
          order.orderstatus === 'cancelled' ? <Text style={styles.ordertxt5}>Sorry for the inconvenience</Text> : null
        }

        {
          order.orderstatus != 'cancelled' && order.orderstatus != 'delivered' ? 
          <TouchableOpacity style={styles.cancelbtn}
          onPress ={() => cancelOrder(order)}>
            <Text style={styles.cancelbtnin}>Cancel Order</Text>
          </TouchableOpacity> : null
        }
        <View style={styles.hr}></View>
        </View>
      )
     })
     }
     
    </ScrollView>
    <BottomNav navigation={navigation}/>
    </>
  )
}

export default Trackorder

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  head1:{
    fontSize:30,
    fontWeight:'bold',
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  rowout:{
    flexDirection:'row',
    margin: 10,
    elevation: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical: 5,
    justifyContent: 'space-between',
 },
 row1:{
  flexDirection: 'column',
  margin: 10,
  elevation: 10,
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
 },
 left:{
  flexDirection: 'row',
  alignItems:'center',
  marginLeft: 10,
},
right:{
  marginLeft:20,
 
},
pr:{
  marginRight:20,
  fontSize: 20
},
qty:{
  width: 40,  
  height: 30,
  backgroundColor: 'skyblue',
  textAlign: 'center',
  borderRadius: 10,
  marginRight: 10,
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
},
title:{
  fontSize: 20,
  fontWeight: 'bold',

},
price:{
  fontSize: 20,
  
},
totalprice:{
  fontSize: 20,
  borderWidth: 1,
  borderColor: 'red',
  borderRadius: 10,
  padding: 5,
  textAlign: 'center',
},
total:{
  flexDirection:'row',
  margin: 20,
},
order:{
  margin: 20,
  elevation: 10,
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 20,
},
ordertxt1:{
  fontSize: 20,
  color: 'red',
  textAlign: 'center',
  marginVertical: 15,
  marginLeft: 10,
},
ordertxt:{
  fontSize: 20,
  marginTop: 25,
  marginLeft: 15,
  textAlign: 'center',
  color: 'red',
  fontWeight: 'bold',
},
ordertxt2:{
  fontSize: 20,
  marginVertical: 5,
  marginLeft: 25,
  textAlign: 'center',
  color: 'black',
  fontWeight: 'bold',
},
orderindex:{
  fontSize: 20,
  color: 'white',
  backgroundColor: 'red',
  textAlign: 'center',
  borderRadius: 50,
  padding: 5,
  width: 45,
  position: 'absolute',
  top: 35,
  left: 4,
},
ordertxt5:{
  fontSize: 20,
  color: 'red',
  textAlign:'center',
  marginVertical: 5,
  borderColor:'red',
  borderWidth: 1,
  borderRadius: 10,
  padding: 5,
},
cancelbtn:{
  backgroundColor: 'red',
  padding: 10,
  borderRadius: 10,
  alignSelf:'center',
  marginBottom: 50,
  marginTop: 20,
},
cancelbtnin:{
  fontSize: 20,
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
},
orderotw:{
  fontSize: 20,
  backgroundColor: 'orange',
  color: 'white',
  textAlign: 'center',
  borderRadius: 10,
  padding: 5,
  marginVertical: 10,
  paddingHorizontal: 10,
  alignSelf:'center',
},
orderdelivered:{
  fontSize: 20,
  backgroundColor: 'green',
  color: 'white',
  textAlign: 'center',
  borderRadius: 10,
  padding: 5,
  marginVertical: 10,
  paddingHorizontal: 10,
  alignSelf:'center',
},
ordercancelled:{
  fontSize: 20,
  backgroundColor: 'red',
  color: 'white',
  textAlign: 'center',
  borderRadius: 10,
  padding: 5,
  marginVertical: 10,
  paddingHorizontal: 10,
  alignSelf:'center',
},
orderpending:{
  fontSize: 20,
  backgroundColor: 'yellow',
  color: 'black',
  textAlign: 'center',
  borderRadius: 10,
  padding: 5,
  marginVertical: 10,
  paddingHorizontal: 10,
  alignSelf:'center',
},


hr:{
  backgroundColor: 'green',
  height: 5,
  width: '100%',
},
})