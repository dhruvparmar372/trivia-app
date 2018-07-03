import { createStackNavigator } from "react-navigation";
import Home from "source/containers/home";
import Quiz from "source/containers/quiz";

export default createStackNavigator(
  {
    Home: { screen: Home },
    Quiz: { screen: Quiz }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
