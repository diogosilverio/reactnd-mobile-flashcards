import React, { Component } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

import { COLOR_LEVEL_1, COLOR_LEVEL_2, COLOR_LEVEL_3, COLOR_LEVEL_4, COLOR_LEVEL_5 } from '../../utils/colors';

export default class DifficultyMeter extends Component {

    render() {
        const { level, size } = this.props;

        let currentDifficult = <MaterialCommunityIcons name="baby-buggy" size={size} color={COLOR_LEVEL_1} />

        if (level >= 20 && level < 40) {
            currentDifficult = <MaterialCommunityIcons name="cake-variant" size={size} color={COLOR_LEVEL_2} />
        } else if (level >= 40 && level < 60) {
            currentDifficult = <MaterialCommunityIcons name="emoticon-happy" size={size} color={COLOR_LEVEL_3} />
        } else if (level >= 60 && level < 80) {
            currentDifficult = <Octicons name="gear" size={size} color={COLOR_LEVEL_4} />
        } else if (level >= 80) {
            currentDifficult = <Octicons name="flame" size={size} color={COLOR_LEVEL_5} />
        }

        return (
            <View>
                {currentDifficult}
            </View>
        );
    }


}