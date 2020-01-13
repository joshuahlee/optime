import React, { useState } from "react";
import { Modal, StyleSheet, View, Button, TextInput } from "react-native";

const EditCard = ({ visible, onUpdate, input }) => {
  const [habitChange, setHabitChange] = useState(`${input.value[0]}`);
  const [desiredEffect, setDesiredEffect] = useState(`${input.value[1]}`);

  const handleHabitInputChange = enteredText => {
    setHabitChange(enteredText);
  };

  const handleEffectInputChange = enteredText => {
    setDesiredEffect(enteredText);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.newCardContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={habitChange} onChangeText={handleHabitInputChange}/>
          <TextInput style={styles.input} value={desiredEffect} onChangeText={handleEffectInputChange}/>
        </View>
        <View style={styles.button}>
          <Button title="Update" color="#69DDFF" onPress={() => onUpdate(input.key, habitChange, desiredEffect)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  newCardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "75%"
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%"
  }
});

export default EditCard;
