import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DifficultyMeter from './DifficultyMeter';

import { COLOR_B_1, COLOR_SUCCESS, COLOR_FAILURE } from '../../utils/colors';

export default class DeckItem extends Component {

    render() {

        const { deck } = this.props;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.diffContainer}>
                    <DifficultyMeter size={40} level={deck.difficulty} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{deck.name}</Text>
                    <Text style={styles.description}>{deck.description}</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.won}>{deck.won}</Text>
                        <Text style={styles.lost}>{deck.lost}</Text>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_B_1
    },
    diffContainer: {
        flex: 1,
    },
    infoContainer: {
        flex: 3,
        padding: 5,
    },
    scoreContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 15,
        fontStyle: 'italic',
        flexWrap: 'wrap'
    },
    won: {
        flex: 2,
        fontSize: 25,
        color: '#fff',
        backgroundColor: COLOR_SUCCESS,
        textAlign: 'center'
    },
    lost: {
        flex: 2,
        fontSize: 25,
        color: '#fff',
        backgroundColor: COLOR_FAILURE,
        textAlign: 'center'
    }
});