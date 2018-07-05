import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import _shuffle from "lodash.shuffle";
import { AllHtmlEntities as Entities } from "html-entities";
import I18n from "react-native-i18n";
import Text from "source/components/text";
import { GRAY, LIGHT_BLUE, DARK_BLUE } from "source/constants/colors";

const entities = new Entities();
class Question extends PureComponent {
  recordAnswer = answer => {
    this.props.onAnswer({ value: answer });
  };

  render() {
    const {
      question: {
        category,
        question: questionText,
        incorrect_answers,
        correct_answer
      }
    } = this.props;
    const answers = _shuffle([...incorrect_answers, correct_answer]);

    return (
      <View>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.question}>
          <Text style={styles.questionText}>
            {entities.decode(questionText)}
          </Text>
        </View>
        {answers.map(answer => (
          <TouchableOpacity
            key={answer}
            onPress={() => this.recordAnswer(answer)}
            style={styles.answer}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  category: {
    fontSize: 18,
    color: GRAY,
    marginBottom: 15
  },
  question: {
    borderWidth: 1,
    borderColor: GRAY,
    padding: 10,
    borderRadius: 2,
    marginBottom: 24
  },
  questionText: {
    fontSize: 29,
    color: GRAY
  },

  answer: {
    backgroundColor: LIGHT_BLUE,
    padding: 12,
    borderRadius: 2,
    marginTop: 10
  },
  answerText: {
    color: DARK_BLUE,
    fontSize: 18,
    textAlign: "center"
  }
});

export default Question;
