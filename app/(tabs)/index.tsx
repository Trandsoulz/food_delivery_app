import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cn from "clsx";

import { offers, images } from "@/constants";
import CartButton from "@/components/CartButton";
import { useAuthStore } from "@/stores/authStore";

export default function Index() {

  const { user } = useAuthStore();

  console.log("USER ", JSON.stringify(user, null, 2))
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ index, item }) => {
          const isEven = index % 2 === 0;

          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff22" }}
              >
                {({ pressed }) => (
                  <>
                    <View className="w-1/2 h-full">
                      <Image
                        source={item.image}
                        className={cn("size-full")}
                        resizeMode={"contain"}
                      />
                    </View>
                    <View className={cn("offer-card__info", isEven && "pl-8")}>
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor={"#ffffff"}
                      />
                    </View>
                  </>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="mx-4 pb-28"
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <View className="flex-start">
              <Text className="font-semibold h3-bold text-primary">
                Deliver To
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1 mt-0.5">
                <Text className=" paragraph-bold text-dark-100">Nigeria</Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

           <CartButton /> 
          </View>
        )}
      />
    </SafeAreaView>
  );
}
