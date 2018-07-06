import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { getQuizScore, isAnswerCorrect } from "source/utils/quiz";
import SafeContainer from "source/components/safeContainer";
import Text from "source/components/text";
import {
  IconBack,
  IconHappy,
  IconSad,
  IconNeutral
} from "source/components/icons";
import { BLUE, GRAY, LIGHT_BLUE, DARK_BLUE } from "source/constants/colors";
import { HEADER_HEIGHT } from "source/constants/layout";

function renderQuiz(quiz) {
  const { id, difficulty, questions, score: { correct, total } } = quiz;
  const scorePercentage = correct / total * 100;
  const formattedScore = I18n.toPercentage(scorePercentage, {
    strip_insignificant_zeros: true,
    precision: 1
  });

  let ScoreIcon;
  if (scorePercentage > 80) {
    ScoreIcon = IconHappy;
  } else if (scorePercentage > 40) {
    ScoreIcon = IconNeutral;
  } else {
    ScoreIcon = IconSad;
  }

  return (
    <View key={id} style={styles.quizContainer}>
      <View>
        <Text style={styles.scoreText}>
          {I18n.t("score")}: {formattedScore}
        </Text>
        <Text style={styles.difficultyText}>
          {I18n.t("difficulty")}: {I18n.t(difficulty)}
        </Text>
      </View>
      <ScoreIcon size={48} color={GRAY} />
    </View>
  );
}

class History extends Component {
  onBack = () => this.props.navigation.popToTop();

  render() {
    const { completedQuizzes } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.headerItem, styles.headerSideItem]}
            onPress={this.onBack}
          >
            <IconBack size={24} color={GRAY} />
          </TouchableOpacity>
          <View style={styles.headerItem}>
            <Text style={styles.headingText}>{I18n.t("highScores")}</Text>
          </View>
          <View style={[styles.headerItem, styles.headerSideItem]} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollingContainer}>
          <View style={styles.quizList}>
            {completedQuizzes.map(renderQuiz)}
          </View>
        </ScrollView>
      </View>
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
    width: 40
  },
  headingText: {
    color: GRAY
  },
  quizList: {
    marginTop: 16
  },
  quizContainer: {
    borderWidth: 1,
    borderColor: GRAY,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  difficultyText: {
    color: GRAY,
    marginTop: 5
  },
  scoreText: {
    color: GRAY,
    fontSize: 29
  }
});

const mapStateToProps = state => ({
  completedQuizzes: state.history.data
    .map(quiz => ({
      ...quiz,
      score: getQuizScore(quiz)
    }))
    .sort((q1, q2) => {
      const { correct: correctQ1, total: totalQ1 } = q1.score;
      const { correct: correctQ2, total: totalQ2 } = q2.score;
      return correctQ2 / totalQ2 - correctQ1 / totalQ1;
    })
});

export default connect(mapStateToProps)(
  SafeContainer(History, { backgroundColor: DARK_BLUE })
);
