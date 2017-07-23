import React, { PropTypes } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Slider,
  TextInput,
  ScrollView,
  SegmentedControlIOS
} from 'react-native';
import { Constants } from 'expo';
import CircularProgress from '../components/CircularProgress';
import Text from '../components/Text';

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progressValue: 1,
      chartFillAnimation: new Animated.Value(25),
      barRadius: 90,
      baseRadius: 90,
      baseWidth: 10,
      barWidth: 8,
      barColor: "#FF9F1E",
      baseColor: '#666'
    }
  }

  componentDidMount() {
    this._animateFill();
  }

  _animate = (e) => {
    this.setState({progressValue: e.nativeEvent.selectedSegmentIndex}, this._animateFill)

  }

  _animateFill = () => {
    const { progressValue, chartFillAnimation } = this.state;
    console.log("pro", progressValue)

    Animated.spring(
      chartFillAnimation,
      {
        toValue: progressValue * 25
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
      <ScrollView contentContainerStyle={styles.container}>
        <SegmentedControlIOS
          style={styles.segmentControl}
          key="fillSegment"
          tintColor='#666'
          values={['0', '25', '50', '75', '100']}
          selectedIndex={progressValue}
          onChange={this._animate}
        />

        <SliderComponent
          key="baseRadiusSlider"
          onSlidingComplete={v => this.setState({baseRadius: v})}
          label={'BaseRadius'} value={other.baseRadius}
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
          key="barRadiusSlider"
          onSlidingComplete={v => this.setState({barRadius: v})}
          label={'BarRadius'} value={other.barRadius}
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

        <AnimatedProgress
          size={300}
          fill={chartFillAnimation}
          {...other}
          />
      </ScrollView>
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
  },
  segmentControl: {
    marginTop: 20,
    // flex: 1
    width: 300,
  }
});

AnimatedCircularProgress.propTypes = {
  tension: PropTypes.number,
  friction: PropTypes.number
}

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10
};
