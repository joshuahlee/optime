import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Feather } from "@expo/vector-icons";

const Header = ({ setIsAddMode }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.5}>
        <Feather name={"menu"} size={25}/>
      </TouchableOpacity>
      <Text style={styles.headerItems}>Opti·Me</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setIsAddMode(true)} >
        <Feather name={"plus"} size={25}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 90,
    paddingTop: 36,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#C9F9FF"
  },
  headerItems: {
    justifyContent: "center",
    fontSize: 20
  }
});

export default Header;
