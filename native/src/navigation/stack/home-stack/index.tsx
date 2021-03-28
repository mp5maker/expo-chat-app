import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import * as Routes from "../../../constants/routes";
import HomeScreen from "../../../screen/home";
import HomeDetailsScreen from "../../../screen/home-details";
import LoginScreen from "../../../screen/login";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.LOGIN_SCREEN.name} component={LoginScreen} />
      <Stack.Screen name={Routes.HOME_SCREEN.name} component={HomeScreen} />
      <Stack.Screen
        name={Routes.HOME_DETAILS_SCREEN.name}
        component={HomeDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
