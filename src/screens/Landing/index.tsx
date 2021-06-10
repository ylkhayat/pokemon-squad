import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";
import { navigate } from "../../navigation/RootNavigation";
import * as Animatable from "react-native-animatable";
import styles from "./styles";

const Landing = () => {
  const [timesUp, setTimesUp] = useState(false);
  let [fontsLoaded] = useFonts({
    "Pokemon-Solid": require("@fonts/Pokemon-Solid.ttf"),
    "Pokemon-Hollow": require("@fonts/Pokemon-Hollow.ttf"),

    "Poppins-Black": require("@fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("@fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("@fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("@fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("@fonts/Poppins-Light.ttf"),
    "Poppins-Italic": require("@fonts/Poppins-Italic.ttf"),
    "Poppins-Medium": require("@fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("@fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("@fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("@fonts/Poppins-Thin.ttf"),
  });

  const runTimer = () => setTimeout(() => setTimesUp(true), 1500);

  useEffect(() => {
    runTimer();
    if (fontsLoaded && timesUp) {
      // navigate("pokemons");
    }
  }, [fontsLoaded, timesUp]);

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" useNativeDriver>
        <LottieView
          autoPlay
          loop
          source={require("../../../assets/lottie/pokemon-landing.json")}
          style={styles.lottieStyle}
        />
      </Animatable.View>

      {fontsLoaded && (
        <Animatable.View
          animation="bounceInUp"
          useNativeDriver
          style={styles.guideTextContainer}
        >
          <Text style={styles.guideTextStyle}>Hang On! ⏰</Text>
        </Animatable.View>
      )}
    </View>
  );
};

export default Landing;
