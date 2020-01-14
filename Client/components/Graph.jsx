import React from "react";
import {
  Modal,
  Button,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
  TextInput
} from "react-native";
import { Svg, Path, LinearGradient, Stop, Defs } from "react-native-svg";
import * as shape from "d3-shape";
import { scaleTime, scaleLinear, scaleQuantile } from "d3-scale";
import * as path from "svg-path-properties";

// const { Path } = Svg;

const d3 = {
  shape
};

const height = 200;
const { width } = Dimensions.get("window");
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 100;

const data = [
  { x: new Date(2020, 1, 1), y: 0 },
  { x: new Date(2020, 1, 2), y: 3 },
  { x: new Date(2020, 1, 3), y: 5 },
  { x: new Date(2020, 1, 4), y: 6 },
  { x: new Date(2020, 1, 5), y: 5 },
  { x: new Date(2020, 1, 6), y: 7 },
  { x: new Date(2020, 1, 7), y: 8 }
];

const scaleX = scaleTime()
  .domain([new Date(2020, 1, 1), new Date(2020, 1, 7)])
  .range([0, width]);
const scaleY = scaleLinear()
  .domain([0, 10])
  .range([height - verticalPadding, verticalPadding]);
const scaleLabel = scaleQuantile().domain([0, 10]).range([0, 2, 4, 6, 8]);
const line = d3.shape
  .line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);

const properties = path.svgPathProperties(line);
const lineLength = properties.getTotalLength();

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: new Animated.Value(0)
    };
  }


  cursor = React.createRef();
  label = React.createRef();

  moveCursor(value) {
    console.log(this.props.visible)
    const { x, y } = properties.getPointAtLength(lineLength - value);
    if (this.props.visible) {
      this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
    }
    const label = scaleLabel(scaleY.invert(y));
    if (this.props.visible) {
      this.label.current.setNativeProps({ text: `${label} CHF`})
    }
  }

  componentDidMount() {
    this.state.x.addListener(({ value }) => this.moveCursor(value));
    this.moveCursor(0);
  }

  render() {
    const { x } = this.state;
    const { visible, onGoBack } = this.props;
    const translateX = x.interpolate({
      inputRange: [0, lineLength],
      outputRange: [width - labelWidth, 0],
      extrapolate: 'clamp'
    });
    return (
      <Modal visible={visible}>
        <SafeAreaView style={style.root}>
          <View style={style.container}>
            <Svg {...{ width, height }}>
              <Defs>
                <LinearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="gradient"
                >
                  <Stop stopColor="#9AE7FE" offset="0%" />
                  <Stop stopColor="#FEFFFF" offset="100%" />
                </LinearGradient>
              </Defs>
              <Path
                d={line}
                fill="transparent"
                stroke="#69DDFF"
                strokeWidth="5"
              />
              <Path
                d={`${line} L ${width} ${height} L 0 ${height}`}
                fill="url(#gradient)"
              />
              <View ref={this.cursor} style={style.cursor} />
            </Svg>
            <Animated.View style={[style.label, { transform: [{ translateX }] }]}>
              <TextInput ref={this.label}/>
            </Animated.View>
            <Animated.ScrollView
              style={StyleSheet.absoluteFill}
              contentContainerStyle={{ width: lineLength * 2 }}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              bounces={false}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { x }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              horizontal
            />
          </View>
        </SafeAreaView>
        <Button title="Go Back" onPress={onGoBack} />
      </Modal>
    );
  }
}

const style = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    height,
    width
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: "#69DDFF",
    borderWidth: 2,
    backgroundColor: "white"
  },
  label: {
    backgroundColor: "lightgray",
    position: 'absolute',
    top: 0,
    left: 0,
    width: labelWidth
  }
});
