'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import AuthService from './AuthService';

type Props = {};
export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    }
  }
  render() {
    var errorCtrl = <View />;

    if (!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>That username and password combination did not work</Text>;
    }

    if (!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>That username and password combination did not work</Text>;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={{uri: 'Octocat'}} />
        <Text style={styles.heading}>Github Browser</Text>
        <TextInput
          autoCapitalize='none'
          onChangeText={(text) => this.setState({username: text})}
          style={styles.input}
          placeholder="Github username" />
        <TextInput style={styles.input}
          autoCapitalize='none'
          onChangeText={(text) => this.setState({password: text})}
          placeholder="Github password"
          secureTextEntry={true} />
        <TouchableHighlight
          onPress={this.onLoginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator
          animating={this.state.showProgress}
          size="large"
          style={styles.loader} />
      </View>
    );
  }

  onLoginPressed() {
    console.log('Attemping to log in with username ' + this.state.username);
    this.setState({showProgress: true});

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if (results.success && this.props.onLogin) {
        this.props.onLogin();
      }
    }, AsyncStorage);
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 55,
    height: 66
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    alignSelf: 'stretch'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});
