import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import _shuffle from "lodash.shuffle";
import { AllHtmlEntities as Entities } from "html-entities";
import Text from "source/components/text";

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
      <View style={styles.container}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.question}>{entities.decode(questionText)}</Text>
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
  container: {
    flex: 1
  },
  category: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20
  },
  question: {
    fontSize: 24,
    color: "#000",
    marginBottom: 20
  },
  answer: {
    borderWidth: 1,
    borderColor: "red",
    marginBottom: 5,
    marginHorizontal: 50
  },
  answerText: {
    fontSize: 20,
    color: "#000"
  }
});

export default Question;
