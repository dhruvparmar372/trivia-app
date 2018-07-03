import React from "react";
import { SafeAreaView } from "react-navigation";
import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function(Component, { backgroundColor } = {}) {
  return function(props) {
    return (
      <SafeAreaView
        style={[styles.container, backgroundColor ? { backgroundColor } : {}]}
      >
        <Component {...props} />
      </SafeAreaView>
    );
  };
}
