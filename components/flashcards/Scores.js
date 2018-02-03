import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import ScoreItem from '../ui/ScoreItem';

import { getScores } from '../../services';
import { loadScores } from '../../actions/score';

import { COLOR_B_1 } from '../../utils/colors';
import Entypo from '@expo/vector-icons/Entypo';

class Scores extends Component {

    async componentDidMount() {
        const scores = await getScores();
        this.props.dispatch(loadScores(scores));
    }

    render() {

        const { scores } = this.props;

        if (this.props.scores === null) {
            return (
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={50} />
                </View>
            );
        } else if (scores.length === 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Entypo size={75} name="emoji-sad" />
                    <Text>You have no scores.</Text>
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    {scores.map(score => (<ScoreItem key={score.date} score={score} />))}
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

function mapStateToProps({ scores }) {
    return {
        scores
    }
}

export default connect(mapStateToProps)(Scores);