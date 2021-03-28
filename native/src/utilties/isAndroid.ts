import { Platform } from "react-native";
import { PLATFORM } from "../constants/settings";

const isAndroid = () => Platform.OS == PLATFORM.ANDROID;

export default isAndroid;
