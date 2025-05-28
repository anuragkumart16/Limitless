import { View, Text } from 'react-native'
import { Typos } from '@/styles/styles.styles'
import { navbarStyles } from '@/styles/navbar.styles'
import React from 'react'

export default function Navbar() {
  return (
    <View style={navbarStyles.container}>
      <Text style={Typos.h1}>Navbar</Text>
    </View>
  )
}