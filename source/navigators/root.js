import { createStackNavigator } from "react-navigation";
import Home from "source/containers/home";
import Quiz from "source/containers/quiz";
import Result from "source/containers/result";

export default createStackNavigator(
  {
    Home: { screen: Home },
    Quiz: { screen: Quiz },
    Result: { screen: Result }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
