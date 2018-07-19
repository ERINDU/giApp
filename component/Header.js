import React from 'react'
import{ View,Text,StyleSheet

} from 'react-native'
export default ()=>(
  <View style={styles.header}>
      <Text style={styles.title}>Giphies</Text>
  </View>
)
const styles = StyleSheet.create({
  header:{
    //flex:1,
    height:50,
    backgroundColor:"#DB4C3F",
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontSize:24,
    color:'#FFF'
  }
})
