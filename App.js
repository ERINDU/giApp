import React, { Component } from 'react';
import { TouchableOpacity,Button,Share,Image,View,ScrollView,TextInput,Text,StyleSheet,FlatList,ImageBackground } from 'react-native';
import Header from './component/Header';
import Lightbox from 'react-native-lightbox';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      input:'',
      index:''
    };


    this.onClick=this.onClick.bind(this);
  }
  onClick(index) {
  Share.share(
    {
    message:this.state.index,
    title: 'Wow,Giphy!!!!'
  }, {

    dialogTitle: 'Share Giphy'
  })
this.setState({index})
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

      <View>
        <Header/>

      <ScrollView>
        <TextInput
          placeholder='Search a Giphy'
          style={{height: 40, borderColor: 'gray', borderWidth:2}}
        onChangeText={
          (input) => this.setState({input})
        }
        value={this.state.input}
        onSubmit={this.changeGifDisplay()}
        />

            <Text style={{fontSize:18}}>
              Display a Giphy
            </Text>
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
                            style={styles.imag}
                             source={{uri:item.images.original.url}}
                          style={{width:400,height:200}} />

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
imag: {
  width:300,
  height:200
},
closeButton: {
   color: 'white',
   borderWidth: 1,
   borderColor: 'white',
   padding: 8,
   borderRadius: 3,
   textAlign: 'center',
   margin: 10,
   alignSelf: 'flex-end',
 }

})
