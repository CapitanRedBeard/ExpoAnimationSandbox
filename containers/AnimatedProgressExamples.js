import React, { PropTypes } from 'react';
import { KeyboardAvoidingView, View, Animated, StyleSheet, Slider, TextInput, ScrollView } from 'react-native';
import { Constants } from 'expo';
import CircularProgress from '../components/CircularProgress';
import Text from '../components/Text';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.Component {

  constructor(props) {
    super(props);
    let initialProgress = 25;
    this.state = {
      progressValue: initialProgress,
      chartFillAnimation: new Animated.Value(initialProgress),
      radius: 90,
      baseWidth: 10,
      barWidth: 8,
      barColor: "#FF9F1E",
      baseColor: '#666'
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
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <AnimatedProgress
            size={300}
            fill={chartFillAnimation}
            {...other}
            />
          <SliderComponent
            key="fillSlider"
            onSlidingComplete={v => { this.setState({progressValue: v}, this._animateFill) }}
            label={'Fill'} value={progressValue}
            />

          <SliderComponent
            key="radiusSlider"
            onSlidingComplete={v => this.setState({radius: v})}
            label={'Radius'} value={other.radius}
            />

          <SliderComponent
            key="baseWidth"
            onSlidingComplete={v => this.setState({baseWidth: v})}
            label={'Base width'} value={other.baseWidth}
            />

          <ColorPicker
            key="baseColor"
            colorSuccess={v => this.setState({baseColor: v})}
            label={'Base color'} color={other.baseColor}
            />

          <SliderComponent
            key="barWidth"
            onSlidingComplete={v => this.setState({barWidth: v})}
            label={'Bar width'} value={other.barWidth}
            />

          <ColorPicker
            key="barColor"
            colorSuccess={v => this.setState({barColor: v})}
            label={'Bar color'} color={other.barColor}
            />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const SliderComponent = ({onSlidingComplete, value = 0, label }) => {
  return (
    <View style={styles.sliderComponent}>
      <Text>{label + ' ' + value}</Text>
      <Slider
        maximumValue={100}
        minimumValue={0}
        step={1}
        value={value}
        onValueChange={onSlidingComplete}
        style={styles.slider}/>
    </View>
  )
}

const ColorPicker = ({color, colorSuccess, label}) => {
  const validateColor = val => Boolean(val.match && val.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g))

  return (
    <View style={styles.sliderComponent}>
      <Text style={{color: color}}>{label + ' hex color: ' + color}</Text>
      <TextInput
        style={styles.colorChangeInput}
        placeholder={color}
        onChangeText={val => {
          if(validateColor(val)) {
            colorSuccess(val)
          }
        }}
      />
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
  colorChangeInput: {
    borderColor: '#666',
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 20
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
