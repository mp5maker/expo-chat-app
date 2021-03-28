import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./stack/home-stack";
import * as React from "react";

const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default Navigation;
