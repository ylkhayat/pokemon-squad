import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { goBack } from "navigation/RootNavigation";
import { Ionicons } from "@expo/vector-icons";
import colors from "styles/palette";
import styles from "./styles";

const Header = () => (
  <View style={styles.headerContainer}>
    <TouchableWithoutFeedback onPress={goBack}>
      <Ionicons
        name="arrow-back-circle-outline"
        color={colors.primary}
        size={50}
      />
    </TouchableWithoutFeedback>
  </View>
);

export default Header;
