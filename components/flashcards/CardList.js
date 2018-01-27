import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import CardItem from '../ui/CardItem';
import Entypo from '@expo/vector-icons/Entypo';

class CardList extends Component {

    render() {
        const { cards } = this.props;
        const { deckKey, refresher } = this.props.navigation.state.params;

        if (cards.length === 0) {

            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Entypo size={75} name="emoji-sad" />
                    <Text>You have no cards for this deck.</Text>
                </View>
            );
        } else {

            return (
                <ScrollView style={styles.container}>
                    {cards.map(card => (
                        <CardItem key={card.question} card={card} deck={deckKey} refresher={refresher} />
                    ))}

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

function mapStateToProps({ decks }, props) {
    const { deckKey } = props.navigation.state.params;
    const cards = decks[deckKey].cards;

    return {
        cards
    }
}

export default connect(mapStateToProps)(CardList);