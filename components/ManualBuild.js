import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput, 
  Button,
  Picker,

} from 'react-native';

export default class Temp extends Component {
  static navigationOptions = {
    title: 'Tự xây dựng cấu hình PC'
}
  constructor(props) {
    super(props);
    this.state = {
      dataAllRam: [],
      dataByID: '',
      text: '',
      selectedModelRam: 0,
      dataAllCpu:[],
      selectedModelCpu: 0,
      dataAllGpu:[],
      selectedModelGpu: 0,
      dataAllHdd:[],
      selectedModelHdd: 0,
      dataAllPower:[],
      selectedModelPower: 0,
      dataAllCasepc:[],
      selectedModelCasepc: 0,
      dataAllMainpc:[],
      selectedModelMainpc: 0,
      Tongtien:'',
    }

    this.getRamJson = this.getRamJson.bind(this);
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
  async getRamJson(address) {
    try {
      let response = await fetch(address);
      let responseJson = await response.json();
      // console.log(responseJson);
      // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
      this.setState({dataByID: responseJson});
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

  async getAllHddJson(address) {
    try {
      let response = await fetch(address);
      let responseJson = await response.json();
      // console.log(responseJson);
      // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
      this.setState({dataAllHdd: responseJson});
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCasepcJson(address) {
    try {
      let response = await fetch(address);
      let responseJson = await response.json();
      // console.log(responseJson);
      // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
      this.setState({dataAllCasepc: responseJson});
    } catch (error) {
      console.log(error);
    }
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

  async getAllPowerJson(address) {
    try {
      let response = await fetch(address);
      let responseJson = await response.json();
      // console.log(responseJson);
      // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
      this.setState({dataAllPower: responseJson});
    } catch (error) {
      console.log(error);
    }
  }

  componentWillMount() {
    // will mount => render => did mount => setState => will mount .... 
    // set state => reject component
    if (this.state.dataAllRam!=null)
    {
      this.getAllRamJson('http://doancn.azurewebsites.net/api/ram');
      this.getAllCpuJson('http://doancn.azurewebsites.net/api/cpu');
      this.getAllGpuJson('http://doancn.azurewebsites.net/api/gpu');
      this.getAllHddJson('http://doancn.azurewebsites.net/api/hdd');
      this.getAllCasepcJson('http://doancn.azurewebsites.net/api/casepc');
      this.getAllMainpcJson('http://doancn.azurewebsites.net/api/mainboard');
      this.getAllPowerJson('http://doancn.azurewebsites.net/api/nguon');
    }
      
  }


  renderTextJson() {
    if (this.state.data)
      return <Text>{this.state.data[0].MaRam} </Text>
    return null;
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

  getAllDataModelHdd() {
    let models = [];
    const dataAllHdd = this.state.dataAllHdd;
    let index = 0;

    while(index < dataAllHdd.length) {
      models.push(dataAllHdd[index]);
      index++;
    }

    return models;
  }

  getAllDataModelCasepc() {
    let models = [];
    const dataAllCasepc = this.state.dataAllCasepc;
    let index = 0;

    while(index < dataAllCasepc.length) {
      models.push(dataAllCasepc[index]);
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

  getAllDataModelPower() {
    let models = [];
    const dataAllPower = this.state.dataAllPower;
    let index = 0;

    while(index < dataAllPower.length) {
      models.push(dataAllPower[index]);
      index++;
    }

    return models;
  }
  // Sum() {
  //   let sum = 0;
  //   let s1 = this.state.selectedModelRam;
  //   let s3= this.state.selectedModelCpu;
  //   sum = s1 + s3;
  //   alert(sum);
  //   return sum;
  // }


  render() {
    const modelsRam = this.getAllDataModelRam();
    const modelsCpu = this.getAllDataModelCpu();
    const modelsGpu = this.getAllDataModelGpu();
    const modelsHdd = this.getAllDataModelHdd();
    const modelsCasepc = this.getAllDataModelCasepc();
    const modelsMainpc = this.getAllDataModelMainpc();
    const modelsPower = this.getAllDataModelPower();
    // let Tong = this.Sum();

    let articlesCpu = this.state.dataAllCpu.map(function (articleData, index) {
      // let temp = `${ articleData.Model }`;
      return (
        
          <Picker.Item label={articleData.Model} value={articleData.Giaban} />
      )
    });

    let articlesRam = this.state.dataAllRam.map(function (articleData, index) {
      // let temp = `${ articleData.Model }`;
      return (
        
          <Picker.Item label={articleData.Model} value={articleData.Giaban} />
      )
    });

    let articlesGpu = this.state.dataAllGpu.map(function (articleData, index) {
      // let temp = `${ articleData.Model }`;
      return (
        
          <Picker.Item label={articleData.Model} value={articleData.Giaban} />
      )
    });

    let articlesHdd = this.state.dataAllHdd.map(function (articleData, index) {
      // let temp = `${ articleData.Model }`;
      return (
        
          <Picker.Item label={articleData.Model} value={articleData.Giaban} />
      )
    });

    let articlesCasepc = this.state.dataAllCasepc.map(function (articleData, index) {
      // let temp = `${ articleData.Model }`;
      return (
        
          <Picker.Item label={articleData.Model} value={articleData.Giaban} />
      )
    });

    let articlesMainpc = this.state.dataAllMainpc.map(function (articleData, index) {
      // let temp = `${ articleData.Model }`;
      return (
        
          <Picker.Item label={articleData.Model} value={articleData.Giaban} />
      )
    });

    let articlesPower = this.state.dataAllPower.map(function (articleData, index) {
      // let temp = `${ articleData.Model }`;
      return (
        
          <Picker.Item label={articleData.Model} value={articleData.Giaban} />
      )
    });

    return (
      <View style={{backgroundColor:"#ffffff"}}>
         <Text style={style.Catloge}>Chọn RAM :</Text>
        <Picker
          selectedValue={this.state.selectedModelRam}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedModelRam: itemValue})}>
          {
            articlesRam
          }
        </Picker>
        <Text style={style.Catloge}>Chọn CPU:</Text>
        <Picker
          selectedValue={this.state.selectedModelCpu}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedModelCpu: itemValue})}>
          {
            articlesCpu
          }
        </Picker>
        <Text style={style.Catloge}>Chọn GPU:</Text>
        <Picker
          selectedValue={this.state.selectedModelGpu}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedModelGpu: itemValue})}>
          {
            articlesGpu
          }
        </Picker>
        <Text style={style.Catloge}>Chọn ổ cứng:</Text>
        <Picker
          selectedValue={this.state.selectedModelHdd}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedModelHdd: itemValue})}>
          {
            articlesHdd
          }
        </Picker>
        <Text style={style.Catloge}>Chọn Case:</Text>
        <Picker
          selectedValue={this.state.selectedModelCasepc}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedModelCasepc: itemValue})}>
          {
            articlesCasepc
          }
        </Picker>
        <Text style={style.Catloge}>Chọn Mainboard:</Text>
        <Picker
          selectedValue={this.state.selectedModelMainpc}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedModelMainpc: itemValue})}>
          {
            articlesMainpc
          }
        </Picker>
        <Text style={style.Catloge}>Chọn Nguồn:</Text>
        <Picker
          selectedValue={this.state.selectedModelPower}
          style={ style.Picker1 }
          onValueChange={(itemValue, itemIndex) => this.setState({selectedModelPower: itemValue})}>
          {
            articlesPower
          }
        </Picker>

        <Button
          style={{marginTop:10}}
              onPress={()=> {
                let sum = 0;
                let s1 = this.state.selectedModelRam;
                let s2= this.state.selectedModelCpu;
                let s3 = this.state.selectedModelHdd;
                let s4= this.state.selectedModelPower;
                let s5 = this.state.selectedModelCasepc;
                let s6= this.state.selectedModelMainpc;
                let s7 = this.state.selectedModelGpu;
                sum = s1 + s2+s3+s4+s5+s6+s7;
                this.setState({Tongtien : 'TỔNG TIỀN = '+sum+' VND'});
              }}
              title="Tính tiền"
              color="#841584"
              accessibilityLabel="C"
        />
        <Text style={{color:'#ff0000', fontSize:20, fontWeight:'bold'}}>{this.state.Tongtien}</Text>
      </View>
    )
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
      paddingBottom: 2,
      backgroundColor: "#6cb6ff"
    }
  });
  