import { Platform } from "react-native";
import { PLATFORM } from "../constants/settings";

const isIOS = () => Platform.OS == PLATFORM.IOS;

export default isIOS;
