import React, { Component } from 'react';
import { FlatList,Picker,StyleSheet, Image, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, View, Button, Icon } from 'native-base';
import PCComponentList from './PCComponentList';
import ManualBuildPC from './ManualBuildPC';
import ManualBuild from './ManualBuild';
import ManualBuild2 from './ManualBuild2';
import DetailsCPU from './DetailsProduct/DetailsCPU'
import DetailsGPU from './DetailsProduct/DetailsGPU'
import DetailsHDD from './DetailsProduct/DetailsHDD'
import DetailsRAM from './DetailsProduct/DetailsRAM'
import DetailsCasePC from './DetailsProduct/DetailsCasePC'
import DetailsNguon from './DetailsProduct/DetailsNguon'
import DetailsMainboard from './DetailsProduct/DetailsMainboard'
import Nangcap from './Nangcap';
import Nangcap2 from './Nangcap2';
import RankingList from './RankingList';
import { createStackNavigator } from 'react-navigation'; 

class Mainmenu extends Component {
    static navigationOptions = {
        title: 'Hổ trợ xây dựng cấu hình PC'
    }
    render(){
        console.disableYellowBox = true;
        return(
          
            <ImageBackground source={require('./image/background.png')}
            style={{width: null, height: null, flex:1}}
            >
                <View style={{padding:5, flex: 1}}> 
                    <View style={{flex: 1, flexDirection: 'row', alignItems:"flex-start"}}>
                        <Image
                        style={{width: 64, height: 64, marginRight:5}}
                        source={require('./image/logo.png')}/>
                        <View>
                            <Text style={{fontSize:20, color:'#0000a0', fontWeight: 'bold'}}>  
                            ỨNG DỤNG HỔ TRỢ XÂY DỰNG  </Text>
                            <Text style={{fontSize:20, color:'#0000a0', fontWeight: 'bold'}}>  
                            CẤU HÌNH MÁY TÍNH </Text>
                        </View>
                    </View>
                    <Container style={{flex: 5, paddingLeft:5, paddingRight: 5}} >
                        <Content>
                            <Button large full success
                            onPress={() => this.props.navigation.navigate('Manual')}>
                                <Icon name='md-hand' />
                                <Text>TỰ XÂY DỰNG PC</Text>
                            </Button>
                            <Text style={{padding:3}}></Text>
                            <Button large full dark
                            onPress={() => this.props.navigation.navigate('Manual2')}>
                                <Icon name='md-construct' />
                                <Text>GỢI Ý XÂY DỰNG PC</Text>
                            </Button>
                            <Text style={{padding:3}}></Text>
                            <Button large full warning
                              onPress={() => this.props.navigation.navigate('PCComponentList')}>
                                <Icon name='md-list-box' />
                                <Text>DANH SÁCH PHẦN CỨNG</Text>
                            </Button>
                            <Text style={{padding:3}}></Text>
                            <Button large full primary
                              onPress={() => this.props.navigation.navigate('Nangcap')}>
                                <Icon name='md-done-all' />
                                <Text>KIỂM TRA TƯƠNG ĐỒNG</Text>
                            </Button>
                            <Text style={{padding:3}}></Text>
                            <Button large full info
                              onPress={() => this.props.navigation.navigate('Nangcap2')}>
                                <Icon name='md-trending-up' />
                                <Text>NÂNG CẤP PHẦN CỨNG</Text>
                            </Button>
                            <Text style={{padding:3}}></Text>
                            <Button large full danger
                              onPress={() => this.props.navigation.navigate('RankingList')}>
                               <Icon name='md-list' />
                                <Text>BẢNG XẾP HẠNG</Text>
                            </Button>
                           
                        </Content>
                    </Container>
                </View>
           </ImageBackground>
            
        )
    }
}


const RootStack = createStackNavigator(
    {
      Main: Mainmenu,
      Manual: ManualBuild,
      Manual2:ManualBuild2,
      PCComponentList : PCComponentList,
      DetailsRAM : DetailsRAM,
      DetailsCPU : DetailsCPU,
      DetailsHDD : DetailsHDD,
      DetailsGPU : DetailsGPU,
      DetailsCasePC : DetailsCasePC,
      DetailsNguon : DetailsNguon,
      DetailsMainboard : DetailsMainboard,
      Nangcap : Nangcap,
      Nangcap2 : Nangcap2,
      RankingList: RankingList
    },
    {
      initialRouteName: 'Main',
    }
  );

  export default class app extends Component {
    render() {
        return <RootStack />;
      }
}