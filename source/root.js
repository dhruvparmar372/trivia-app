import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "source/store";
import RootStack from "source/navigators/root";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

export default Root;
