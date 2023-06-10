import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect}from 'react'
import BottomNav from "../src/components/BottomNav";
import {firebase} from '../Firebase/firebaseConfig'

const Placeorder = ({navigation, route}) => {
  const {cartdata} = route.params;
  const [orderdata, setOrderdata] = useState([]);
  const [totalCost, setTotalCost] =useState('0');

  useEffect(() => {
    setOrderdata(JSON.parse(cartdata))
  }, [cartdata])

  useEffect(() => {
    if (cartdata != null) {
      const productPrice = JSON.parse(cartdata).cart;
      // console.log(productPrice);

      let totalproductPrice = 0;
      productPrice.map((item) =>{
       totalproductPrice = (parseInt(item.data.productPrice) * parseInt(item.productquantity)) + totalproductPrice ;
      })
      setTotalCost(JSON.stringify(totalproductPrice +50))
    }
  },[cartdata])

  //////////////////////////////////////

  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
  const checklogin = () => {
    firebase.auth().onAuthStateChanged((user) => {
     if(user){
      console.log(user);
      setUserloggeduid(user.uid);
     }else{
      // setUserloggeduid(null);
      //  console.log('No user logged in')
      //  navigation.navigate('Login')
     }
    });
  checklogin()  
  }
  }, []);

  useEffect(() => {
    const getuserdata = async () => {
    const docRef = firebase.firestore().collection('UserData')
    .where('uid','==',firebase.auth().currentUser.uid);
    const doc = await docRef.get();
    if(!doc.empty){
      doc.forEach((doc) => {
        setUserdata(doc.data());
      })
    } else{
      // navigation.navigate('Login');
    }
    }
    getuserdata();
  },[userloggeduid])

  // console.log(userloggeduid)

  const placenow =() => {
    console.log('Placenow');
    //////////////////After Payment //////////////////

    const docRef = firebase.firestore().collection('UserOrders').doc(new Date().getTime().toString());
    docRef.set({
      orderid: docRef.id,
      orderdata: orderdata.cart,
      orderstatus:'pending',
      ordercost: totalCost,
      orderdate: firebase.firestore.FieldValue.serverTimestamp(),
      orderaddress:userdata.address,
      orderphone:userdata.phone,
      ordername:userdata.name,
      orderuseruid: userdata.uid,
      orderpayment:'ofline',
      paymentstatus:'not paid',
      
    }).then(() => {
      alert("Order successfully")
      navigation.navigate('Home')
    });
  }
  return (
    <>
    <ScrollView style={styles.containerout}>
      <View style={styles.container}>
        <Text style={styles.head1}>Order Summary</Text>
        <FlatList style={styles.c1} data ={orderdata.cart} renderItem={
         ({item}) => {
          return (
            <View style={styles.rowout}>
             <View style={styles.row}>
              <View style={styles.left}>
                <Text style={styles.qty}>{item.productquantity}</Text>
                <Text style={styles.pr}>{item.data.productName}</Text>
                <Text style={styles.price}>₹ {item.data.productPrice}</Text>
              </View>
              <View style={styles.rights}>
                <Text style={styles.totalprice}>₹ {parseInt(item.productquantity)*
                parseInt(item.data.productPrice)}</Text>
              </View>
              </View> 
            </View>
          )
         } 
        }/>

        <View>
          <Text style ={styles.charge}>Delevery charge : ₹ 50</Text>
        </View>

        <View style={styles.total}>
          <View style={styles.left}>
            <Text style={styles.title}>Order Total :</Text>
          </View>
          <View style={styles.left}>
          <Text style={styles.totalprice}>₹ {totalCost}</Text>
          </View>
        </View>

        <View style={styles.userout}>
          <Text style={styles.head1}>Your Details</Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Name :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.titles}>{userdata?.name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Email :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.titles}>{userdata?.email}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Mobile No :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.titles}>{userdata?.phone}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Address :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.titles}>{userdata?.address}</Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
    <TouchableOpacity style={styles.btn} onPress={() => placenow()}>
        <Text style={styles.btntxt} >Proceed to Payment</Text>
    </TouchableOpacity>
    <BottomNav navigation={navigation}/>
    </>
  )
}

export default Placeorder

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
  },
  head1:{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    margin: 10,
    textAlign: 'center',
  },
  userout:{
    width: '97%',
    // alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    padding: 10,
    backgroundColor: 'white',
   
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
  left:{
    flexDirection: 'row',
    alignItems:'center',
    // marginLeft: 10,
  },

  right:{
    marginLeft:20,
    width: '80%',
  },
  rights:{
    marginLeft:20,
  },
  pr:{
    marginRight:20,
    fontSize: 20
  },
  qty:{
    width: 40,  
    height: 30,
    backgroundColor: 'red',
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
    color: 'red',
  },
  titles:{
    fontSize: 20,
    fontWeight: 'bold',
    width:'90%',
    heigt:'100%',
    marginRight:25,
    color: 'black',
    // padding: 10,
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
  },
  total:{
    flexDirection:'row',
    margin: 20,
  },
  btntxt:{
    fontSize: 20,
    padding:10,
    width:'60%',
    marginLeft: 70,
    marginBottom:10,
    backgroundColor:'red',
    color: 'white',
    borderRadius: 10,
    // marginTop: 30,
  },
  charge:{
    color: 'green',
    fontSize: 20,
  }
})