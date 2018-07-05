import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import { AndroidBackHandler } from "react-navigation-backhandler";
import I18n from "react-native-i18n";
import Icon from "react-native-vector-icons/Ionicons";
import {
  endQuiz as endQuizAction,
  recordAnswer as recordAnswerAction
} from "source/actions/activeQuiz";
import { getFirstUnansweredQuestion, isQuizComplete } from "source/utils/quiz";
import SafeContainer from "source/components/safeContainer";
import Text from "source/components/text";
import Question from "source/components/question";
import { IconBack } from "source/components/icons";
import { BLUE, GRAY, LIGHT_BLUE, DARK_BLUE } from "source/constants/colors";

class Quiz extends Component {
  onQuizQuit = () => {
    const { activeQuiz, navigation, endQuiz } = this.props;
    if (!activeQuiz) {
      navigation.popToTop();
    } else {
      Alert.alert(I18n.t("quitQuiz"), "", [
        {
          text: I18n.t("no"),
          style: "cancel"
        },
        {
          text: I18n.t("yes"),
          onPress: () => {
            endQuiz(activeQuiz);
            navigation.popToTop();
          }
        }
      ]);
    }
  };

  onBackButtonPressAndroid = () => {
    this.onQuizQuit();
    return true;
  };

  onAnswer = (questionId, answer) => {
    const { activeQuiz, recordAnswer } = this.props;
    recordAnswer(activeQuiz.id, questionId, answer);
  };

  componentDidUpdate() {
    const { activeQuiz, navigation } = this.props;
    if (activeQuiz && isQuizComplete(activeQuiz)) {
      navigation.navigate("Result", { quizId: activeQuiz.id });
    }
  }

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
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerItem}
              onPress={this.onQuizQuit}
            >
              <IconBack size={24} color={GRAY} />
            </TouchableOpacity>
            <View style={styles.headerItem}>
              <Text style={styles.timer}>00:00</Text>
            </View>
          </View>
          {this.renderQuestion()}
        </View>
      </AndroidBackHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  headerItem: {
    justifyContent: "center"
  },
  timer: {
    color: GRAY,
    fontSize: 18
  },
  questionContainer: {
    flex: 1,
    marginTop: 15
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
    currentQuestion: getFirstUnansweredQuestion(activeQuiz)
  };
};

const mapActionsToProps = {
  endQuiz: endQuizAction,
  recordAnswer: recordAnswerAction
};

export default connect(mapStateToProps, mapActionsToProps)(
  SafeContainer(Quiz, { backgroundColor: DARK_BLUE })
);
