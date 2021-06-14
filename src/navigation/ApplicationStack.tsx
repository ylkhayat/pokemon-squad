import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "screens/Landing";
import Setup from "screens/Setup";
import Pokemons from "screens/Pokemons";
import SinglePokemon from "screens/SinglePokemon";
import useBackgroundTrack from "hooks/useBackgroundTrack";
import BackgroundTrackContext from "hooks/useBackgroundTrack/BackgroundTrackContext";

const Stack = createStackNavigator();

const AppStack = () => {
  const controls = useBackgroundTrack();
  return (
    <BackgroundTrackContext.Provider value={controls}>
      <Stack.Navigator initialRouteName="landing" headerMode="none">
        <Stack.Screen name="landing" component={Landing} />
        <Stack.Screen name="setup" component={Setup} />
        <Stack.Screen
          name="pokemons"
          component={Pokemons}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="single_pokemon" component={SinglePokemon} />
      </Stack.Navigator>
    </BackgroundTrackContext.Provider>
  );
};

export default AppStack;
