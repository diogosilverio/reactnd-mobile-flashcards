import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { addCard } from '../../actions';
import { addCardToDeck, getDeck } from '../../services';

import { COLOR_WHITE, COLOR_B_5 } from '../../utils/colors';

class AddCard extends Component {

    state = {
        card: {
            question: '',
            answer: ''
        }
    }

    reset() {
        this.setState({
            deck: {
                question: '',
                answer: ''
            }
        });
    }

    async addCard() {
        const { deckKey, refresher } = this.props.navigation.state.params;

        try {
            if (this.state.card.question.trim() === '' || this.state.card.answer.trim() === '') {
                Alert.alert(
                    'Required',
                    "Type a valid question/answer.",
                    [{ text: 'Ok', onPress: () => { } }],
                    { cancelable: false });
                return;
            }


            await addCardToDeck(deckKey, this.state.card);
            this.props.dispatch(addCard(deckKey, this.state.card));
            refresher();
            this.props.navigation.goBack();

        } catch (e) {
            Alert.alert(
                'Error',
                `Error adding a new card to deck '${deckKey}'.`,
                [
                    { text: 'Ok', onPress: () => { } }
                ]);
            console.error(e);
        }

        this.reset();
    }

    render() {
        const { deckKey } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Question</Text>
                <TextInput style={{ borderWidth: 0, width: '90%' }} maxLength={30} placeholder="What is a Java Annotation?"
                    value={this.state.card.question}
                    onChangeText={(question) => {
                        this.setState((prev) => {
                            const prevCard = prev.card;
                            return {
                                card: {
                                    ...prevCard,
                                    question
                                }
                            }
                        })
                    }} />

                <Text style={styles.text}>Answer</Text>
                <TextInput style={{ borderWidth: 0, width: '90%' }} maxLength={100} multiline placeholder="Annotations is a form of metadata..."
                    value={this.state.card.answer}
                    onChangeText={(answer) => {
                        this.setState((prev) => {
                            const prevCard = prev.card;
                            return {
                                card: {
                                    ...prevCard,
                                    answer
                                }
                            }
                        })
                    }} />

                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.saveBtn} onPress={this.addCard.bind(this)}>
                        <MaterialIcons name="done" size={40} color={COLOR_WHITE} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 20
    },
    saveBtn: {
        backgroundColor: COLOR_B_5,
        borderRadius: 2,
        margin: 5,
        padding: 10
    }
})

export default connect()(AddCard);