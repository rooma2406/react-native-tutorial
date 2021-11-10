import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, FlatList, AsyncStorage } from "react-native";


import SingleTodo from './components/SingleTodo';

 

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todo) return;

      setTodos([...todos, { id: Date.now(), text: todo }]); 
      setTodo("");
  };

  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native Tutorial</Text>
      <View style={styles.inputcontainer}>
      <TextInput 
        onChangeText={(text)=>setTodo(text)}
        value={todo}
        placeholder="Enter a Todo" style={styles.input}
      />
      <TouchableOpacity onPress={handleAddTodo}> 
        <Text style={styles.button}>Go</Text>
      </TouchableOpacity>
    </View>

    <View style={{ width: "100%" ,marginTop: 10 }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <SingleTodo todo={item} todos={todos} setTodos={setTodos} /> 
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
      

      <StatusBar style = "auto" />
    </View>
  );
};


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7DAD9"
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
  },
  inputcontainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    shadowColor: "black",
    backgroundColor: "white",
    elevation: 10,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  button: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 10,
  }
});