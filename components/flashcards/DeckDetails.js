import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';

import DifficultyMeter from '../ui/DifficultyMeter';

import { COLOR_B_4, COLOR_A_1, COLOR_B_5 } from '../../utils/colors';


class DeckDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckKey } = navigation.state.params;

        return {
            title: `'${deckKey}' Details`,
        }
    }

    /**
     * Child navigate.goBack() does not re-render state.
     * https://github.com/react-navigation/react-navigation/issues/922
     */
    refresher(){
        this.setState({});
    }

    render() {
        const { deck } = this.props;
        if (typeof deck === 'undefined') {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size={50} />
                </View>
            );
        } else if (this.deck === null) {
            Alert.alert(
                'Invalid deck',
                'The requested deck does not exists.',
                [{ text: 'Ok', onPress: () => { } }],
                { cancelable: false });
            this.props.navigation.goBack();
        }

        return (
            <View style={styles.container}>
                <View style={styles.subContainerCard}>
                    <View><DifficultyMeter level={deck.difficulty} size={30} /></View>
                    <Text style={styles.titleText}>{deck.name}</Text>
                    <Text style={styles.cardText}>{deck.cards.length} Card(s)</Text>
                </View>
                <View style={styles.subContainerBtn}>
                    <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('AddCard', { deckKey: deck.name, refresher: this.refresher.bind(this) })}>
                        <Text style={styles.btnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subContainerCard: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    subContainerBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'center'
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOR_B_4,
        borderRadius: 2,
        padding: 4,
        margin: 10,
        height: 64
    },
    btnText: {
        flex: 1,
        fontSize: 20,
        alignSelf: 'center',
        color: COLOR_A_1,
        textAlign: 'center'
    },
    titleText: {
        fontSize: 40
    },
    cardText: {
        fontSize: 20
    }
});

function mapStateToProps({ decks }, props) {
    const { deckKey } = props.navigation.state.params;
    let deck = decks[deckKey];

    if (typeof deck === 'undefined') {
        deck = null;
    }

    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckDetails);