import React, { Component } from 'react';
import { container, connect } from 'react-redux';
import {
    Alert,
    Slider,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import DifficultyMeter from '../ui/DifficultyMeter';

import { newDeck } from '../../actions';
import { persistDeck } from '../../services';

import { COLOR_B_4, COLOR_B_5, COLOR_WHITE } from '../../utils/colors';

class NewDeck extends Component {

    state = {
        deck: {
            name: '',
            description: '',
            difficulty: 0,
            cards: [],
            won: 0,
            lost: 0
        }
    }

    reset() {
        this.setState({
            deck: {
                name: '',
                description: '',
                difficulty: 0
            }
        });
    }

    async createNewDeck() {
        try {
            if (this.state.deck.name.trim() === '') {
                Alert.alert(
                    'Required',
                    "Deck's name is required",
                    [{ text: 'Ok', onPress: () => { } }],
                    { cancelable: false });
                return;
            }

            persistDeck(this.state.deck);
            this.props.dispatch(newDeck(this.state.deck));

            const routeName = "Index";
            const navigation = NavigationActions.navigate({ routeName });

            this.props.navigation.dispatch(navigation);

        } catch (e) {
            Alert.alert(
                'Error',
                'Error adding a new deck to your device.',
                [
                    { text: 'Ok', onPress: () => { } }
                ]);
            console.error(e);
        }
        this.reset();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Name</Text>
                <TextInput style={{ borderWidth: 0, width: '75%' }} maxLength={30} placeholder="Javascript II"
                    value={this.state.deck.name}
                    onChangeText={(name) => {
                        this.setState((prev) => {
                            const prevDeck = prev.deck;
                            return {
                                deck: {
                                    ...prevDeck,
                                    name
                                }
                            }
                        })
                    }} />

                <Text style={styles.text}>Description</Text>
                <TextInput style={{ borderWidth: 0, width: '75%' }} maxLength={100} multiline placeholder="Loops, arrays, es6 and more!"
                    value={this.state.deck.description}
                    onChangeText={(description) => {
                        this.setState((prev) => {
                            const prevDeck = prev.deck;
                            return {
                                deck: {
                                    ...prevDeck,
                                    description
                                }
                            }
                        })
                    }} />

                <Text style={styles.text}>Difficulty Level</Text>
                <View style={[styles.rowContainer, { width: '75%' }]}>
                    <Slider style={{ flex: 1 }} minimumValue={0} maximumValue={80} step={20}
                        value={this.state.deck.difficulty}
                        onValueChange={(difficulty) => {
                            this.setState((prev) => {
                                const prevDeck = prev.deck;
                                return {
                                    deck: {
                                        ...prevDeck,
                                        difficulty
                                    }
                                }
                            });
                        }} />
                    <DifficultyMeter size={35} level={this.state.deck.difficulty} />
                </View>

                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={this.reset.bind(this)}>
                        <MaterialIcons name="cancel" size={40} color={COLOR_WHITE} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={this.createNewDeck.bind(this)}>
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
    },
    cancelBtn: {
        backgroundColor: COLOR_B_5,
        borderRadius: 2,
        margin: 5,
        padding: 10
    }
})

export default connect()(NewDeck);