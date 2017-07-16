import React, { PropTypes } from 'react';
import { View, Animated, StyleSheet, Slider } from 'react-native';
import { Constants } from 'expo';
import CircularProgress from '../components/CircularProgress';
import Text from '../components/Text';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0,
      chartFillAnimation: new Animated.Value(0),
      radius: 90,
      baseWidth: 10,
      barWidth: 8
    }
  }

  componentDidMount() {
    this._animateFill();
  }

  _fillSliderOnComplete = (val) => {
    this.setState({progressValue: val}, this._animateFill)

  }

  _animateFill = () => {
    const { progressValue, chartFillAnimation } = this.state;
    Animated.spring(
      chartFillAnimation,
      {
        toValue: progressValue
      }
    ).start();
  }

  render() {
    const {
      progressValue,
      chartFillAnimation,
      ...other
     } = this.state;
    return (
      <View style={styles.container}>
        <AnimatedProgress
          size={300}
          fill={chartFillAnimation}
          {...other}
          />
        <SliderComponent
          key="fillSlider"
          onSlidingComplete={(v) => { this.setState({progressValue: v}, this._animateFill) }}
          label={'Fill'} value={progressValue}
          />

        <SliderComponent
          key="radiusSlider"
          onSlidingComplete={(v) => this.setState({radius: v})}
          label={'Radius'} value={other.radius}
          />

        <SliderComponent
          key="baseWidth"
          onSlidingComplete={(v) => this.setState({baseWidth: v})}
          label={'Base Width'} value={other.baseWidth}
          />

        <SliderComponent
          key="barWidth"
          onSlidingComplete={(v) => this.setState({barWidth: v})}
          label={'Bar Width'} value={other.barWidth}
          />
      </View>
    )
  }
}

const SliderComponent = (props) => {
  const {
    onSlidingComplete,
    value = 0,
    label
  } = props
  return (
    <View style={styles.sliderComponent}>
      <Text>{label + ' ' + value}</Text>
      <Slider
        maximumValue={100}
        minimumValue={0}
        step={1}
        value={value}
        onSlidingComplete={onSlidingComplete}
        style={styles.slider}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 65,
    backgroundColor: '#ecf0f1',
  },
  sliderComponent: {
    width: 300,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  slider: {
    marginLeft: 20,
    flex: 1
  }
});

AnimatedCircularProgress.propTypes = {
  // style: View.propTypes.style,
  // size: PropTypes.number,
  fill: PropTypes.number.isRequired,
  // prefill: PropTypes.number,
  baseWidth: PropTypes.number,
  barWidth: PropTypes.number,
  // tintColor: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  // backgroundColor: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  // tension: PropTypes.number,
  // friction: PropTypes.number
}

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10
};
