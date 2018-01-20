import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { COLOR_B_4 } from '../../utils/colors';

export default class DeckList extends Component {

    static navigationOptions = {
        tabBarLabel: 'Decks'

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Decklist</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})