import { createStackNavigator } from "react-navigation";
import Home from "source/containers/home";
import Quiz from "source/containers/quiz";
import Result from "source/containers/result";
import History from "source/containers/history";

export default createStackNavigator(
  {
    Home: { screen: Home },
    Quiz: { screen: Quiz },
    Result: { screen: Result },
    History: { screen: History }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
