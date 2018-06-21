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
import { getData2, convertObjectToArray } from './utils/getServerData'

export default class mobile_app_ui extends Component {
  static navigationOptions = {
    title: 'Kiểm tra tương đồng'
}
  constructor(props) {
    super(props);
    this.state = {
        dataAllCpu:[],
        selectedCpu: '',
        dataAllGpu:[],
        selectedGpu: '',
        kqkt:'',

    }
    this.handleSelectButton = this.handleSelectButton.bind(this)
  }
  async getAllCpuJson(address) {
    try {
      let response = await fetch(address);
      let responseJson = await response.json();
      // console.log(responseJson);
      // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
      this.setState({dataAllCpu: responseJson});
    } catch (error) {
      console.log(error);
    }
  }

  async getAllGpuJson(address) {
    try {
      let response = await fetch(address);
      let responseJson = await response.json();
      // console.log(responseJson);
      // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
      this.setState({dataAllGpu: responseJson});
    } catch (error) {
      console.log(error);
    }
  }

  async handleSelectButton() {
    this.setState({size:50})
    const baseURL = 'http://doancn.azurewebsites.net/api/calculate/check/'
    const expectURL = `${baseURL}/${this.state.selectedCpu}/${this.state.selectedGpu}`
    const kq = await getData2(expectURL)
    // let kq2 = JSON.stringify(kq);
    // const kq2 = convertObjectToArray(listCorrectPC_Object)
    if (kq == true)
    {
        this.setState({kqkt : 'TƯƠNG ĐỒNG', expectURL});
    }
    else
    {
        this.setState({kqkt : 'KHÔNG TƯƠNG ĐỒNG', expectURL});
    }
    
    this.setState({size:0});
  }
  componentWillMount() {
    // will mount => render => did mount => setState => will mount .... 
    // set state => reject component
    this.getAllCpuJson('http://doancn.azurewebsites.net/api/cpu');
    this.getAllGpuJson('http://doancn.azurewebsites.net/api/gpu');
 
  }

  getAllDataModelCpu() {
    let models = [];
    const dataAllCpu = this.state.dataAllCpu;
    let index = 0;

    while(index < dataAllCpu.length) {
      models.push(dataAllCpu[index]);
      index++;
    }

    return models;
  }

  getAllDataModelGpu() {
    let models = [];
    const dataAllGpu = this.state.dataAllGpu;
    let index = 0;

    while(index < dataAllGpu.length) {
      models.push(dataAllGpu[index]);
      index++;
    }

    return models;
  }

  render() {
    const modelsCpu = this.getAllDataModelCpu();
    const modelsGpu = this.getAllDataModelGpu();

    let articlesCpu = this.state.dataAllCpu.map(function (articleData, index) {
        // let temp = `${ articleData.Model }`;
        return (
          
            <Picker.Item label={articleData.Model} value={articleData.MaCPU} />
        )
      });
      let articlesGpu = this.state.dataAllGpu.map(function (articleData, index) {
        // let temp = `${ articleData.Model }`;
        return (
          
            <Picker.Item label={articleData.Model} value={articleData.MaGPU} />
        )
      });


    return (
        <ScrollView style={{backgroundColor: "#ffffff"}} >
        <Text style={style.Catloge}>Chọn CPU:</Text>
        <Picker
          selectedValue={this.state.selectedCpu}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedCpu: itemValue})}>
          {
            articlesCpu
          }
        </Picker>
        <Text style={style.Catloge}>Chọn GPU:</Text>
        <Picker
          selectedValue={this.state.selectedGpu}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedGpu: itemValue})}>
          {
            articlesGpu
          }
        </Picker>

        <Button
          style={{marginTop:10}}
          onPress={this.handleSelectButton}
          title="KIỂM TRA"
          color="#841584"
        />
        
        <View style={{alignItems:'center'}}> 
            <Text style={{fontSize:24, color:"#000000"}}>{this.state.kqkt}</Text>
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
