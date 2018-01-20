import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import FlashTabNavigator from './FlashTabNavigator';

import AddCard from '../flashcards/AddCard';
import DeckDetails from '../flashcards/DeckDetails';

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
            }
        });

        return (
            <FlashStack />
        )
    }


}