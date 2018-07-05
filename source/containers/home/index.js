import React, { Component } from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { startQuiz as startQuizAction } from "source/actions/activeQuiz";
import { fillQuizBank as fillQuizBankAction } from "source/actions/quizBank";
import SafeContainer from "source/components/safeContainer";
import Text from "source/components/text";
import {
  MINIMUM_PENDING_QUIZZES_COUNT,
  QUIZ_QUESTION_COUNT
} from "source/constants/app";
import { BLUE, GRAY, LIGHT_BLUE, DARK_BLUE } from "source/constants/colors";

class Home extends Component {
  triggerQuizBankFill = () =>
    this.props.fillQuizBank(MINIMUM_PENDING_QUIZZES_COUNT);

  beginQuiz = () => {
    const { navigation, pendingQuizzes, startQuiz } = this.props;
    const quizToStart = pendingQuizzes[0];

    if (quizToStart) {
      startQuiz(quizToStart);
      navigation.navigate("Quiz");
    }
  };

  showHistory = () => this.props.navigation.navigate("History");

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      this.triggerQuizBankFill
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      this.triggerQuizBankFill
    );
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
    this.willBlurListener.remove();
  }

  render() {
    const { pendingQuizzes, completedQuizzes } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcomeText}>{I18n.t("welcomeMessage")}</Text>
          <Text style={styles.appName}>{I18n.t("appName")}</Text>
        </View>
        <View style={styles.challengeContainer}>
          <Text style={styles.challengeDescription}>
            {I18n.t("challengeDescription", {
              questionCount: QUIZ_QUESTION_COUNT
            })}
          </Text>
          <Text style={styles.challengeText}>{I18n.t("challengeText")}</Text>
        </View>
        <TouchableOpacity style={styles.beginButton} onPress={this.beginQuiz}>
          <Text style={styles.beginButtonText}>{I18n.t("beginQuiz")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.highScoreButton}
          onPress={this.showHistory}
        >
          <Text style={styles.highScoreButtonText}>{I18n.t("highScores")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15
  },

  welcomeText: {
    fontSize: 24,
    color: GRAY,
    marginBottom: 5
  },
  appName: {
    fontSize: 38,
    fontWeight: "bold",
    color: GRAY
  },

  challengeContainer: {
    borderWidth: 1,
    borderColor: GRAY,
    padding: 10,
    borderRadius: 2,
    marginTop: 48,
    marginBottom: 30
  },
  challengeDescription: {
    color: GRAY
  },
  challengeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: GRAY,
    marginTop: 10
  },

  beginButton: {
    backgroundColor: LIGHT_BLUE,
    padding: 12,
    borderRadius: 2
  },
  beginButtonText: {
    color: DARK_BLUE,
    textAlign: "center"
  },

  highScoreButton: {
    backgroundColor: DARK_BLUE,
    padding: 12,
    borderRadius: 2,
    marginTop: 10
  },
  highScoreButtonText: {
    color: GRAY,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  pendingQuizzes: state.quizBank.data,
  completedQuizzes: state.history.data
});

const mapActionsToProps = {
  startQuiz: startQuizAction,
  fillQuizBank: fillQuizBankAction
};

export default connect(mapStateToProps, mapActionsToProps)(
  SafeContainer(Home, { backgroundColor: BLUE })
);
