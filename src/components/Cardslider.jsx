import { StyleSheet, Text, View, FlatList, Image,TouchableOpacity } from 'react-native'
import React, {useState ,useEffect} from 'react'

const Cardslider = ({title,data,navigation,route}) => {
  const openProductpage=(item) =>{
    navigation.navigate('Product',item)
  }

  ////////////////////////////////////

  // const [quantity, setQuantity] = useState('1');
  // const [orderdata, setOrderdata] = useState([]);
  // const [totalCost, setTotalCost] =useState('0');

  // const cartdata = JSON.stringify({cart: [{data,productquantity:quantity}] })
  // console.log(cartdata); 
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>
        {title}
      </Text>
      <FlatList style={styles.cardout}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({item}) => (
      <TouchableOpacity key={item.index} onPress={() => {
        openProductpage(item)
      }}>
        <View style={styles.card}>
          <View style={styles.s1}>
            <Image source={{
              uri: item.productImageUrl
            }} style={styles.cardimgin}/> 
          </View>
          <View style={styles.s2}>
            <Text style={styles.Ptext}>{item.productName}</Text>
            <View style={styles.s2in}>
              <Text style={styles.txt2}>Rs.{item.productPrice}/-</Text>
              <Text style={styles.txt2}>{item.productQuantity}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.s3} key={item.index} onPress={() => {
        openProductpage(item)
      }}>
            <Text style={styles.buybtn}>Buy</Text>
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

export default Cardslider

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#ffe6ff',
    // marginVertical: 20,
    alignItems: 'center',
  },
  cardouthead:{
    color:'#ff0000',
    width:'90%',
    fontSize:25,
    fontWeight:'500',
    borderRadius: 10,
    margin: 10,
    fontWeight:'700',
  },
  cardout:{
    width:'100%',
    marginRight:10,
    // backgroundColor:'red',

  },
  card:{
    width: 260,
    height: 290,
    margin: 5,
    borderRadius: 10,
    borderColor:'pink',
    backgroundColor:'white',
  },
  cardimgin:{
   width:200,
   alignItems: 'center',
   height: 193,
   borderRadius: 10, 
  },
  s2:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    
  },
  Ptext:{
    fontSize:25,
    fontWeight: '500',
    color:'green',
    marginLeft:10,
  },
  txt2:{
    fontSize:18,
    fontWeight:'500',
    marginTop:5,
  },
  buybtn:{
    justifyContent:'center',
    alignItems: 'center',
    textAlign:'center',
    color:'white',
    backgroundColor:'#4dffff',
    fontSize:28,
    fontWeight:'600',
    borderRadius:10,
    width:'100%',
  }
})