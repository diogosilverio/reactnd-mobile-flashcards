import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import FlashStatusBar from './components/ui/FlashStatusBar';
import FlashStackNavigator from './components/navigators/FlashStackNavigator';


export default class App extends Component {

  render() {

    const store = createStore(() => { });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FlashStatusBar />
          <FlashStackNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})