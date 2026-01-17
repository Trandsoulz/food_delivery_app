import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import "./globals.css";
import { useAuthStore } from "@/stores/authStore";

export default function RootLayout() {


  const { fectchAuthenticatedUser, isLoading } = useAuthStore();


  const [fontsLoaded, error] = useFonts({
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "quickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
    }
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  // Check for authenticated user on app load
  useEffect(() => {
    fectchAuthenticatedUser();    
  }, []);

  if (isLoading || !fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false}} />;
}
