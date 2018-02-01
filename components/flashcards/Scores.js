import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

import { getScores } from '../../services';

import { COLOR_B_1 } from '../../utils/colors';

export default class Scores extends Component {

    async componentDidMount() {
        const scores = await getScores();
        // console.log(scores);
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.match}>
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>W</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>Deck 'A' @ 10/20/2017 19:22:40</Text>
                    </View>
                </View>
                <View style={styles.match}>
                    <View style={styles.resultContainerL}>
                        <Text style={styles.resultText}>L</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>Deck 'A' @ 10/20/2017 19:22:40</Text>
                    </View>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    match: {
        flex: 1,
        flexDirection: 'row',
        height: 64,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_B_1
    },
    resultContainer: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultContainerL: {
        flex: 1,
        backgroundColor: 'red',
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