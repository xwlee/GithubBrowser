'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  TabBarIOS,
  StyleSheet
} from 'react-native';
import Feed from './Feed';

type Props = {};
export default class AppContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed'
    };
  }
  render() {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab == 'feed'}
          icon={{uri: 'inbox'}}
          onPress={() => this.setState({selectedTab: 'feed'})}
        >
          <Feed />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab == 'search'}
          icon={{uri: 'search'}}
          onPress={() => this.setState({selectedTab: 'search'})}
        >
          <Text style={styles.welcome}>Tab 2</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});
