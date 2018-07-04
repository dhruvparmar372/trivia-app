import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import {
  endQuiz as endQuizAction,
  recordAnswer as recordAnswerAction
} from "source/actions/activeQuiz";
import SafeContainer from "source/components/safeContainer";
import Question from "source/components/question";

class Quiz extends Component {
  endQuiz = () => {
    const { activeQuiz, endQuiz, navigation } = this.props;
    endQuiz(activeQuiz);
    navigation.popToTop();
  };

  onAnswer = (questionId, answer) => {
    const { activeQuiz, recordAnswer } = this.props;
    recordAnswer(activeQuiz.id, questionId, answer);
  };

  renderQuestion() {
    const { currentQuestion } = this.props;
    return currentQuestion ? (
      <View style={styles.questionContainer}>
        <Question
          question={currentQuestion}
          onAnswer={answer => this.onAnswer(currentQuestion.id, answer)}
        />
      </View>
    ) : null;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderQuestion()}
        <TouchableOpacity onPress={this.endQuiz}>
          <Text style={styles.endQuiz}>End</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  questionContainer: {
    flex: 1,
    marginBottom: 20
  },
  endQuiz: {
    textAlign: "center",
    color: "#333333"
  }
});

const mapStateToProps = state => {
  const { activeQuiz } = state;
  return {
    activeQuiz,
    currentQuestion: activeQuiz
      ? activeQuiz.questions.reduce((accum, question) => {
          return accum || (question.answer ? null : question);
        }, null)
      : null
  };
};

const mapActionsToProps = {
  endQuiz: endQuizAction,
  recordAnswer: recordAnswerAction
};

export default connect(mapStateToProps, mapActionsToProps)(
  SafeContainer(Quiz, { backgroundColor: "yellow" })
);
