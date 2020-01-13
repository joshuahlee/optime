import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal } from "react-native";

const AddCard = ({ onCardSubmit, onCancelAdd, visible }) => {
  const [habitChange, setHabitChange] = useState("");
  const [desiredEffect, setDesiredEffect] = useState("");

  const handleHabitInputChange = enteredText => {
    setHabitChange(enteredText);
  };

  const handleEffectInputChange = enteredText => {
    setDesiredEffect(enteredText);
  };

  const handleOnAdd = () => {
    onCardSubmit(habitChange, desiredEffect);
    setHabitChange("");
    setDesiredEffect("");
  };

  const handleOnCancel = () => {
    onCancelAdd();
    setHabitChange("");
    setDesiredEffect("");
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.newCardContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Habit Change"
            style={styles.input}
            onChangeText={handleHabitInputChange}
            value={habitChange}
          />
          <TextInput
            placeholder="Desired Effect"
            style={styles.input}
            onChangeText={handleEffectInputChange}
            value={desiredEffect}
          />
        </View>
        <View style={styles.button}>
          <Button title="Cancel" color="red" onPress={handleOnCancel} />
          <Button title="Add Card" onPress={handleOnAdd} />
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
    justifyContent: "space-between",
    width: '60%'
  }
});

export default AddCard;
