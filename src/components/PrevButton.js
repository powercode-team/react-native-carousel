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
    left: 0,
    height: '100%'
  },
})
const PrevButton = ({ onPress }) =>
  <TouchableOpacity
    activeOpacity={0.8}
    style={styles.root}
    onPress={onPress}
  ><Ionicons name="ios-arrow-back" />
  </TouchableOpacity>

PrevButton.propTypes = {
  onPress: func.isRequired
}

export default PrevButton
