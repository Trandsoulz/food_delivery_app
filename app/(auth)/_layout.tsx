import Button from "@/components/Button";
import Input from "@/components/Input";
import { images } from "@/constants";
import { Slot } from "expo-router";
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

const _layout = () => {
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
          <Image source={images.logo} className="self-center size-48 absolute -bottom-16" />

          <Input placeholder="Enter your email" label="Email" keyboardType="email-address" secureTextEntry={false} />
          <Button />
        </View>
      </ScrollView>
      <Slot />
    </KeyboardAvoidingView>
  );
};

export default _layout;
