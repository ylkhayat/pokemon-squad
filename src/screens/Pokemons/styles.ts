import { StyleSheet } from "react-native";
import colors from "../../styles/palette";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    color: "black",
    width: "60%",
  },
  imageStyle: {
    flex: 1,
    height: "100%",
  },
});

export default styles;
