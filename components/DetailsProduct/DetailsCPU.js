import React, { Component } from 'react';
import { Image,ImageBackground } from 'react-native';
import { Container, Header, Content, Icon, Title, Right, Card, CardItem,Left, Body, Text, View, Button, ListItem } from 'native-base';
export default class DetailCPU extends Component {
    static navigationOptions = {
        title: 'Chi tiết sản phẩm'
    }
    constructor() {
        super();
        this.state = {
            id: [],
            hangsx : []
        };
      }
      async getbyID(name) {
        let array = [];
        try {
          let response = await fetch("http://doancn.azurewebsites.net/api/cpu/"+name);
          let responseJson = await response.json();
          array.push(responseJson)
          this.setState({ id: array });
        } catch (error) {
          console.error(error);
        }
      }
      async getbyHSX(name) {
        let array = [];
        try {
          let response = await fetch("http://doancn.azurewebsites.net/api/hangsx/"+name);
          let responseJson = await response.json();
          array.push(responseJson);
          this.setState({ hangsx: array});
        } catch (error) {
          console.error(error);
        }
      }
      componentDidMount() {
        const MASP =  this.props.navigation.getParam('masp', 'noid');
        let temp = JSON.stringify(MASP.name).slice(1,7);      
        this.getbyID(temp);
        this.getbyHSX('SX0001');
      }
    render(){
        
        let articles = this.state.id.map(function (articleData, index) {
            return (
             
                <Content>
                <Image
                style={{width: null, height: 140, alignContent:"center" }}
                source={{uri: articleData.URL}}/>
               
                        <Card> 
                        <CardItem> 
                        <Text>
                        Mã sản phẩm : {articleData.MaCPU}
                        </Text> 
                        </CardItem> 
                        </Card>
                        <Card> 
                        <CardItem> 
                        <Text>
                        Tên sản phẩm : {articleData.Model}
                        </Text>
                         </CardItem> 
                         </Card>
                        <Card> 
                        <CardItem> 
                        <Text>
                        Socket : {articleData.Socket}
                        </Text> 
                        </CardItem> 
                        </Card>
                        <Card> 
                        <CardItem> 
                        <Text>
                        Số nhân: {articleData.SoNhan} -  Số luồng : {articleData.SoLuong}
                        </Text> 
                        </CardItem> 
                        </Card>
                        <Card> 
                        <CardItem> 
                        <Text>
                        Xung Nhịp : {articleData.XungNhip} GHz
                        </Text> 
                        </CardItem> 
                        </Card>
                        <Card>
                         <CardItem> 
                         <Text>
                        Đồ Hoạ : {articleData.Dohoa}
                        </Text> 
                        </CardItem> 
                        </Card>
                        <Card> 
                        <CardItem> 
                        <Text>
                        Cache : {articleData.Cache} MB
                        </Text> 
                        </CardItem> 
                        </Card>
                        <Card> 
                        <CardItem> 
                        <Text>
                        Giá bán : {articleData.Giaban} VND
                        </Text> 
                        </CardItem> 
                        </Card>
                        <Card> 
                        <CardItem> 
                        <Text>
                        Điện năng : {articleData.Diennang} W
                        </Text> 
                        </CardItem> 
                        </Card>
                 
                </Content>
            
            )
        });
        return(
            
            <Container style={{backgroundColor:'#ffffff'}}>
               

                {articles}
                
            </Container>
        )
    }
}
