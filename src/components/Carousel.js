import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Animated } from 'react-native'
import { array, func } from 'prop-types'
import PrevButton from './PrevButton'
import NextButton from './NextButton'

const styles = StyleSheet.create({
  root: {
    width: 400,
    position: 'relative',
    height: 220,
  }
})

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class Carousel extends Component {

  state = {
    currentIndex: 0,
  }

  constructor(props) {
    super(props)
    this.initialize()
    this.setupScrollHandler()
  }

  initialize = () => {
    this.xOffset = new Animated.Value(0)
  }

  renderItem = ({ index, item }) => {
    const { renderItem } = this.props
    return renderItem({ ...item, index })
  }

  scrollHandler = (event) => {
    this.scrollX = event.nativeEvent.contentOffset.x
  }

  setupScrollHandler = () => {

    const events = [
      {
        nativeEvent: {
          contentOffset: { x: this.xOffset }
        }
      }
    ]

    const options = {
      useNativeDriver: true,
      listener: this.scrollHandler
    }

    this.handleOnScroll = Animated.event(events, options)
  }

  calcCurrentIndex = (scrollOffset) => {
    const { items } = this.props
    const count = items.length
    const maxOffset = count * 350
    return Math.floor((maxOffset - (maxOffset - scrollOffset)) / 350)
  }

  calcClosestPoint = (scrollOffset) => {
    const currentIndex = this.calcCurrentIndex(scrollOffset)
    const tippingPoint = (350 * currentIndex) + 350 / 2
    const prevOffset = currentIndex * 350
    const nextOffset = 350 * currentIndex + 350

    return scrollOffset > tippingPoint ? nextOffset : prevOffset
  }

  scrollToClosestPoint = () => {
    const offset = this.calcClosestPoint(this.scrollX)
    this._scrollView.getNode().scrollToOffset({
      offset: offset,
      animated: true
    })
  }

  next = () => {
    const { currentIndex } = this.state
    this._scrollView.getNode().scrollToOffset({
      offset: currentIndex * 350 + 350,
      animated: true
    })
  }

  prev = () => {
    const { currentIndex } = this.state
    this._scrollView.getNode().scrollToOffset({
      offset: currentIndex * 350 - 350,
      animated: true
    })
  }

  handleViewableItemsChanged = (data) => {
    const currentIndex = data.viewableItems[0]?.index
    this.setState({ currentIndex })
  }

  render() {
    const { items } = this.props

    return (
      <View style={styles.root}>
        <AnimatedFlatList
          horizontal
          style={{ width: 400 }}
          onViewableItemsChanged={this.handleViewableItemsChanged}
          ref={ref => this._scrollView = ref}
          data={items}
          automaticallyAdjustContentInsets={false}
          decelerationRate={30}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderItem}
          snapToInterval={350}
          onScroll={this.handleOnScroll}
          onMomentumScrollEnd={this.scrollToClosestPoint}

        />
        <PrevButton onPress={this.prev} />
        <NextButton onPress={this.next} />
      </View>
    )
  }
}

Carousel.propTypes = {
  items: array,
  renderItem: func,
}

export default Carousel
