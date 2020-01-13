import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Graph from "./Graph";
import EditCard from "./EditCard";

const CardList = ({ input, onCardEdit }) => {
  const [isGraphMode, setIsGraphMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOnBack = () => {
    setIsGraphMode(false);
  };

  const handleOnUpdate = (key, habitChange, desiredEffect) => {
    setIsEditMode(false);
    onCardEdit(key, habitChange, desiredEffect);
  };

  return (
    <View style={styles.cardWrapper}>
      <Graph visible={isGraphMode} onGoBack={handleOnBack} />
      <EditCard visible={isEditMode} input={input} onUpdate={handleOnUpdate} />
      <View style={styles.card}>
        <View style={styles.icons}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsGraphMode(true)}
          >
            <Entypo name={"bar-graph"} size={15} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsEditMode(true)}
          >
            <FontAwesome name={"edit"} size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.textField}>
          <Text style={styles.textSyle}>Habit Change: </Text>
          <Text>{input.value[0]}</Text>
        </View>
        <View style={styles.textField}>
          <Text style={styles.textSyle}>Desired Effect: </Text>
          <Text>{input.value[1]}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    width: "90%",
    padding: 10,
    backgroundColor: "#EAF2E3",
    marginTop: 5,
    borderRadius: 10
  },
  cardWrapper: {
    alignItems: "center"
  },
  textField: {
    flexDirection: "row",
    marginTop: 15
  },
  textSyle: {
    fontWeight: "700"
  },
  icons: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default CardList;
