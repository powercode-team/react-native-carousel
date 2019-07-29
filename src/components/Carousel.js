import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Animated } from 'react-native'
import { array, func, number } from 'prop-types'
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

  scrollX = 0

  state = {
    currentIndex: 0,
    isAnimated: true,
    offset: 0,
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
    const { items, itemWidth } = this.props
    const count = items.length
    const maxOffset = count * itemWidth
    return Math.floor((maxOffset - (maxOffset - scrollOffset)) / itemWidth)
  }

  calcClosestPoint = (scrollOffset) => {
    const { itemWidth } = this.props
    const currentIndex = this.calcCurrentIndex(scrollOffset)
    const tippingPoint = (itemWidth * currentIndex) + itemWidth / 2
    const prevOffset = currentIndex * itemWidth
    const nextOffset = itemWidth * currentIndex + itemWidth
    return scrollOffset > tippingPoint ? nextOffset : prevOffset
  }

  scrollToClosestPoint = () => {
    this.setState({ isAnimated: true })
    const offset = this.calcClosestPoint(this.scrollX)
    this._scrollView.getNode().scrollToOffset({
      offset: offset,
      animated: true
    })
  }

  next = () => {
    const { itemWidth, items } = this.props
    const count = items.length
    const { currentIndex } = this.state
    const totalOffset = count * itemWidth
    const offset = currentIndex * itemWidth
    const nextOffset = offset + itemWidth
    const newOffset = nextOffset < totalOffset ? nextOffset : offset
    this._scrollView.getNode().scrollToOffset({
      offset: newOffset,
      animated: true
    })

    this.setState({ isAnimated: false })
  }

  prev = () => {
    const { itemWidth } = this.props
    const { currentIndex } = this.state
    const offset = currentIndex * itemWidth
    const prevOffset = offset - itemWidth
    const newOffset = prevOffset > 0 ? prevOffset : 0
    this._scrollView.getNode().scrollToOffset({
      offset: newOffset,
      animated: true
    })

    this.setState({ isAnimated: false })
  }

  handleViewableItemsChanged = (data) => {
    const currentIndex = data.viewableItems[0]?.index
    this.setState({ currentIndex })
  }

  render() {
    const { items, itemWidth } = this.props
    const { isAnimated } = this.state
    const totalOffset = items.length * itemWidth

    const myOffset = this.scrollX

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
          snapToInterval={itemWidth}
          onScroll={this.handleOnScroll}
          onMomentumScrollEnd={this.scrollToClosestPoint}

        />
        {isAnimated && myOffset > 0 && <PrevButton onPress={this.prev} />}
        {isAnimated && myOffset < totalOffset - (itemWidth + 100) && <NextButton onPress={this.next} />}
      </View>
    )
  }
}

Carousel.propTypes = {
  items: array.isRequired,
  renderItem: func.isRequired,
  itemWidth: number.isRequired,
}

export default Carousel
