import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

import { signUp } from "@/lib/appwrite";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async () => {
    const { name, email, password } = form;
    setIsSubmitting(true);
    // Perform login logic here
    try {
      if (!name || !email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        setIsSubmitting(false);
        return;
      }

      // Simulate a network request
      await signUp({ name, email, password });
      Alert.alert("Success", "Sign Up Successful");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "An error occurred during sign up");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 rounded-lg p-5 mt-8">
      <Input
        placeholder="Enter your name"
        label="Name"
        secureTextEntry={false}
        onChangeText={(value) => handleChange("name", value)}
        value={form.name}
      />

      <Input
        placeholder="Enter your email"
        label="Email"
        keyboardType="email-address"
        secureTextEntry={false}
        onChangeText={(value) => handleChange("email", value)}
        value={form.email}
      />

      <Input
        placeholder="Enter your Password"
        label="Password"
        secureTextEntry={true}
        onChangeText={(value) => handleChange("password", value)}
        value={form.password}
      />

      <Button
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={handleFormSubmit}
      />

      <View className="flex-row justify-center">
        <Text className="base-regular text-gray-600">
          Already have an account?{" "}
        </Text>
        <Link href="/login" className="base-bold text-primary">
          Log In
        </Link>
      </View>
    </View>
  );
};

export default Signup;
