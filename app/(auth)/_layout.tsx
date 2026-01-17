import { Redirect, Slot } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import { useAuthStore } from "@/stores/authStore";

const AuthLayout = () => {

  const { isAuthenticated } = useAuthStore(); // Get authentication status  

  if(isAuthenticated)  return <Redirect href="/" />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="bg-white h-full"
      >
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            resizeMode="contain"
            className="size-full"
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-16"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
