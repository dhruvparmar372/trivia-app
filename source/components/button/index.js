import React, { PureComponent } from "react";
import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import Text from "source/components/text";
import { LIGHT_BLUE } from "source/constants/colors";

class Button extends PureComponent {
  render() {
    const {
      rounded,
      backgroundColor = LIGHT_BLUE,
      text,
      textColor,
      style = {},
      ...rest
    } = this.props;

    return (
      <TouchableOpacity
        {...rest}
        style={[
          styles.container,
          { backgroundColor },
          rounded ? { borderRadius: 2 } : {},
          style
        ]}
      >
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  text: {
    textAlign: "center"
  }
});

export default Button;
