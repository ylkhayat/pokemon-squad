import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigation/ApplicationStack";
import { navigationRef } from "./src/navigation/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./src/network";

const AppNavigator = () => (
  <SafeAreaProvider>
    <NavigationContainer ref={navigationRef}>
      <AppStack />
    </NavigationContainer>
  </SafeAreaProvider>
);
export default AppNavigator;
