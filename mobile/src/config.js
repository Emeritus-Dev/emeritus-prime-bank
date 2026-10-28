import { Platform } from "react-native";

const LOCAL_DEV_IP = "127.0.0.1";

const getBaseUrl = () => {
    if (Platform.OS === "web") {
        return "http://127.0.0.1:8000/api/v1";
    }
    if (Platform.OS === "android") {
        return "http://10.0.2.2:8000/api/v1";
    }
    return `http://${LOCAL_DEV_IP}:8000/api/v1`;
};

export const API_BASE_URL = getBaseUrl();