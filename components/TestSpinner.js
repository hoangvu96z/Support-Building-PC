import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Spinner from 'react-native-spinkit';


export default class TestSpinner extends Component {
  

     
    render(){
    
   
        return(
            <View>
              <Spinner style={{}} color = {'red'} size= {50} type={'FadingCircle'}/> 
            </View>
       
           
        )
    }
}

