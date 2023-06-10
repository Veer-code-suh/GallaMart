import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import Catog1 from '../../assets/Catog1.jpg';
import Catog2 from '../../assets/Catog2.jpg';
import Catog3 from '../../assets/Catog3.jpg';
import Catog4 from '../../assets/Catog4.jpg';


const Categories = () => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
      <Text style={styles.headtext}>Categories</Text>
      <View style={styles.hr}></View>
      </View >
     <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
      <TouchableOpacity style={styles.box}>
      <Image source ={Catog1} style={styles.image}/>
      <Text>Top Offers</Text>
      </TouchableOpacity >
      
      <TouchableOpacity style={styles.box}>
      <Image source ={Catog2} style={styles.image}/>
      <Text>Baby Care</Text>
      </TouchableOpacity >
      
      <TouchableOpacity style={styles.box}>
      <Image source ={Catog3} style={styles.image}/>
      <Text >Grocerry</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}>
      <Image source ={Catog4} style={styles.image}/>
      <Text>Vegitables</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.box}>
      <Image source ={logo} style={styles.image}/>
      <Text>Image 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}>
      <Image source ={logo} style={styles.image}/>
      <Text>Image 2</Text>
      </TouchableOpacity> */}
     </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container:{
  backgroundColor: '#ffffcc',
  justifyContent:'center',
  alignItems:'center',
  borderRadius:10,

  },
  head: {
    alignItems:'center',
  },
  headtext:{
    
    fontSize:25,
    fontWeight: 'bold',
    color: 'green',
    padding:10,
    // elevation:30,
    borderRadius:10,
  },
  hr:{
    height:3,
    width:140,
    backgroundColor: 'red',
    color: 'black',
    borderRadius:10,
    // marginTop:20,
  },
 image:{
  width:80,
  height:100,
  backgroundColor:'#ffffe6',
  borderRadius:10,
  
 },
 box:{
  alignItems:'center',
  justifyContent:'center',
  elevation:30,
  margin:8,
  marginBottom:40,
  marginTop:20,
 
 }

})