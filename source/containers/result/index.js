import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import _find from "lodash.find";
import { AllHtmlEntities as Entities } from "html-entities";
import I18n from "react-native-i18n";
import { AndroidBackHandler } from "react-navigation-backhandler";
import { getQuizScore, isAnswerCorrect } from "source/utils/quiz";
import SafeContainer from "source/components/safeContainer";
import Text from "source/components/text";
import Button from "source/components/button";
import { IconBack, IconCorrect, IconWrong } from "source/components/icons";
import { BLUE, GRAY, LIGHT_BLUE, DARK_BLUE } from "source/constants/colors";
import { HEADER_HEIGHT } from "source/constants/layout";

const entities = new Entities();

function renderQuestion(question) {
  const { id, answer, correct_answer, question: questionText } = question;
  const isCorrect = isAnswerCorrect(question, answer);

  return (
    <View key={id} style={styles.answerContainer}>
      <Text style={styles.answerText}>{entities.decode(questionText)}</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {isCorrect ? I18n.t("correct") : I18n.t("wrong")}
        </Text>
        {isCorrect ? (
          <IconCorrect style={[styles.resultText, { marginTop: 6 }]} />
        ) : (
          <IconWrong style={[styles.resultText, { marginTop: 6 }]} />
        )}
      </View>
    </View>
  );
}

class Result extends Component {
  onBack = () => this.props.navigation.popToTop();
  onBackButtonPressAndroid = () => {
    this.onBack();
    return true;
  };

  render() {
    const { quiz } = this.props;
    const { total, correct } = getQuizScore(quiz);
    const formattedScore = I18n.toPercentage(correct / total * 100, {
      strip_insignificant_zeros: true,
      precision: 1
    });

    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.headerItem, styles.headerSideItem]}
              onPress={this.onBack}
            >
              <IconBack size={24} color={DARK_BLUE} />
            </TouchableOpacity>
            <View style={styles.headerItem}>
              <Text style={styles.headingText}>{I18n.t("result")}</Text>
            </View>
            <View style={[styles.headerItem, styles.headerSideItem]} />
          </View>
          <ScrollView contentContainerStyle={styles.scrollingContainer}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreMessage}>{I18n.t("scoreMessage")}</Text>
              <Text style={styles.score}>
                {formattedScore} ({correct}/{total})
              </Text>
            </View>
            <View style={styles.answerList}>
              {quiz.questions.map(renderQuestion)}
            </View>
          </ScrollView>
          <Button
            onPress={this.onBack}
            backgroundColor={DARK_BLUE}
            textColor={GRAY}
            text={I18n.t("playAgain")}
          />
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
    justifyContent: "center"
  },
  headerSideItem: {
    paddingHorizontal: 15,
    width: 50
  },
  headingText: {
    color: DARK_BLUE
  },
  scoreMessage: {
    fontSize: 24,
    color: DARK_BLUE,
    marginBottom: 5
  },
  score: {
    fontSize: 38,
    fontWeight: "bold",
    color: DARK_BLUE
  },
  answerList: {
    marginTop: 16
  },
  answerContainer: {
    borderWidth: 1,
    borderColor: DARK_BLUE,
    padding: 10,
    marginBottom: 10
  },
  answerText: {
    color: DARK_BLUE
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5
  },
  resultText: {
    fontSize: 24,
    color: BLUE
  }
});

const mapStateToProps = (state, { navigation }) => ({
  quiz: _find(state.history.data, { id: navigation.getParam("quizId") })
});

export default connect(mapStateToProps)(
  SafeContainer(Result, { backgroundColor: LIGHT_BLUE })
);
