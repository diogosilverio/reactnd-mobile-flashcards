import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import CardItem from '../ui/CardItem';
import Entypo from '@expo/vector-icons/Entypo';
import { COLOR_B_4, COLOR_A_1 } from '../../utils/colors';

class CardList extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckKey } = navigation.state.params;

        return {
            title: `'${deckKey}' Cards`,
        }
    }

    render() {
        const { cards, navigation } = this.props;
        const { deckKey, refresher } = this.props.navigation.state.params;

        const doubleRefresher = () => {
            this.setState({});
            refresher();
        }

        if (cards.length === 0) {

            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Entypo size={75} name="emoji-sad" />
                    <Text>You have no cards for this deck.</Text>
                    <TouchableOpacity style={styles.btnAdd} onPress={() => navigation.navigate('AddCard', { deckKey, refresher: doubleRefresher })}>
                        <Text style={styles.text}>Add a new card!</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {

            return (
                <ScrollView style={styles.container}>
                    {cards.map(card => (
                        <CardItem key={card.question} card={card} deck={deckKey} refresher={refresher} rootNavigation={this.props.navigation} />
                    ))}

                </ScrollView>
            );
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
});

function mapStateToProps({ decks }, props) {
    const { deckKey } = props.navigation.state.params;
    const cards = decks[deckKey].cards;

    return {
        cards
    }
}

export default connect(mapStateToProps)(CardList);