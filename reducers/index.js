import { combineReducers } from 'redux';

import decks from './decks';
import scores from './scores';

export default combineReducers({ decks, scores });