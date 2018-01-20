import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

import { COLOR_B_7 } from '../../utils/colors';


export default class FlashStatusBar extends Component {

    render() {
        return (
            <View style={{ backgroundColor: COLOR_B_7, height: Constants.statusBarHeight }}>
                <StatusBar translucent backgroundColor='green' barStyle='light-content' />
            </View>
        )
    }

}