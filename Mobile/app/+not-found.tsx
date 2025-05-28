import { View, Text,Pressable } from 'react-native'
import {Buttons, Divs,Typos} from '../styles/styles.styles.js'
import React from 'react'
import { useRouter } from 'expo-router';

export default function NotFound() {
    const router = useRouter();
  return (
    <View style={Divs.screenView}>
      <View style={Divs.OutlineDiv}>
            <Text style={Typos.h1}>Page Not Found</Text>
            <Text style={Typos.body}>The page you are looking for does not exist</Text>
            <Pressable style={Buttons.primary} onPress={()=>{router.push("/")}}><Text>Go To Dashboard</Text></Pressable>
      </View>
    </View>
  )
}

