import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CardList from "./components/CardList";
import AddCard from "./components/AddCard";
import Header from "./components/Header";

export default function App() {
  const [cards, setCards] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const handleCardSubmit = (habitChange, desiredEffect) => {
    let enteredCard = {
      key: Math.random().toString(),
      value: [habitChange, desiredEffect]
    };
    setCards(cards => [enteredCard, ...cards]);
    setIsAddMode(false);
  };

  const handleCardEdit = (key, changedHabit, changedEffect) => {
    let newCards = cards.filter(card => card.key !== key);
    let updatedCard = {
      key: key,
      value: [changedHabit, changedEffect]
    }
    setCards(() => [updatedCard, ...newCards])
  };

  const handleCancelAdd = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Header setIsAddMode={setIsAddMode} />
      <AddCard
        visible={isAddMode}
        onCardSubmit={handleCardSubmit}
        onCancelAdd={handleCancelAdd}
      />
      <FlatList
        data={cards}
        renderItem={itemData => (
          <CardList input={itemData.item} onCardEdit={handleCardEdit} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
