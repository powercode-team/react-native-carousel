import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { func } from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    height: '100%'
  },
})
const NextButton = ({ onPress }) =>
  <TouchableOpacity
    activeOpacity={0.8}
    style={styles.root}
    onPress={onPress}
  ><Ionicons name="ios-arrow-forward" />
  </TouchableOpacity>

NextButton.propTypes = {
  onPress: func.isRequired
}

export default NextButton
