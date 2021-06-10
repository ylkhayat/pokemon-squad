import { Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const width = (percentage: number) => (windowWidth * percentage) / 100;
export const height = (percentage: number) => (windowHeight * percentage) / 100;
