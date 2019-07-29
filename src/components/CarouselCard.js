import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  root: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 50,
    padding: 25,
    width: 300,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  subtitle: {
    color: 'gray'
  }
})
const CarouselCard = ({ style, title, subtitle }) =>
  <View style={[styles.root, style]}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>

export default CarouselCard
