import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';

import DifficultyMeter from '../ui/DifficultyMeter';

import * as actions from '../../actions';
import * as services from '../../services';

import { COLOR_B_4, COLOR_A_1, COLOR_B_5, COLOR_FAILURE } from '../../utils/colors';


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
    refresher() {
        this.setState({});
    }

    async deleteDeck() {
        const { deck } = this.props;

        Alert.alert(
            'Delete deck?',
            `Do you confirm the deletion of '${deck.name}' deck?`,
            [
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await services.deleteDeck(deck.name);
                            this.props.dispatch(actions.deleteDeck(deck.name));
                            this.props.navigation.goBack();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                },
                {
                    text: 'No',
                    onPress: () => { }
                }
            ]);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.deck === null) {
            return false;
        }

        return true;
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
                    <Text style={styles.description}>{deck.description}</Text>
                </View>
                <View style={styles.subContainerBtn}>
                    <View style={styles.subSubContainerBtn}>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('AddCard', { deckKey: deck.name, refresher: this.refresher.bind(this) })}>
                            <Text style={styles.btnText}>Add Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Cards', { deckKey: deck.name, refresher: this.refresher.bind(this) })}>
                            <Text style={styles.btnText}>List Cards</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subSubContainerBtn}>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Quiz', { deckKey: deck.name })}>
                            <Text style={styles.btnText}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subSubContainerBtn}>
                        <TouchableOpacity style={styles.btnAlert} onPress={this.deleteDeck.bind(this)}>
                            <Text style={styles.btnText}>Delete Deck</Text>
                        </TouchableOpacity>
                    </View>
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
        alignItems: 'flex-start'
    },
    subSubContainerBtn: {
        flex: 1,
        flexDirection: 'row',
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOR_B_4,
        borderRadius: 2,
        margin: 2
    },
    btnAlert: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOR_FAILURE,
        borderRadius: 2,
        margin: 2
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
    },
    description: {
        fontSize: 25,
        fontStyle: 'italic'
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