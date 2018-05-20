'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Image,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import AuthService from './AuthService';
import moment from 'moment';

type Props = {};
export default class Feed extends Component<Props> {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true
    };

  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    AuthService.getAuthInfo((err, authInfo) => {
      var url = 'https://api.github.com/users/'
        + authInfo.user.login
        + '/received_events';

      fetch(url, {
        headers: authInfo.header
      })
      .then((response) => response.json())
      .then((responseData) => {
        var feedItems = responseData.filter((ev) => ev.type == 'PushEvent');
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        });
      });
    }, AsyncStorage);
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
      }}>
        <Image
          source={{uri: rowData.actor.avatar_url}}
          style={{
            height: 36,
            width: 36,
            borderRadius: 18
          }} />

        <View style={{
          paddingLeft: 20
        }}>
          <Text style={{backgroundColor: '#fff'}}>
            {moment(rowData.created_at).fromNow()}
          </Text>
          <Text style={{backgroundColor: '#fff'}}>
            <Text style={{
              fontWeight: '600'
            }}>{rowData.actor.login}</Text> pushed to
          </Text>
          <Text style={{backgroundColor: '#fff'}}>
            {rowData.payload.ref.replace('refs/heads/', '')}
          </Text>
          <Text style={{backgroundColor: '#fff'}}>
            at <Text style={{
              fontWeight: '600'
            }}>{rowData.repo.name}</Text>
          </Text>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <ActivityIndicator
            size="large"
            animating={true} />
        </View>
      )
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true} />
      </View>
    );
  }
}