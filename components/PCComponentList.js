import React, { Component } from "react";
import { Text, StyleSheet, View, Picker, ListView,ScrollView } from "react-native";
import { createStackNavigator } from 'react-navigation'; 
import DetailsCPU from './DetailsProduct/DetailsCPU'
import DetailsGPU from './DetailsProduct/DetailsGPU'
import DetailsHDD from './DetailsProduct/DetailsHDD'
import DetailsRAM from './DetailsProduct/DetailsRAM'
import DetailsCasePC from './DetailsProduct/DetailsCasePC'
import DetailsNguon from './DetailsProduct/DetailsNguon'
import DetailsMainboard from './DetailsProduct/DetailsMainboard'
import { Container, Header, Left, Content, Icon, Title, Card, CardItem, Body, List, ListItem, Button } from 'native-base';
export default class PCComponentList extends React.Component {
    static navigationOptions = {
        title: 'Danh sách phần cứng'
    }
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state= {
            id:[],
            language:'ram',
            selected:''
        };
    }      
    
   
    
      clickme=()=>{
        return fetch('http://doancn.azurewebsites.net/api/'+this.state.language)
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
                case 'ram':
                    t = "DetailsRAM";
                    break;
                case 'cpu':
                    t = "DetailsCPU";
                    break;
                case 'gpu':
                    t = "DetailsGPU";
                    break;
                case 'hdd':
                    t = "DetailsHDD";
                    break;
                case 'casepc':
                    t = "DetailsCasePC";
                    break;
                case 'nguon':
                    t = "DetailsNguon";
                    break;
                case 'mainboard':
                    t = "DetailsMainboard";
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
            case 'ram':
                t = `${ articleData.MaRam }`;
                break;
            case 'cpu':
                t = `${ articleData.MaCPU }`;
                break;
            case 'gpu':
                t = `${ articleData.MaGPU }`;
                break;
            case 'hdd':
                t = `${ articleData.MaHDD }`;
                break;
            case 'casepc':
                t = `${ articleData.MaCase }`;
                break;
            case 'nguon':
                t = `${ articleData.MaNguon }`;
                break;
            case 'mainboard':
                t = `${ articleData.MaMain }`;
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
                       <View >
                        <Text style={{fontWeight:'bold', fontSize:16, color:"#000000"}}>{articleData.Model}</Text>
                        <Text style={{}}>Giá: {articleData.Giaban} VND</Text>
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
                        <Picker.Item label="Bộ nhớ - RAM" value="ram" />
                        <Picker.Item label="Bộ xử lý - CPU" value="cpu" />
                        <Picker.Item label="Ổ cứng - HDD" value="hdd" />
                        <Picker.Item label="Bo mạch chủ - Mainboard" value="mainboard" />
                        <Picker.Item label="Nguồn PC - Power" value="nguon" />
                        <Picker.Item label="Thùng máy - Case" value="casepc" />
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
      PCComponentList : PCComponentList,
      DetailsRAM : DetailsRAM,
      DetailsCPU : DetailsCPU,
      DetailsHDD : DetailsHDD,
      DetailsGPU : DetailsGPU,
      DetailsCasePC : DetailsCasePC,
      DetailsNguon : DetailsNguon,
      DetailsMainboard : DetailsMainboard
    },
    {
      initialRouteName: 'PCComponentList',
    }
  );

