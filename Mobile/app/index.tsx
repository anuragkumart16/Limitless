import { Text, View,StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Divs, Typos } from "@/styles/styles.styles";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Index() {
    useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#ffffff');
    NavigationBar.setBackgroundColorAsync('darkslategray');
  }, []);

  const router = useRouter();
  return (
    <View
      style={Divs.screenViewUnFlexed}
    >
      <StatusBar backgroundColor="black" />
      <Navbar/>
    </View>
  );
}
