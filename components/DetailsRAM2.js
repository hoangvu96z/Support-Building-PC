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


export default class mobile_app_ui extends Component {
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
    const baseURL = 'http://doancn.azurewebsites.net/api/calculate'
    const expectURL = `${baseURL}/${this.state.money}/${this.state.electricItemValue}`
    const listCorrectPC_Object = await getData(expectURL)
    const listCorrectPC = convertObjectToArray(listCorrectPC_Object)
 
    this.setState({Mang : listCorrectPC.split(","), expectURL});
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

    // const modelsPM = this.getAllDataModelPM();

    return (
        <View>
        <Text>Nhập số tiền có thể chi trả</Text>

        <TextInput
          style={{height: 40, width: 120, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(money) => this.setState({money})}
          value={this.state.money}
        />

        <Picker
          selectedValue={this.state.selectedPM}
          style={{ height: 50, width: 100 }}
          onValueChange={this.handleFilterType}
          value>
          <Picker.Item label="---Chọn---" value="" enabled={false} />
          <Picker.Item label="GAME" value="GAME" />
          <Picker.Item label="PHẦN MỀM" value="PHANMEM" />
        </Picker>


        <Picker
          selectedValue={this.state.electricItemValue}
          style={ style.Picker1 }
          onValueChange={this.handleSelectItem}>
          {
            this.state.dataAllFilter.map(element => <Picker.Item key={element.CHToiThieu} label={element.TenPM} value={element.CHToiThieu} />)
          }
        </Picker>

        <Button
          onPress={this.handleSelectButton}
          title="Show cau hinh"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
          
        <ScrollView>
          {/* {this.state.listCorrectPC.map(element => <Text>{element}</Text>)} */}
          <Text>{this.state.Mang}</Text>
        </ScrollView>


        </View>
      
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
    height: 30,
    width: null,
    borderColor: "#00ff00",
    marginBottom: 5
  },
  Catloge: {
    color: "#000000",
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 2,
    backgroundColor: "#6cb6ff"
  }
});
