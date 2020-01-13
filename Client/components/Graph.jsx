import React from "react";
import {
  Modal,
  Button,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Svg, Path, LinearGradient, Stop, Defs } from "react-native-svg";
import * as shape from "d3-shape";
import { scaleTime, scaleLinear } from "d3-scale";

// const { Path } = Svg;

const d3 = {
  shape
};

const height = 200;
const { width } = Dimensions.get("window");
const verticalPadding = 5;

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
const line = d3.shape
  .line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);

const Graph = ({ visible, onGoBack }) => {
  return (
    <Modal visible={visible}>
      <SafeAreaView style={style.root}>
        <View style={style.container}>
          <Svg {...{ width, height }}>
            <Defs>
              <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
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
            <View style={style.cursor} />
          </Svg>
          <Button title="Go Back" onPress={onGoBack} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    height,
    width
  },
  cursor: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderColor: "#69DDFF",
    borderWidth: 2,
    backgroundColor: "white"
  }
});

export default Graph;
