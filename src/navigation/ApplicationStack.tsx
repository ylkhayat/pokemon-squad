import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../screens/Landing";
import Pokemons from "../screens/Pokemons";
import SinglePokemon from "../screens/SinglePokemon";

const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator initialRouteName="landing" headerMode="none">
    <Stack.Screen name="landing" component={Landing} />
    <Stack.Screen name="pokemons" component={Pokemons} />
    <Stack.Screen name="single_pokemon" component={SinglePokemon} />
  </Stack.Navigator>
);

export default AppStack;
