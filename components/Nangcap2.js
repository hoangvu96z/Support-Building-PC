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
import { getData, convertObjectToArray, postData, Test } from './utils/getServerData'

export default class mobile_app_ui extends Component {
  static navigationOptions = {
    title: 'Nâng cấp PC'
}
  constructor(props) {
    super(props);
    this.state = {
        dataAllCpu:[],
        selectedCpu: 'CP0029',
        dataAllGpu:[],
        selectedGpu: 'GP0003',
        dataAllRam: [],
        selectedRam: 'RA0004',
        dataAllMainpc: [],
        selectedMain: 'MA0001',
        macpu:'',
        magpu:'',
        maram:'',
        kqkt:'',
        money:0,
        selectedLK:'',
        kqnangcap:'',

    }
    this.handleSelectButton = this.handleSelectButton.bind(this)
  }

  async getAllMainpcJson(address) {
    try {
      let response = await fetch(address);
      let responseJson = await response.json();
      // console.log(responseJson);
      // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
      this.setState({dataAllMainpc: responseJson});
    } catch (error) {
      console.log(error);
    }
  }

  async getAllRamJson(address) {
    try {
      let response = await fetch(address);
      let responseJson = await response.json();
      // console.log(responseJson);
      // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
      this.setState({dataAllRam: responseJson});
    } catch (error) {
      console.log(error);
    }
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
   
    const baseURL = 'http://doancn.azurewebsites.net/api'
    const listNangcap = await postData(this.state.money, this.state.selectedLK, this.state.selectedCpu, this.state.selectedGpu, this.state.selectedRam, this.state.selectedMain)
    // const listNangcap = Test();
    const expectURL = `${baseURL}/${this.state.selectedLK}/${listNangcap}`
    const listObject = await getData(expectURL)
    this.setState({kqnangcap : listObject, expectURL});
    this.setState({size:0});
  }



  componentWillMount() {
    // will mount => render => did mount => setState => will mount .... 
    // set state => reject component
    this.getAllRamJson('http://doancn.azurewebsites.net/api/ram');
    this.getAllCpuJson('http://doancn.azurewebsites.net/api/cpu');
    this.getAllGpuJson('http://doancn.azurewebsites.net/api/gpu');
    this.getAllMainpcJson('http://doancn.azurewebsites.net/api/mainboard');
 
  }

  getAllDataModelRam() {
    let models = [];
    const dataAllRam = this.state.dataAllRam;
    let index = 0;

    while(index < dataAllRam.length) {
      models.push(dataAllRam[index]);
      index++;
    }

    return models;
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
  getAllDataModelMainpc() {
    let models = [];
    const dataAllMainpc = this.state.dataAllMainpc;
    let index = 0;

    while(index < dataAllMainpc.length) {
      models.push(dataAllMainpc[index]);
      index++;
    }

    return models;
  }
  

  render() {
    const modelsRam = this.getAllDataModelRam();
    const modelsCpu = this.getAllDataModelCpu();
    const modelsGpu = this.getAllDataModelGpu();
    
        let articlesRam = this.state.dataAllRam.map(function (articleData, index) {

            return (
              
                <Picker.Item label={articleData.Model} value={articleData.MaRam} />
            )
        });
      

        let articlesCpu = this.state.dataAllCpu.map(function (articleData, index) {

        return (
          
            <Picker.Item label={articleData.Model} value={articleData.MaCPU} />
        )
      });
      let articlesGpu = this.state.dataAllGpu.map(function (articleData, index) {

        return (
          
            <Picker.Item label={articleData.Model} value={articleData.MaGPU} />
        )
      });
      let articlesMainpc = this.state.dataAllMainpc.map(function (articleData, index) {

        return (
          
            <Picker.Item label={articleData.Model} value={articleData.MaMain} />
        )
      });

  
    return (
        <ScrollView style={{backgroundColor: "#ffffff"}} >
        <Text style={{fontWeight:'bold'}}>Linh kiện cần nâng cấp :</Text>

        <View style={style.Picker1} >
        <Picker
            selectedValue={this.state.selectedLK}
            onValueChange={(itemValue, itemIndex) => this.setState({selectedLK: itemValue})}>
            <Picker.Item label="---Chọn---" value="" enabled={false} />
            <Picker.Item label="CPU" value="CPU" />
            <Picker.Item label="RAM" value="RAM" />
            <Picker.Item label="GPU" value="GPU" />
        </Picker>
        </View>

        <Text style={{fontWeight:'bold'}} >Nhập số tiền có thể chi trả:</Text>

        <TextInput
        style={{height: 40, width: null, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(money) => this.setState({money})}
        value={this.state.money}
        />

        <Text style={style.Catloge}>Chọn RAM:</Text>
        <Picker
          selectedValue={this.state.selectedRam}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedRam: itemValue})}>
          {
            articlesRam
          }
        </Picker>
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
        <Text style={style.Catloge}>Chọn MAINBOARD:</Text>
        <Picker
          selectedValue={this.state.selectedMain}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedMain: itemValue})}>
          {
            articlesMainpc
          }
        </Picker>

        <Button
          onPress={this.handleSelectButton
          }
          title="HIỂN THỊ CÁC CẤU HÌNH"
          color="#841584"
        />
        <Text style={{fontSize:16, fontWeight:'bold', color:"#000000", marginTop:10}}>Kết quả: {this.state.kqnangcap}</Text>

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
