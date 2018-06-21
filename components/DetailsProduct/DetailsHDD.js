import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { Container, Header, Content, Icon, Title, Right, Card, CardItem,Left, Body, Text, View, Button, ListItem } from 'native-base';
export default class DetailsHDD extends Component {
    static navigationOptions = {
        title: 'Chi tiết sản phẩm'
    }
    constructor() {
        super();
        this.state = {
            id: []
        };
      }
      async getbyID(name) {
        let array = [];
        try {
          let response = await fetch("http://doancn.azurewebsites.net/api/hdd/"+name);
          let responseJson = await response.json();
          array.push(responseJson)
          this.setState({ id: array });
        } catch (error) {
          console.error(error);
        }
      }
      componentDidMount() {
        const MASP =  this.props.navigation.getParam('masp', 'noid');
        let temp = JSON.stringify(MASP.name).slice(1,7);      
        this.getbyID(temp);
      }
    render(){
        let tem =this.state.id;
        let articles = this.state.id.map(function (articleData, index) {
            return (
           
                <Content>
                <Image
                style={{width: null, height: 140, alignContent:"center" }}
                source={{uri: articleData.URL}}/>
               
                        <Card> 
                        <CardItem> 
                        <Text>
                        Mã sản phẩm : {articleData.MaHDD}
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
                        Loại ổ cứng : {articleData.LoaiOCung}
                        </Text> 
                        </CardItem> 
                        </Card>
                        <Card> 
                        <CardItem> 
                        <Text>
                        Dung lượng : {articleData.DungLuong} MB
                        </Text> 
                        </CardItem>
                         </Card>
                        <Card>
                         <CardItem>
                          <Text>
                        Tốc độ đọc : {articleData.TocDoDoc} - Tốc độ ghi : {articleData.TocDoGhi}
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
