import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { saveScore } from '../../services';

import { COLOR_WHITE, COLOR_B_4, COLOR_A_1, COLOR_B_6, COLOR_SUCCESS, COLOR_BLACK, COLOR_FAILURE } from '../../utils/colors';
import { UPDATE_SCORE, updateScores } from '../../actions/score';
import { updateDeckScore } from '../../actions/deck';

const ANSWER = 'A';
const QUESTION = 'Q';
const FORWARD = 'F';
const REWIND = 'RE';
const RIGHT = true;
const WRONG = false;
const WON = 'W';
const LOST = 'L';
const TIE = 'T';

class Quiz extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckKey } = navigation.state.params;

        return {
            title: `'${deckKey}' Quiz`,
        }
    }

    state = {
        questionIndex: 0,
        answerQuestion: ANSWER,
        questions: []
    }

    componentDidMount() {
        if (this.props.cards.length >= 0) {
            this.setState((prevState) => {
                return {
                    questions: this.props.cards.map(card => {
                        const c = card;
                        c.correct = null;

                        return c;
                    })
                }
            })
        }
    }

    navigateQuestions(step) {

        const { questionIndex } = this.state;
        const size = this.state.questions.length;

        this.setState((prevState) => {
            return {
                answerQuestion: ANSWER
            }
        })

        switch (step) {
            case FORWARD: {

                if (questionIndex >= size - 1) {
                    return;
                }

                this.setState((prevState) => {
                    return {
                        questionIndex: questionIndex + 1
                    }
                });
                return;
            }
            case REWIND: {

                if (questionIndex <= 0) {
                    return;
                }

                this.setState((prevState) => {
                    return {
                        questionIndex: questionIndex - 1
                    }
                });
                return;
            }
        }

    }

    showAnswer() {
        this.setState((prevState) => {
            return {
                answerQuestion: QUESTION
            }
        })
    }

    answer(status) {
        const { questionIndex } = this.state;

        let refreshedQuestions = this.state.questions;
        refreshedQuestions[questionIndex].correct = status;

        this.setState((prevState) => {
            return {
                questions: refreshedQuestions,
                answerQuestion: ANSWER
            }
        });
    }

    done() {

        Alert.alert(
            'Finish quiz?',
            'Do you want do finish this quiz?',
            [
                { text: 'Yes', onPress: this.finishQuiz.bind(this) },
                { text: 'No', onPress: () => { } }
            ]
        )
    }

    async finishQuiz() {
        const { r, w } = this.state.questions.reduce(
            (currentScore, question) => {
                if (question.correct) {
                    return {
                        r: currentScore.r + 1,
                        w: currentScore.w
                    }
                } else {
                    return {
                        r: currentScore.r,
                        w: currentScore.w + 1
                    }
                }
            },
            { r: 0, w: 0 }
        );

        let title = "";
        let message = "";
        let status = null;

        if (r > w) {
            title = "Congratulations!";
            message = "You won!";
            status = WON;
        } else if (r < w) {
            title = "Keep studying!";
            message = "You lost :(";
            status = LOST;
        } else {
            title = "Almost there";
            message = "It's a tie =|";
            status = TIE;
        }

        try {
            const { navigation } = this.props;
            const { deckKey } = navigation.state.params;

            const result = await saveScore(deckKey, status);
            this.props.dispatch(updateScores(result.lastScore));
            this.props.dispatch(updateDeckScore(deckKey, result.deckScore));
            Alert.alert(
                title,
                message,
                [{ text: 'OK', onPress: () => navigation.goBack() }],
                { cancelable: false }
            );
        } catch (e) {
            console.log(e);
        }

    }


    render() {

        const size = this.state.questions.length;

        if (size === 0) {
            return (
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={50} />
                </View>
            );
        } else {

            const { questionIndex, answerQuestion } = this.state;
            const question = this.state.questions[questionIndex];

            return (
                <View style={styles.mainContainer}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity style={styles.btnArrow} onPress={() => { this.navigateQuestions(REWIND) }}>
                            <MaterialCommunityIcons name="arrow-left-thick" color={COLOR_WHITE} size={35} />
                        </TouchableOpacity>
                        <View style={styles.numQuestionContainer}>
                            <Text style={styles.numQuestionText}>{questionIndex + 1}/{size}</Text>
                        </View>
                        <TouchableOpacity style={styles.btnArrow} onPress={() => { this.navigateQuestions(FORWARD) }}>
                            <MaterialCommunityIcons name="arrow-right-thick" color={COLOR_WHITE} size={35} />
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.answerQuestion === ANSWER
                            ?
                            (
                                <View style={styles.qaWrapper}>
                                    <View style={styles.questionContainer}>
                                        <Text style={styles.questionText}>"{question.question}"</Text>
                                    </View>
                                    <View style={styles.btnContainer}>
                                        <TouchableOpacity style={styles.btn} onPress={this.showAnswer.bind(this)}>
                                            <Text style={styles.btnAnswerText}>Answer</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btnDone} onPress={this.done.bind(this)}>
                                            <Text style={styles.btnDoneText}>Done</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                            :
                            (
                                <View style={styles.qaWrapper}>
                                    <View style={styles.questionContainer}>
                                        <Text style={styles.questionText}>"{question.answer}"</Text>
                                    </View>
                                    <View style={styles.btnContainer}>
                                        <TouchableOpacity style={styles.btnCorrect} onPress={() => this.answer(RIGHT)}>
                                            <Text style={styles.btnAnswerText}>Right =)</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btnWrong} onPress={() => this.answer(WRONG)}>
                                            <Text style={styles.btnDoneText}>Wrong =(</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                    }
                </View>

            );

        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    topContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    questionContainer: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: COLOR_B_6,
        margin: 5
    },
    btnContainer: {
        flex: 3
    },
    qaWrapper: {
        flex: 10
    },
    btnAnswerContainer: {
        flex: 3,
        flexDirection: 'row'
    },
    btnArrow: {
        flex: 2,
        backgroundColor: COLOR_B_4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numQuestionContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numQuestionText: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    questionText: {
        fontSize: 25,
        fontStyle: 'italic'
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOR_B_4,
        borderRadius: 2,
        margin: 2
    },
    btnDone: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOR_SUCCESS,
        borderRadius: 2,
        margin: 2
    },
    btnAnswerText: {
        flex: 1,
        fontSize: 20,
        alignSelf: 'center',
        color: COLOR_A_1,
        textAlign: 'center'
    },
    btnDoneText: {
        flex: 1,
        fontSize: 20,
        alignSelf: 'center',
        color: COLOR_BLACK,
        textAlign: 'center'
    },
    btnCorrect: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'green',
        borderRadius: 2,
        margin: 2
    },
    btnWrong: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOR_FAILURE,
        borderRadius: 2,
        margin: 2
    }
});

function mapStateToProps({ decks }, props) {
    const { deckKey } = props.navigation.state.params;
    const deck = decks[deckKey];
    const cards = deck.cards;

    return {
        cards
    };
}

export default connect(mapStateToProps)(Quiz);