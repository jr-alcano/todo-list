import React, {useState} from 'react' //import react and useState, useState lets variables maintain state during re-renders
import axios from 'axios'

function App() {
  
  const [list, setList] = useState ([]); //list variable, useState returns the state of 'list' and the function that updates it, 'setList'
  const [input, setInput] = useState(""); //input variable, useState returns 'input, and function 'setInput'

  const fetchImage = async (query) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const engineId = process.env.REACT_APP_GOOGLE_ENGINE_ID;
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&q=${encodeURIComponent(query)}&searchType=image`;
  
    try {
      const response = await axios.get(url);
      const imageUrl = response.data.items[0].link; // Get the first image's link
      return imageUrl;
    } catch (error) {
      console.error("Failed to fetch image:", error);
      return null; // or a default image URL
    }
  };

  const addTodo = async (todo) => { 
    const imageUrl = await fetchImage(todo)

    const newTodo = {
      id: Math.random(),
      todo: todo, // first todo is the property of the javascript object, second is the value assigned to that property
      image: imageUrl
    }

    setList([...list, newTodo])

    setInput("")
  }

  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id)
    setList(newList)
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type = "text"
        value = {input}
        onChange = {(e) => setInput(e.target.value)}
        />
      <button onClick = {() => addTodo(input)} >Add</button>
      <ul>
       {list.map ((todo) => (
        <li key = {todo.id}>
          {todo.todo}
          {todo.image && <img src={todo.image} alt={todo.todo} />}
          <button onClick = {() => deleteTodo(todo.id)}>&times;</button>
        </li>
       ))}
      </ul>
    </div>
  );
}

export default App
