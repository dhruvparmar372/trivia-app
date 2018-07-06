import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import _shuffle from "lodash.shuffle";
import { AllHtmlEntities as Entities } from "html-entities";
import I18n from "react-native-i18n";
import Text from "source/components/text";
import Button from "source/components/button";
import { GRAY, LIGHT_BLUE, DARK_BLUE } from "source/constants/colors";

const entities = new Entities();

class Question extends PureComponent {
  recordAnswer = answer => {
    this.props.onAnswer({ value: answer });
  };

  render() {
    const {
      question: { category, question: questionText, answers }
    } = this.props;

    return (
      <View>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.question}>
          <Text style={styles.questionText}>
            {entities.decode(questionText)}
          </Text>
        </View>
        {answers.map(answer => (
          <Button
            rounded
            key={answer}
            onPress={() => this.recordAnswer(answer)}
            style={styles.answer}
            text={answer}
            backgroundColor={LIGHT_BLUE}
            textColor={DARK_BLUE}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  category: {
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
    marginTop: 10
  }
});

export default Question;
