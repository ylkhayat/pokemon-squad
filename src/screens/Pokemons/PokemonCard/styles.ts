import { StyleSheet } from "react-native";
import colors from "../../../styles/palette";

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 11,

    padding: 15,
  },

  container: {
    alignSelf: "center",
    flexDirection: "row",
    width: "100%",
    flex: 1,
    overflow: "hidden",
    shadowRadius: 30,
  },
  nameContainerStyle: { flex: 1, justifyContent: "flex-end" },
  nameTextStyle: {
    letterSpacing: 2,
    fontSize: 20,
    fontFamily: "Pokemon-Solid",
    color: "black",
  },
  imageStyle: {
    flex: 1,
    height: "100%",
  },
});

export default styles;
