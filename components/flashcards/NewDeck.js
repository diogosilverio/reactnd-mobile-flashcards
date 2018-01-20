import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLOR_B_4, COLOR_B_5, COLOR_WHITE } from '../../utils/colors';

export default class NewDeck extends Component {

    state = {
        deck: {
            name: '',
            description: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Name</Text>
                <TextInput style={{ borderWidth: 0, width: '75%' }} maxLength={30} placeholder="Javascript II" value={this.state.deck.name}
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

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => {
                        this.setState({
                            deck: {
                                name: '',
                                description: ''
                            }
                        });
                    }}>
                        <MaterialIcons name="cancel" size={40} color={COLOR_WHITE} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn}>
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
    btnContainer: {
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