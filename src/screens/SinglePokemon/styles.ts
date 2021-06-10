import { StyleSheet } from "react-native";
import colors from "../../styles/palette";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueciel,
  },
  imageStyle: {
    height: 300,
    width: "100%",
  },
  swiperImageStyle: {
    height: 200,
    width: "100%",
  },
  content1Style: {
    width: "90%",
    backgroundColor: colors.secondary,
    padding: 10,
    margin: 15,
    borderRadius: 10,
    alignSelf: "center",
  },
  content2Style: {
    width: "60%",
    backgroundColor: colors.secondary,
    padding: 10,
    margin: 15,
    borderRadius: 10,
  },
  specyContainerStyle: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  typeContainerStyle: {
    marginRight: 8,
    backgroundColor: colors.darkmaron,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  headerTextStyle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: colors.white,
  },
  valueTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    color: colors.white,
  },
});

export default styles;
