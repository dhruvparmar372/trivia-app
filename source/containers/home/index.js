import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import Config from "react-native-config";

class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  beginQuiz = () => {
    this.props.navigation.navigate("Quiz");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {Config.GREETING} Welcome to Trivia App!
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
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

export default Home;
