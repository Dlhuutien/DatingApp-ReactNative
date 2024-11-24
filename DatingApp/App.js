import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// i18n
import { useTranslation } from "react-i18next";
// import '@formatjs/intl-pluralrules/polyfill';
import 'intl-pluralrules';
import i18n from "./components/i18n";
import SettingsScreen from "./components/SettingsScreen";
// Screens
import SignInScreen from "./components/SignInScreen";
import PhoneSignIn from "./components/PhoneSignIn";
import ProfileScreen from "./components/ProfileScreen";
import UserEditCard from "./components/UserEditCard";
import ChatScreen from "./components/ChatScreen";
import FiltersScreen from "./components/FiltersScreen";
// Redux Toolkit
import { Provider } from "react-redux";
import store from "./components/redux/store";
// Database

const Stack = createStackNavigator();

const App = () => {
  const { t } = useTranslation(); 

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PhoneSignIn"
            component={PhoneSignIn}
            // options={{ headerShown: false }}
            options={{ title: t("sign_in") }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserEditCard"
            component={UserEditCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Filters" component={FiltersScreen} />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: t("settings") }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
