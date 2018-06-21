import React, { Component } from "react";
import { Text, StyleSheet, View, Picker, Button,ImageBackground } from "react-native";
class ManualBuildPC extends Component {
  constructor() {
    super();
    this.state = {
      cpu: [],
      casepc: [],
      main: [],
      ram: [],
      hdd: [],
      nguon: [],
      gpu: [],
      price:[]
    };
  }

  async getGPU() {
    try {
      let response = await fetch("http://doancn.azurewebsites.net/api/gpu");
      let responseJson = await response.json();
      this.setState({ gpu: responseJson });
    } catch (error) {
      console.error(error);
    }
  }
  async getNguon() {
    try {
      let response = await fetch("http://doancn.azurewebsites.net/api/nguon");
      let responseJson = await response.json();
      this.setState({ nguon: responseJson });
    } catch (error) {
      console.error(error);
    }
  }
  async getMain() {
    try {
      let response = await fetch(
        "http://doancn.azurewebsites.net/api/mainboard"
      );
      let responseJson = await response.json();
      this.setState({ main: responseJson });
    } catch (error) {
      console.error(error);
    }
  }
  async getHDD() {
    try {
      let response = await fetch("http://doancn.azurewebsites.net/api/hdd");
      let responseJson = await response.json();
      this.setState({ hdd: responseJson });
    } catch (error) {
      console.error(error);
    }
  }
  async getRAM() {
    try {
      let response = await fetch("http://doancn.azurewebsites.net/api/ram");
      let responseJson = await response.json();
      this.setState({ ram: responseJson });
    } catch (error) {
      console.error(error);
    }
  }
  async getCPU() {
    try {
      let response = await fetch("http://doancn.azurewebsites.net/api/cpu");
      let responseJson = await response.json();
      this.setState({ cpu: responseJson });
    } catch (error) {
      console.error(error);
    }
  }
  async getCasePC() {
    try {
      let response = await fetch("http://doancn.azurewebsites.net/api/casepc");
      let responseJson = await response.json();
      this.setState({ casepc: responseJson });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.getCPU();
    this.getCasePC();
    this.getRAM();
    this.getHDD();
    this.getMain();
    this.getNguon();
    this.getGPU();
  }

  clicktotal(){
    let data = this.state.data;
    alert(data);
  }

  render() {
    let articlesGPU = this.state.gpu.map(function (articleData, index) {
      let temp = `${ articleData.Model } - ${ articleData.Giaban }VND`;
      return (
        
          <Picker.Item label={temp} value={articleData.MaGPU} price={articleData.Giaban} />
      )
  });

    let articlesCPU = this.state.cpu.map(function (articleData, index) {
      let temp = `${ articleData.Model } - ${ articleData.Giaban }VND`;
      return (
      
          <Picker.Item label={temp} value={articleData.MaGPU} price={articleData.Giaban} />
      )
  });

    let articlesRAM = this.state.ram.map(function (articleData, index) {
      let temp = `${ articleData.Model } - ${ articleData.Giaban }VND`;
      return (
      
          <Picker.Item label={temp} value={articleData.MaGPU} price={articleData.Giaban} />
      )
  });

    let articlesHDD = this.state.hdd.map(function (articleData, index) {
      let temp = `${ articleData.Model } - ${ articleData.Giaban }VND`;
      return (
      
          <Picker.Item label={temp} value={articleData.MaGPU} price={articleData.Giaban} />
      )
  });

    let articlesMain = this.state.main.map(function (articleData, index) {
      let temp = `${ articleData.Model } - ${ articleData.Giaban }VND`;
      return (
      
          <Picker.Item label={temp} value={articleData.MaGPU} price={articleData.Giaban} />
      )
  });

  let articlesCasePC = this.state.casepc.map(function (articleData, index) {
    let temp = `${ articleData.Model } - ${ articleData.Giaban }VND`;
    return (
    
        <Picker.Item label={temp} value={articleData.MaGPU} price={articleData.Giaban} />
    )
});

  let articlesNguon = this.state.nguon.map(function (articleData, index) {
    let temp = `${ articleData.Model } - ${ articleData.Giaban }VND`;
    return (
    
        <Picker.Item label={temp} value={articleData.MaGPU} price={articleData.Giaban} />
    )
  });

    return (
      <ImageBackground source={require('./image/background.png')}
            style={{width: null, height: null, flex:1}}
            >
      <View style={{ padding: 5 }}>
        <Text style={style.Title}> MANUAL BUILDING PC </Text>

        <Text style={style.Catloge}>CPU</Text>
        <Picker
        style={ style.Picker1 }
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              {articlesCPU}
        </Picker>

        <Text style={style.Catloge}>Card màn hình</Text>
       
        <Picker
        style={ style.Picker1 }
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              {articlesGPU}
        </Picker>

        <Text style={style.Catloge}>RAM</Text>
        <Picker
        style={ style.Picker1 }
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              {articlesRAM}
        </Picker>

        <Text style={style.Catloge}>Mainboard</Text>
        <Picker
        style={ style.Picker1 }
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              {articlesMain}
        </Picker>

        <Text style={style.Catloge}>Case PC</Text>
        <Picker
        style={ style.Picker1 }
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              {articlesCasePC}
        </Picker>

        <Text style={style.Catloge}>Ổ cứng</Text>
        <Picker
        style={ style.Picker1 }
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              {articlesHDD}
        </Picker>

        <Text style={style.Catloge}>Nguồn PC</Text>
        <Picker
        style={ style.Picker1 }
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              {articlesNguon}
        </Picker>

        <Button marginTop="10" title="BẤM ĐỂ TÍNH TIỀN" color="#409114" onPress={this.clicktotal}/>
        <Text>{this.state.user}</Text>
      </View>
      </ImageBackground>
    );
  }
}
const style = StyleSheet.create({
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
module.exports = ManualBuildPC;
