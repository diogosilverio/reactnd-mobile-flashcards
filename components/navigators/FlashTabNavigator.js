import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import DeckList from '../flashcards/DeckList';
import NewDeck from '../flashcards/NewDeck';
import Scores from '../flashcards/Scores';

import { COLOR_B_1, COLOR_A_1, COLOR_B_5 } from '../../utils/colors';

export default class FlashTabNavigator extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
        
        const tabBarOptions = {
            inactiveTintColor: COLOR_B_1,
            activeTintColor: COLOR_A_1,
            style: {
                backgroundColor: COLOR_B_5,
                height: 56
            }
        }

        const FlashTab = TabNavigator({
            Index: {
                screen: DeckList
            },
            New: {
                screen: NewDeck
            },
            Scores: {
                screen: Scores
            }
        }, {
                tabBarOptions
            });

        return (
            <FlashTab screenProps={{rootNavigation: this.props.navigation}}  />
        );
    }


}