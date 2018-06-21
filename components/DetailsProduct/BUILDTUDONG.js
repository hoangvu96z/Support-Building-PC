import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import Spinner from 'react-native-spinkit';
import { View } from 'native-base';

export default class BUILDTUDONG extends Component {
    constructor() {
        super();
        this.state = {
            id: [],
            masp : '',
            size: 0,
            text: ''
        };
      }
      async getbyID(money, cauhinh) {
        let arr = [];
        try {
        this.setState({size: 100});
        this.setState({text: "BẠN CHỜ TÍ NHÉ ..."});
          let response = await fetch("http://doancn.azurewebsites.net/api/calculate/"+money+"/"+cauhinh);
          let responseJson = await response.json();
            let str =  JSON.stringify(responseJson);
            str = str.slice(2,str.length-1);
            arr = str.split(",");
            this.setState({ id: arr });
        this.setState({size: 0});
        this.setState({text: ''});
        } catch (error) {
          console.error(error);
        }
      }
      componentDidMount() {
       this.getbyID(15000000,"CH0001");
      
      }

     
    render(){

        let i = 1;
        let att = this.state.id.map (model => {
            let t = '';
            switch(i) {
                case 1:
                    t = `GPU: `;
                    break;
                case 2:
                    t = `CPU: `;
                    break;
                case 3:
                    t = `MAINBOARD: `;
                    break;
                case 4:
                    t = `RAM: `;
                    break;
                case 5:
                    t = `RAM 2: `;
                    break;
                case 6:
                    t = `HDD: `;
                    break;
                case 7:
                    t = `HDD 2: `;
                    break;
                case 8:
                    t = `NGUỒN: `;
                    break;
                case 9:
                    t = `CASE: `;
                    break;
                default:
                    t = '';
            }
            i++;
                if(i == 10)
                {
                    i=1;
                    model += "-------------";
                }
              
            return (
            
                <Text>{t} {model}</Text>
            )
        })
        return(
            <View style={{padding:2, alignItems:"center",flex:1}}> 
                 <Spinner style={{}} color = {'red'} size= {this.state.size} type={'Circle'}/> 
                 <Text style={{fontWeight:'bold', fontSize:18}}>{this.state.text} </Text>
                <ScrollView>
                    { att }
                </ScrollView>
            </View>
        
        )
    }
}

