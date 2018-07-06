import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView
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
import {
  getFirstUnansweredQuestion,
  isQuizComplete,
  getFormattedTimeElapsed
} from "source/utils/quiz";
import SafeContainer from "source/components/safeContainer";
import Text from "source/components/text";
import Question from "source/components/question";
import { IconBack } from "source/components/icons";
import { BLUE, GRAY, LIGHT_BLUE, DARK_BLUE } from "source/constants/colors";
import { HEADER_HEIGHT } from "source/constants/layout";

class Quiz extends Component {
  constructor() {
    super();
    this.scrollView = React.createRef();
  }

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
            endQuiz(activeQuiz, new Date());
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
    // allow click feedback to complete before recording answer
    setTimeout(() => {
      recordAnswer(activeQuiz.id, questionId, answer);
      this.scrollView.current.scrollTo({ y: 0, animated: true });
    }, 100);
  };

  onScreenFocus = () => {
    const { activeQuiz, navigation } = this.props;
    if (!activeQuiz) {
      navigation.popToTop();
    }
  };

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      this.onScreenFocus
    );
  }

  componentDidUpdate() {
    const { activeQuiz, endQuiz, navigation } = this.props;
    if (activeQuiz && isQuizComplete(activeQuiz)) {
      endQuiz(activeQuiz, new Date());
      navigation.navigate("Result", { quizId: activeQuiz.id });
    }
  }

  renderQuestion() {
    const { currentQuestion, onboarding } = this.props;
    return currentQuestion ? (
      <View style={styles.questionContainer}>
        <Question
          question={currentQuestion}
          onAnswer={answer => this.onAnswer(currentQuestion.id, answer)}
        />
        {onboarding.firstQuestionAnswered ? null : (
          <Text style={styles.answerOnboardText}>
            {I18n.t("chooseBooleanAnswer")}
          </Text>
        )}
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
              <Text style={styles.timer}>
                {getFormattedTimeElapsed(this.props.activeQuiz)}
              </Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollingContainer}
            ref={this.scrollView}
          >
            {this.renderQuestion()}
          </ScrollView>
        </View>
      </AndroidBackHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollingContainer: {
    paddingHorizontal: 15
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  headerItem: {
    justifyContent: "center",
    paddingHorizontal: 15
  },
  timer: {
    color: GRAY
  },
  questionContainer: {
    flex: 1,
    marginVertical: 15
  },
  answerOnboardText: {
    marginTop: 10,
    fontSize: 16,
    color: GRAY,
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  const { activeQuiz, onboarding } = state;
  return {
    activeQuiz,
    onboarding,
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
