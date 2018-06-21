import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TextInput,
  Picker,
  StyleSheet,
  Button,
  ScrollView
} from 'react-native';
import Spinner from 'react-native-spinkit';
import { Dropdown } from 'react-native-material-dropdown';
import { getData, getData2, convertObjectToArray } from './utils/getServerData'

export default class mobile_app_ui extends Component {
  static navigationOptions = {
    title: 'Gợi ý xây dựng PC'
}
  constructor(props) {
    super(props);
    this.state = {
      money: '',
      dataAllPM: [],
      dataAllFilter: [],
      selectedPM: '',
      listCorrectPC: [],
      electricItemValue: '',
      expectURL: '',
      Mang:[],
      size: 0,
      Mang2:[],
    }

    this.handleFilterType = this.handleFilterType.bind(this)
    this.handleSelectItem = this.handleSelectItem.bind(this)
    this.handleSelectButton = this.handleSelectButton.bind(this)
  }

  async getAllPM(address) {
    try {
      let response = await fetch(address);
      let responseJson = await response.json();
      // console.log(responseJson);
      // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
      this.setState({dataAllPM: responseJson});
    } catch (error) {
      console.log(error);
    }
  }

  handleFilterType(type) {
    var dataAllFilter = []

    if (type === "GAME") {
      this.state.dataAllPM.map(element => {
        if (element.LoaiPM === "GAME")
        dataAllFilter.push(element)
      })
    } else if (type === "PHANMEM") {
      this.state.dataAllPM.map(element => {
        if (element.LoaiPM === "PHANMEM")
        dataAllFilter.push(element)
      })
    }
  
    this.setState({ dataAllFilter, selectedPM: type });
  }

  handleSelectItem(electricItemValue) {
    this.setState({ electricItemValue })
  }

  async handleSelectButton() {
    this.setState({size:50})
    const baseURL = 'http://doancn.azurewebsites.net/api/calculate'
    const expectURL = `${baseURL}/${this.state.money}/${this.state.electricItemValue}`
    const listCorrectPC_Object = await getData2(expectURL)
    const listCorrectPC = convertObjectToArray(listCorrectPC_Object)
    // let arr = JSON.stringify(listCorrectPC_Object);
    // let listCorrectPC =  arr.slice(2,arr.length-1);
    // this.setState({Mang : listCorrectPC.split("|"), expectURL});

    this.setState({Mang : listCorrectPC, expectURL});
    this.setState({size:0});
  }

  componentWillMount() {
    // will mount => render => did mount => setState => will mount .... 
    // set state => reject component
    this.getAllPM('http://doancn.azurewebsites.net/api/phanmem/');
 
  }
  getAllDataModelPM() {
    let models = [];
    const dataAllPM = this.state.dataAllPM;
    let index = 0;

    while(index < dataAllPM.length) {
      models.push(dataAllPM[index]);
      index++;
    }

    return models;
  }

  render() {

    const modelsPM = this.getAllDataModelPM();
    // let arr = [];
  
    // this.setState({Mang2 : listCorrectPC.split("|")});

    let i = 1; let j = 1;
    let att = this.state.Mang.map (model => {
        let t = '';
        switch(i) {
            case 1:
                // t = "Cấu hình "+j+" \nGPU:" ;
                t=`GPU: `;
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
            case 10:
                t = `GIÁ BÁN: `;
                break;
            default:
                t = '';
        }
        i++;
            if(i == 11)
            {
                i=1;
                j++;
                model += "\n";
            }
          
        return (
          
            <Text>{t} {model}</Text>
        
        )
    })


    return (
      <ScrollView style={{backgroundColor: "#ffffff"}} >
        <View style={{ marginLeft : 10, marginRight: 10 }}>

        {/* <View style={style.Tieude}>
          <Text style={style.Tieude}>GỢI Ý XÂY DỰNG CẤU HÌNH</Text>
        </View> */}
        

        <Text style={{fontWeight:'bold'}} >Nhập số tiền có thể chi trả</Text>

        <TextInput
          style={{height: 40, width: null, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(money) => this.setState({money})}
          value={this.state.money}
        />

        <Text></Text>
        <Text></Text>
        <Text style={{fontWeight:'bold'}}>Nhu cầu :</Text>

        <View style={style.Picker1} >
              <Picker
                selectedValue={this.state.selectedPM}
                onValueChange={this.handleFilterType}
                value>
                <Picker.Item label="---Chọn---" value="" enabled={false} />
                <Picker.Item label="GAME" value="GAME" />
                <Picker.Item label="PHẦN MỀM" value="PHANMEM" />
              </Picker>
        </View>
        

        <Text style={{fontWeight:'bold'}}>Chi tiết</Text>  
        <View style= {style.Picker1}>
            <Picker
              selectedValue={this.state.electricItemValue}
              onValueChange={this.handleSelectItem}>
              {
                this.state.dataAllFilter.map(element => <Picker.Item key={element.CHToiThieu} label={element.TenPM} value={element.CHToiThieu} />)
              }
            </Picker>
        </View>  
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <Button
          onPress={this.handleSelectButton}
          title="HIỂN THỊ CÁC CẤU HÌNH"
          color="#841584"
          
        />
        <View style={{padding:2, alignItems: "center"}}>
        <Spinner style={{padding : 5}} color = {'blue'} size= {this.state.size} type={'Wave'}/>
        </View>
      
        <View style={style.Noidung}>
              {this.state.Mang.map(element => <Text>{"CẤU HÌNH:" +"\n"+"GPU: "+(element.split("|"))[0]+"\n"+
              "CPU:"+(element.split("|"))[1]+"\n"+
              "MAINBOARD: "+(element.split("|"))[2]+"\n"+
              "RAM 1: "+(element.split("|"))[3]+"\n"+
              "RAM 2: "+(element.split("|"))[4]+"\n"+
              "HDD 1: "+(element.split("|"))[5]+"\n"+
              "HDD 2: "+(element.split("|"))[6]+"\n"+
              "POWER: "+(element.split("|"))[7]+"\n"+
              "CASE: "+(element.split("|"))[8]+"\n"+
              "PRICE: "+(element.split("|"))[9]+" VNĐ"+"\n"
              
              }</Text>)}
              {/* {this.state.Mang.map(element => this.setState({Mang2: element.split("|")+"\n"}))} */}
              {/* <Text>{this.state.Mang2}</Text> */}
              {/* <Text>{this.state.Mang}</Text> */}
              {/* {att}   */}
              {/* <Text>{this.state.Mang2}</Text> */}

        </View>

        </View>
        </ScrollView>
      
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  Title: {
    fontSize: 24,
    fontFamily: "bold",
    color: "#ffffff",
    alignContent: "center",
    borderRadius: 3,
    borderWidth: 2,
    backgroundColor: "#0455ae",
    borderColor: "#0455ae"
  },
  Picker1: {
    alignContent: "center",
    width: null,
    height: 45,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 0
  },
  Catloge: {
    color: "#000000",
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 2,
    backgroundColor: "#6cb6ff"
  },
  Tieude: {
    alignContent: "center",
    alignItems: 'center',
    height: 50,
    fontSize: 18,
    color: '#000000',
    width: null,
    marginBottom: 5
  },
  Noidung: {
    width: null,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 0
  },


});
