import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Animated, TextInput } from 'react-native';
import { Constants, Svg } from 'expo';

const circum = r => Math.PI * r * 2

export default class CircularProgress extends Component {
  constructor(props) {
    super(props);
  }

  _fill = (val) => {
    const { fill, barRadius } = this.props;
    if (isNaN(val)) {
      val = 100;
    } else {
      var c = circum(barRadius);

      if (val < 0) {
        val = 0;
      }
      if (val > 100) {
        val = 100;
      }
      val = ((100 - val) / 100) * c;
    }
    return val;
  };

  render() {
    const {
      fill,
      baseWidth,
      barWidth,
      baseRadius,
      barRadius,
      size,
      barColor,
      baseColor
    } = this.props;
    return (
        <Svg height={size} width={size} style={styles.svg}>
          <Svg.Circle
            key="base"
            r={baseRadius}
            cx={size/2}
            cy={size/2}
            fill="transparent"
            strokeDasharray={[circum(baseRadius)]}
            strokeDashoffset={0}
            stroke={baseColor}
            strokeWidth={baseWidth}
          />
          <Svg.Circle
            key="bar"
            r={barRadius}
            cx={size/2}
            cy={size/2}
            fill="transparent"
            strokeDasharray={[circum(barRadius)]}
            strokeDashoffset={this._fill(this.props.fill)}
            stroke={barColor}
            strokeWidth={barWidth}
          />
        </Svg>
    );
  }
}

const styles = StyleSheet.create({
  svg: {
    transform: [
      {
        // scaleX: -1,
        // scaleY: -1,
        rotate: '-90deg',
      },
    ],
  },
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

CircularProgress.propTypes = {
  // style: View.propTypes.style,
  size: PropTypes.number,
  fill: PropTypes.number.isRequired,
  // prefill: PropTypes.number,
  baseWidth: PropTypes.number,
  barWidth: PropTypes.number,
  baseRadius: PropTypes.number,
  barRadius: PropTypes.number,
  // tintColor: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  // backgroundColor: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  // tension: PropTypes.number,
  // friction: PropTypes.number
}

CircularProgress.defaultProps = {
  fill: 0,
  baseWidth: 10,
  barWidth: 8,
  baseRadius: 90,
  barRadius: 90,
  size: 200
};
