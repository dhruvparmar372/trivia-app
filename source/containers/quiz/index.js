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
import { endQuiz as endQuizAction } from "source/actions/activeQuiz";
import safeContainer from "source/components/safeContainer";

class Quiz extends Component {
  endQuiz = () => {
    const { activeQuiz, endQuiz, navigation } = this.props;
    endQuiz(activeQuiz.quiz);
    navigation.popToTop();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Quiz Screen!</Text>
        <TouchableOpacity onPress={this.endQuiz}>
          <Text style={styles.endQuiz}>End</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  endQuiz: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

const mapStateToProps = state => ({
  activeQuiz: state.activeQuiz
});

const mapActionsToProps = {
  endQuiz: endQuizAction
};

export default connect(mapStateToProps, mapActionsToProps)(
  safeContainer(Quiz, { backgroundColor: "yellow" })
);
