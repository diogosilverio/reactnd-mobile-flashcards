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
import { NavigationActions } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';

import DeckItem from '../ui/DeckItem';

import * as services from '../../services';
import * as actions from '../../actions/deck'

import { COLOR_B_4, COLOR_A_1 } from '../../utils/colors';

class DeckList extends Component {

    static navigationOptions = {
        tabBarLabel: 'Decks'
    }

    async componentDidMount() {
        const decks = await services.loadDecks();
        this.props.dispatch(actions.loadDecks(decks));

    }

    navigateToNewDeck() {
        const routeName = "New";

        const navigation = NavigationActions.navigate({
            routeName
        });

        this.props.navigation.dispatch(navigation);
    }

    render() {

        if (this.props.decks === null) {
            return (
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={50} />
                </View>
            );
        } else if (this.props.decks.length === 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Entypo size={75} name="emoji-sad" />
                    <Text>You have no registered decks.</Text>
                    <TouchableOpacity style={styles.btnAdd} onPress={this.navigateToNewDeck.bind(this)}>
                        <Text style={styles.text}>Add a new deck!</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    {this.props.decks.map((deck) => (
                        <TouchableOpacity key={deck.name} onPress={() => this.props.screenProps.rootNavigation.navigate('DeckDetails', { deckKey: deck.name })}>
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
    },
    btnAdd: {
        backgroundColor: COLOR_B_4,
        borderRadius: 2,
        padding: 6,
        margin: 10
    },
    text: {
        color: COLOR_A_1
    }
})

function mapStateToProps({ decks }) {
    const deckArray = Object.keys(decks).map((key) => decks[key]);

    return {
        decks: deckArray
    }
}

export default connect(mapStateToProps)(DeckList);