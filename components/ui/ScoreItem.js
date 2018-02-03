import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLOR_B_1 } from '../../utils/colors';

export default class ScoreItem extends Component {

    render() {

        const { score } = this.props;
        const scoreColor = score.status === 'L' ? 'red' : (score.status === 'W') ? 'green' : 'gray';

        return (
            <View style={styles.match}>
                <View style={[styles.resultContainer, { backgroundColor: scoreColor }]}>
                    <Text style={styles.resultText}>{score.status}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Deck '{score.deck}' @ {new Date(score.date).toLocaleDateString()}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    match: {
        flex: 1,
        flexDirection: 'row',
        height: 64,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_B_1
    },
    resultContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    statusContainer: {
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 5
    },
    statusText: {
        fontSize: 17
    }
});