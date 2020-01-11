//INTRÂNCIAS INICIAIS
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-tg';
class Botao extends Component{

  constructor(props){
    super(props);
    this.state = {
      status: false,
      botao: '#84817a'
    };

    this.ligar = this.ligar.bind(this);
    
    this.styles = StyleSheet.create({
        btn: {
        marginTop: 20,
        height: 60,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#24DADD',
        justifyContent: 'center',
        },
        texto: {
          marginLeft: 20,
          marginRight: 20,
          fontSize: 50,
          fontWeight: '900',
          textAlign: 'center',
          color: 'white',
          textAlign: 'center',
        },
    });
  }

  ligar(){
  this.setState({status: !this.state.status});
}

componentDidUpdate(prevProps, prevState) {
  if(this.state.status !== prevState.status){
      if(this.state.status === true){
        this.setState({botao: '#6ab04c'})//On
      }else{
        this.setState({botao: '#84817a'})//Off
      }
  }

    
    if(this.props.nome == "TOMADA 01"){
      if(this.state.status == true){
      BluetoothSerial.write("1")
      }else{
        BluetoothSerial.write("a")
      }
    }

    if(this.props.nome == "TOMADA 02"){
      if(this.state.status == true){
        BluetoothSerial.write("2")
        }else{
          BluetoothSerial.write("b")
        }
    }

    if(this.props.nome == "TOMADA 03"){
      if(this.state.status == true){
        BluetoothSerial.write("3")
        }else{
          BluetoothSerial.write("c")
        }
    }
  
      if(this.props.nome == "TOMADA 04"){
        if(this.state.status == true){
          BluetoothSerial.write("4")
          }else{
            BluetoothSerial.write("d")
          }
    }

    if(this.props.nome == "RESET"){
      BluetoothSerial.write("r")
  }
}
  
  render(){
    return(
        <TouchableOpacity style={ [this.styles.btn, {backgroundColor: this.state.botao} ] }
                          onPress={this.ligar}>
          <Text style = {this.styles.texto}>{this.props.nome}</Text>
        </TouchableOpacity>
    );
  }
}

class BtnBlue extends Component{
  constructor(props){
    super(props);
    this.state = {
      cpress: false,
      conectado: false,
      nome: 'CONECTAR',
      colorz: 'white',
    };

    this.estilos= StyleSheet.create({
      btn: {
      marginRight: 5,
      display: 'flex',
      height: 25,
      //width: 115,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      },
      texto: {
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center',
        color: '#45aaf2',
      },
      cop: {
        marginLeft: 3,
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center',
        color: 'white',
        textAlign: 'center',
      },
      z: {
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center',
        color: this.state.colorz,
        textAlign: 'center',
      },
      view: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#000',
      },
      consoleAdmin: {
        textAlign: 'center',
        fontSize: 9,
        color: '#02FF02',
        height: 30,
        width: 190,
        borderWidth: 0.3,
        borderColor: 'white',
      },
      imagem: {
        marginTop: 2,
        width: 16,
        height: 16,
      },
  });
  }
  apertar(){
    if(this.state.conectado == false){
      this.conectar();
      this.state.conectado = !this.state.conectado
      
    }else{
      this.desconectar();
      this.state.conectado = !this.state.conectado

    }
  }
  conectar(){
    BluetoothSerial.connect('98:D3:31:FC:2C:44').then((res) => {
      this.setState({nome: 'DESCONECTAR'})
      BluetoothSerial.write("x") //Envia comando para informar que a conexão foi realizada
    })
  }
  desconectar(){
    BluetoothSerial.write("y") //Envia comando para informar que a conexão foi desfeita
    BluetoothSerial.disconnect().then((res) => {
    this.setState({nome: 'CONECTAR'})
    })
  }
  
  easteregg(){
    if(this.state.cpress == false){
    BluetoothSerial.write("z")
    console.log('enviar estereg')
    this.setState({colorz: '#6ab04c'})
    }else{
    BluetoothSerial.write("9")
    this.setState({colorz: '#6ab04c'})
    console.log('pause')
    }
    this.state.cpress = !this.state.cpress
  }

  render(){
    return(
      <View style = {this.estilos.view}>
      <TouchableOpacity style = {this.estilos.btn} onPress = {() => this.apertar()}>
        <Text style = {this.estilos.texto}>{this.state.nome}</Text>
      </TouchableOpacity>
      <Image source={require('./images/cop.jpeg')} style={this.estilos.imagem}/>
      <Text style = {this.estilos.cop}>WareTech - By Gustavo Malte</Text>
      <TouchableOpacity onPress={()=> this.easteregg()}>  
      <Text style = {this.estilos.z}>z</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={require('./images/geometry-background.png')} style={styles.bg}>
      <View style = {styles.topbar}>
        <Image source={require('./images/logo.png')} style={styles.imgLogo}/>
        <Text style = {styles.appTitle}>WareTechApp</Text>
        <Image source={require('./images/logo.png')} style={styles.imgLogo}/>
      </View>
      
      
      <Botao nome = 'TOMADA 01'/>
      <Botao nome = 'TOMADA 02'/>
      <Botao nome = 'TOMADA 03'/>
      <Botao nome = 'TOMADA 04'/>
      <Image source={require('./images/casa.png')} style={styles.imgCasa}/>
      

      <View style = {styles.containerFooter}>
      <BtnBlue/>
      </View>
      </ImageBackground>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#718093',
  },
  bg: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  containerFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    backgroundColor: 'transparent',
  },
  imgLogo: {
    marginTop: 10,
    justifyContent: 'flex-end',
    width: 40,
    height: 40,
  },
  imgCasa: {
    marginTop: 70,
    justifyContent: 'flex-end',
    width: 300,
    height: 230,
  },
  topbar: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
    width: '100%',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    margin: 10,
    color: 'white',
    textAlign: 'center',
  },
});
