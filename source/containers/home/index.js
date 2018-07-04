import React, { Component } from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import Config from "react-native-config";
import { connect } from "react-redux";
import { startQuiz as startQuizAction } from "source/actions/activeQuiz";
import { fillQuizBank as fillQuizBankAction } from "source/actions/quizBank";
import SafeContainer from "source/components/safeContainer";
import Text from "source/components/text";
import { MINIMUM_PENDING_QUIZZES_COUNT } from "source/constants/app";
import { BLUE } from "source/constants/colors";

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
        <Text style={styles.info}>
          {pendingQuizzes.length} Quizzes pending!
        </Text>
        <Text style={styles.info}>
          {completedQuizzes.length} Quizzes completed!
        </Text>
        <TouchableOpacity onPress={this.beginQuiz}>
          <Text style={styles.beginQuiz}>Begin</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  info: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  beginQuiz: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
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
