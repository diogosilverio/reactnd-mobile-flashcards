import React, { Component } from 'react';
import { Text, View } from 'react-native';


export default class DeckDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckKey } = navigation.state.params;

        return {
            title: `'${deckKey}' Details`,
        }
    }

    render() {

        return (
            <View>
                <Text>DeckDetails: {this.props.navigation.state.params.deckKey}</Text>
            </View>
        );
    }


}