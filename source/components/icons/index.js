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
