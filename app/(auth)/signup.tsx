import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";

const Signup = () => {
  return (
    <View>
      <Text>Signup Page</Text>
      <Button
        title="Signup"
        onPress={() => {
          router.push("/login");
        }}
      />
    </View>
  );
};

export default Signup;
