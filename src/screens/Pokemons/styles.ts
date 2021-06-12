import { StyleSheet } from "react-native";
import { height } from "styles/mixins";
import colors from "../../styles/palette";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    color: colors.green,
    width: "60%",
  },
  imageStyle: {
    flex: 1,
    height: "100%",
  },
  autocompleteListContainer: {
    height: height(20),
  },
  autocompleteContainer: {
    zIndex: 5,
    height: height(20),
    margin: 5,
    borderRadius: 10,
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
  },
  autocompleteItem: {
    fontSize: 15,
    fontFamily: "Poppins-Light",
    color: colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 10,
    overflow: "hidden",
  },
  textInputStyle: {
    flex: 1,
    fontFamily: "Poppins-Light",
    backgroundColor: colors.white,
    color: colors.secondary,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
});

export default styles;
