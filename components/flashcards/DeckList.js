import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';

import DeckItem from '../ui/DeckItem';

import { loadDecks } from '../../services';

import { COLOR_B_4 } from '../../utils/colors';

class DeckList extends Component {

    static navigationOptions = {
        tabBarLabel: 'Decks'
    }

    state = {
        decks: null
    }

    componentDidMount() {
        const decks = loadDecks();
        this.setState({
            decks
        })
    }

    render() {

        if (this.state.decks === null) {
            return (
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={50} />
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    {this.state.decks.map((deck) => (
                        <TouchableOpacity key={deck.id}>
                            <DeckItem deck={deck} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect()(DeckList);