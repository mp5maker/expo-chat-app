import { createStackNavigator } from "@react-navigation/stack";
import { HOME_SCREEN, LOGIN_SCREEN } from "../../../constants/routes";
import HomeScreen from "../../../screen/home";
import LoginScreen from "../../../screen/login";
import * as React from "react";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={LOGIN_SCREEN.name} component={LoginScreen} />
      <Stack.Screen name={HOME_SCREEN.name} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
