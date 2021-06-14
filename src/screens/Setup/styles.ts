import { StyleSheet } from "react-native";
import colors from "styles/palette";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    justifyContent: "space-between",
  },

  guideTextStyle: {
    fontSize: 15,
    fontFamily: "Poppins-Black",
    color: colors.primary,
  },
  lottieStyle: {
    width: "80%",
  },
});

export default styles;
