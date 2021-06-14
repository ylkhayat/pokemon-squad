import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import { navigate } from "../../navigation/RootNavigation";
import * as Animatable from "react-native-animatable";
import styles from "./styles";

const Setup = () => {
  const [mode, setMode] = useState(0);
  const lottieRef = useRef(null);
  useEffect(() => {
    // lottieRef?.current?.play();
  }, [mode]);

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" useNativeDriver>
        <LottieView
          ref={lottieRef}
          autoPlay
          autoSize={false}
          loop
          source={require("../../../assets/lottie/playpause.json")}
          style={styles.lottieStyle}
        />
      </Animatable.View>

      <Animatable.View
        animation="bounceInUp"
        useNativeDriver
        style={styles.buttonsContainer}
      >
        <TouchableOpacity onPress={() => setMode(0)}>
          <Text style={styles.guideTextStyle}>Quiet Experience</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode(1)}>
          <Text style={styles.guideTextStyle}>Full Experience</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default Setup;
