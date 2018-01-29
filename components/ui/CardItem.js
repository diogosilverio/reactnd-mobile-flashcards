import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { connect } from 'react-redux';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { deleteCardFromDeck } from '../../services';
import { deleteCard } from '../../actions/deck';
import { COLOR_B_1, COLOR_WHITE, COLOR_FAILURE } from '../../utils/colors';

class CardItem extends Component {

    async deleteCard(cardName) {
        const { deck, refresher } = this.props;

        Alert.alert(
            'Delete card?',
            `Do you confirm the deletion of the card '${cardName}'?`,
            [
                {
                    text: 'Yes', onPress: async () => {
                        try {
                            await deleteCardFromDeck(deck, cardName);
                            this.props.dispatch(deleteCard(deck, cardName));
                            refresher();
                        } catch (e) {
                            Alert.alert(
                                'Error',
                                'Error deleting card.',
                                [
                                    { text: 'Ok', onPress: () => { } }
                                ]);
                            console.error(e);
                        }
                    }
                },
                { text: 'No', onPress: () => { } }
            ]
        );
    }

    render() {
        const { card } = this.props;

        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.mainContainer}>
                    <View style={styles.cardContainer}>
                        <Text style={styles.question}>{card.question}</Text>
                        <Text style={styles.answer}>{card.answer}</Text>
                    </View>
                </View>
                <View style={styles.deleteContainer}>
                    <TouchableOpacity style={styles.deleteBtn} onPress={this.deleteCard.bind(this, card.question)}>
                        <MaterialCommunityIcons name="delete" size={40} color={COLOR_WHITE} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 8,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_B_1
    },
    cardContainer: {
        flex: 1
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    answer: {
        fontSize: 15,
        color: 'gray',
        fontStyle: 'italic',
        flexWrap: 'wrap'
    },
    deleteContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_FAILURE
    },
    deleteBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default connect()(CardItem);