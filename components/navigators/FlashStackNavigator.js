import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import FlashTabNavigator from './FlashTabNavigator';

import AddCard from '../flashcards/AddCard';
import DeckDetails from '../flashcards/DeckDetails';

import { COLOR_A_1, COLOR_B_5 } from '../../utils/colors';
import CardList from '../flashcards/CardList';
import Quiz from '../flashcards/Quiz';

export default class FlashStackNavigator extends Component {

    render() {
        const FlashStack = StackNavigator({
            HomeTabs: {
                screen: FlashTabNavigator
            },
            AddCard: {
                screen: AddCard
            },
            DeckDetails: {
                screen: DeckDetails
            },
            Cards: {
                screen: CardList
            },
            Quiz:{
                screen: Quiz
            }
        }, {
                navigationOptions: {
                    headerTintColor: COLOR_A_1,
                    headerTitleStyle: {
                        color: COLOR_A_1,
                        textAlignVertical: 'center'
                    },
                    headerStyle: {
                        height: 56 - Constants.statusBarHeight,
                        backgroundColor: COLOR_B_5,
                    }
                }
            });

        return (
            <FlashStack />
        )
    }


}