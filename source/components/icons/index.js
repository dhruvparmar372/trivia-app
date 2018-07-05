import React from "react";
import { Platform } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import IoniIcon from "react-native-vector-icons/Ionicons";

export const IconBack = props =>
  Platform.OS === "ios" ? (
    <IoniIcon name={"ios-arrow-back"} {...props} />
  ) : (
    <MaterialIcon name={"arrow-back"} {...props} />
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
