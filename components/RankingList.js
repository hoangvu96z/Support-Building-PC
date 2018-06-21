import React, { Component } from "react";
import { Text, StyleSheet, View, Picker, ListView,ScrollView } from "react-native";
import { createStackNavigator } from 'react-navigation'; 
import DetailsCPU from './DetailsProduct/DetailsCPU'
import DetailsGPU from './DetailsProduct/DetailsGPU'
import { Container, Header, Left, Content, Icon, Title, Card, CardItem, Body, List, ListItem, Button } from 'native-base';
export default class RankingList extends React.Component {
   
  static navigationOptions = {
    title: 'BXH phần cứng'
}
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state= {
            id:[],
            language:'cpu',
            selected:''
        };
    }      
    
   
    
      clickme=()=>{
        return fetch('http://doancn.azurewebsites.net/api/'+this.state.language+'/orderby')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ id: responseJson });
        })
        .catch((error) => {
          console.error(error);
        });
      }

      componentDidMount() {
        this.clickme();
      }

    render() {
        onPress2 = (name) =>{
            let t = this.state.language;
    
            switch(t) {
                case 'cpu':
                    t = "DetailsCPU";
                    break;
                case 'gpu':
                    t = "DetailsGPU";
                    break;
                    default:
                    t = '';
            }
            this.props.navigation.navigate(t,{
                masp : {name}
            })
          }
          
        let t2 = ''+this.state.language;

        let articles = this.state.id.map(function (articleData, index) {
            let t = '';
                switch(t2) {
                    case 'cpu':
                        t = `${ articleData.MaCPU }`;
                        break;
                    case 'gpu':
                        t = `${ articleData.MaGPU }`;
                        break;
                    default:
                        t = '';
                    if(t == '')
                    {
                        alert ("Bạn cần bấm nút CHỌN để load danh sách ?");
                    }
            }
          
       
            return (
                   

                    <ListItem
                    onPress={() => this.onPress2(
                        t
                    )}
                    >
                    <View>
                        <Text style={{fontWeight:'bold', color:"#000000", fontSize:14}}>{articleData.Model}</Text>
                        <Text style={{fontWeight:'bold', color:"#ff0000", fontSize:14}}> - Điểm:  {articleData.Diem} </Text>
                    </View>
                    </ListItem>
            )
        });
        return (
           
            <Container>
               <View style={{flexDirection:'row', backgroundColor:'#a0a2ff'}}>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: null, width: 315, backgroundColor:'#a0a2ff' }}
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                        <Picker.Item label="Bộ xử lý - CPU" value="cpu" />
                        <Picker.Item label="Card màn hình - GPU" value="gpu" />
                    </Picker>
                    <Button  light onPress={this.clickme}>
                        <Text>  Chọn  </Text>
                    </Button>
                </View>
                <ScrollView>
                    <List>
                      {articles}
                    </List>
                </ScrollView>
            </Container>
        
        )
    }
}
const PCC = createStackNavigator(
    {
      DetailsCPU : DetailsCPU,
      DetailsGPU : DetailsGPU,
      RankingList : RankingList,
    },
    {
      initialRouteName: 'RankingList',
    }
  );

