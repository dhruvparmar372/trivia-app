import React from "react";
import { Platform } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import IoniIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";

export const IconBack = props =>
  Platform.OS === "ios" ? (
    <IoniIcon name={"ios-arrow-back"} {...props} />
  ) : (
    <IoniIcon name={"md-arrow-back"} {...props} />
  );

export const IconCorrect = props =>
  Platform.OS === "ios" ? (
    <IoniIcon name={"ios-checkmark-circle"} {...props} />
  ) : (
    <MaterialIcon name={"check-circle"} {...props} />
  );

export const IconWrong = props =>
  Platform.OS === "ios" ? (
    <IoniIcon name={"ios-close-circle"} {...props} />
  ) : (
    <MaterialIcon name={"cancel"} {...props} />
  );

export const IconHappy = props => (
  <EntypoIcon name={"emoji-happy"} {...props} />
);
export const IconNeutral = props => (
  <EntypoIcon name={"emoji-neutral"} {...props} />
);
export const IconSad = props => <EntypoIcon name={"emoji-sad"} {...props} />;
