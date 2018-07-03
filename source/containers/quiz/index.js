import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Config from "react-native-config";
import safeContainer from "source/components/safeContainer";

class Quiz extends Component {
  static navigationOptions = {
    title: "Quiz"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Quiz Screen!</Text>
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
  }
});

export default safeContainer(Quiz, { backgroundColor: "yellow" });
