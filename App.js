import React, { Component } from 'react';
import { TouchableOpacity,Button,Share,Image,View,ScrollView,TextInput,Text,StyleSheet,FlatList,ImageBackground } from 'react-native';
import Header from './component/Header';
import { SearchBar } from 'react-native-elements';
import Lightbox from 'react-native-lightbox';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      input:'',
      index:''
    };
}

  componentDidMount(input){
    this.changeGifDisplay();
 }
 changeGifDisplay(input){
   input=this.state.input;
  fetch('https://api.giphy.com/v1/gifs/search?api_key=xTdy3ovyOU4voJ9cAXl5EwVvVvCfohj3&q=' + input +'&limit=5&offset=0')
  .then(res => res.json())
  .then((result) =>{
    //console.log("data from api",result.data[0].images.original.url)
    this.setState({
      data:result.data
    })
  })
  .catch((error) => {
    console.log(error)
  });
}


render() {

    return (

      <View style={{flex:1,backgroundColor:'#e8e8e8'}}>
        <Header/>
        <View style={{paddingTop:40}}>
          <SearchBar
          platform="android"
          round
          showLoading
          lightTheme
          onChangeText={(input) => this.setState({input})}
          onClear={(input) => this.setState({input:""})}
          placeholder='Search...'
          value={this.state.input}
          onSubmit={this.changeGifDisplay()}
          inputContainerStyle={styles.inputContainerStyle}
         />
        </View>
      <ScrollView  >
      <FlatList
              data={this.state.data}
               keyExtractor={(item,index)=>item.images.original.url}

              renderItem={({item,index})=>{
                //console.log(index)
                //console.log("url:",item.images.original.url)
                return(
                  <View>
                        <Lightbox underlayColor='white'

                      renderHeader={close =>{
                       return (
                        <TouchableOpacity  onPress={
                            ()=>{
                              console.log(item.images.original.url)
                              Share.share(
                              {
                                message:item.images.original.url,
                                title: 'Wow,Giphy!!!!'
                              }, {

                                dialogTitle: 'Share Giphy'
                              })
                            }
                          }>
                          <Text style={styles.closeButton}>SHARE</Text>
                        </TouchableOpacity>)}
                      } >
                        <View>
                          <Image

                             source={{uri:item.images.original.url}}
                          style={{borderColor: 'black',margin: 10,alignItems:'center',marginLeft:50,justifyContent:'center',width:250,height:180,borderRadius:3,borderWidth:2}} />

                        </View>
                      </Lightbox>
                    </View>)
              }

            }
            />
            </ScrollView>
            </View>

        );
  }
}
var styles = StyleSheet.create({


closeButton: {
   color: 'white',
   borderWidth: 1,
   borderColor: 'white',
   padding: 8,
   borderRadius: 3,
   textAlign: 'center',
   margin: 10,
   alignSelf: 'flex-end',
 },

 container:{
   paddingTop:100,
 }

})
