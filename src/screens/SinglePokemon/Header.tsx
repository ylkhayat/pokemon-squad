import React, { useContext } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { goBack } from "navigation/RootNavigation";
import { Ionicons } from "@expo/vector-icons";
import colors from "styles/palette";
import styles from "./styles";
import BackgroundTrackContext from "hooks/useBackgroundTrack/BackgroundTrackContext";

const Header = () => {
  const controls = useContext(BackgroundTrackContext);

  return (
    <View style={styles.headerContainer}>
      <TouchableWithoutFeedback onPress={goBack}>
        <Ionicons
          name="arrow-back-circle-outline"
          color={colors.primary}
          size={50}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={controls.isPlaying ? controls.onStop : controls.onPlay}
      >
        <Ionicons
          name={controls.isPlaying ? "stop-circle" : "play-circle"}
          color={colors.primary}
          size={50}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Header;
