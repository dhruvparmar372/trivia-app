import React, { Component } from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { startQuiz as startQuizAction } from "source/actions/activeQuiz";
import { fillQuizBank as fillQuizBankAction } from "source/actions/quizBank";
import SafeContainer from "source/components/safeContainer";
import Text from "source/components/text";
import Button from "source/components/button";
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
      startQuiz(quizToStart, new Date());
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
        <StatusBar barStyle="light-content" />
        <View style={styles.topWrap}>
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
        </View>
        <View>
          <Button
            onPress={this.beginQuiz}
            rounded
            backgroundColor={LIGHT_BLUE}
            textColor={DARK_BLUE}
            text={I18n.t("beginQuiz")}
          />
          {completedQuizzes.length ? (
            <Button
              onPress={this.showHistory}
              rounded
              backgroundColor={DARK_BLUE}
              textColor={GRAY}
              text={I18n.t("highScores")}
              style={styles.highScoreButton}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 15
  },
  topWrap: {
    flex: 1,
    justifyContent: "center"
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
  highScoreButton: {
    marginTop: 10
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
