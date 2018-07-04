import React, { Component } from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import _find from "lodash.find";
import { AllHtmlEntities as Entities } from "html-entities";
import { getQuizScore, isAnswerCorrect } from "source/utils/quiz";
import SafeContainer from "source/components/safeContainer";
import Text from "source/components/text";

const entities = new Entities();

function renderQuestion(question) {
  const { id, answer, correct_answer, question: questionText } = question;
  return (
    <View key={id} style={styles.questionContainer}>
      <Text>{entities.decode(questionText)}</Text>
      <Text>{isAnswerCorrect(question, answer) ? "Correct" : "Incorrect"}</Text>
    </View>
  );
}

class Result extends Component {
  onBeginAgain = () => this.props.navigation.popToTop();
  render() {
    const { quiz } = this.props;
    const score = getQuizScore(quiz);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onBeginAgain}>
          <Text style={styles.onBeginAgain}>Begin Again</Text>
        </TouchableOpacity>
        {quiz ? (
          <View>
            <Text>{`${score.correct}/${score.total}`}</Text>
            {quiz.questions.map(renderQuestion)}
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  questionContainer: {
    marginBottom: 10
  },
  onBeginAgain: {
    marginTop: 10,
    textAlign: "center",
    color: "#333333"
  }
});

const mapStateToProps = (state, { navigation }) => ({
  quiz: _find(state.history.data, { id: navigation.getParam("quizId") })
});

export default connect(mapStateToProps)(
  SafeContainer(Result, { backgroundColor: "purple" })
);
