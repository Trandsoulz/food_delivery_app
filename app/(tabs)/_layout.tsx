import { Redirect, Slot } from "expo-router";

import { useAuthStore } from "@/stores/authStore";

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore(); // Get authentication status

  if (!isAuthenticated) return <Redirect href="/login" />;
  return <Slot />;
}
