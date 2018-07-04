import React from "react";
import { Text as RNText, StyleSheet } from "react-native";

const Text = props => (
  <RNText {...props} style={[styles.text].concat(props.style)}>
    {props.children}
  </RNText>
);

Text.propTypes = RNText.propTypes;

const styles = StyleSheet.create({
  text: {
    fontFamily: "System",
    fontSize: 16
  }
});

export default Text;
