import { StyleSheet, Dimensions } from "react-native";
import colors, { backgroundColors } from "../../styles/palette";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  imageContainer: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 10,
    flex: 1,
  },
  nameTextStyle: {
    position: "absolute",
    top: 20,
    letterSpacing: 2.5,
    fontSize: 30,
    fontFamily: "Pokemon-Solid",
    color: colors.white,
    alignSelf: "center",
  },
  imageStyle: {
    width: "100%",
    height: height * 0.6,
  },
  swiperImageStyle: {
    height: 200,
    width: "100%",
  },
  content1Style: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  content2Style: {
    justifyContent: "space-between",
    width: "70%",
    padding: 10,
    borderRadius: 10,
  },
  specieContainerStyle: {
    backgroundColor: backgroundColors[1],
    paddingHorizontal: 8,
    marginLeft: 4,
    paddingVertical: 5,
    borderRadius: 8,
  },

  typeContainerStyle: {
    marginRight: 8,
    backgroundColor: backgroundColors[2],
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  headerTextStyle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: backgroundColors[1],
  },
  valueTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    color: colors.white,
  },
  statContainer: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "space-between",
  },
  statKeyTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    color: backgroundColors[1],
  },
  statValueTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    backgroundColor: backgroundColors[1],
    color: colors.white,
    paddingHorizontal: 3,
    borderRadius: 7,
    marginLeft: 10,
  },
  detailsTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: colors.white,
  },

  oldAudioContainer: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 7,
    alignItems: "center",
  },
  newAudioContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 7,
    alignItems: "center",
  },
});

export default styles;
