import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Carousel from './src/components/Carousel'
import CarouselCard from './src/components/CarouselCard'

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

const items = [{
  key: 'a',
  title: 'What is Lorem Ipsum?',
  subtitle: 'Lorem Ipsum is simply dummy text'
}, {
  key: 'b',
  title: 'What is Lorem Ipsum?',
  subtitle: 'Lorem Ipsum is simply dummy text'
}, {
  key: 'c',
  title: 'What is Lorem Ipsum?',
  subtitle: 'Lorem Ipsum is simply dummy text'
}, {
  key: 'd',
  title: 'What is Lorem Ipsum?',
  subtitle: 'Lorem Ipsum is simply dummy text'
}, {
  key: 'e',
  title: 'What is Lorem Ipsum?',
  subtitle: 'Lorem Ipsum is simply dummy text'
}, {
  key: 'f',
  title: 'What is Lorem Ipsum?',
  subtitle: 'Lorem Ipsum is simply dummy text'
}
]

class App extends Component {

  renderItem = ({ index, title, subtitle }) =>
    <CarouselCard
      title={title}
      style={{ marginRight: index < items.length }}
      subtitle={subtitle}
    />

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          items={items}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

export default App
