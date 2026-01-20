import Button from "@/components/Button";
import Input from "@/components/Input";
import { logIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useState } from "react";
// import { router } from "expo-router";
import { Alert, Text, View } from "react-native";

const Login = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  }

  const handleFormSubmit = async () => {
    const { email, password } = form;
    setIsSubmitting(true);
    // Perform login logic here
    try {
       if(!email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        setIsSubmitting(false);
        return;
       }

        // Simulate a network request
        await logIn({ email, password });
        Alert.alert("Success", "Login Successful");
        router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className="gap-10 rounded-lg p-5 mt-8">
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
        keyboardType="default"
        secureTextEntry={true}
        onChangeText={(value) => handleChange("password", value)}
        value={form.password}
      />

      <Button title="Log In" isLoading={isSubmitting} onPress={handleFormSubmit} />

      <View className="flex-row justify-center">
        <Text className="base-regular text-gray-600">
          Don&apos;t have an account?{" "}
        </Text>
        <Link href="/signup" className="base-bold text-primary">Sign Up</Link>
      </View>
    </View>
  );
};

export default Login;
