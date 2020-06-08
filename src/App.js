import React from "react";
import "./styles.css";

let localItem = [{ number: 0, name: "blank" }];

const itemAsString = localStorage.getItem("items");
if (itemAsString) {
  localItem = JSON.parse(itemAsString);
}

export default function App() {
  //▓▓▓ The shopping list:
  const [newItem, setNewItem] = React.useState(""); //const for input
  const [items, setItems] = React.useState(localItem); //const for List
  const [itemNumber, setItemNumber] = React.useState(0); //const to Give Item an ID/number
  //░░░

  //▓▓▓ Add an item to the list:
  //Overrides the input
  function addItemInput(event) {
    const inputValue = event.target;
    const newValue = inputValue.value;
    setNewItem(newValue);
  }
  //Adds a new item to the list if there is a value
  function addItem() {
    if (newItem !== "") {
      const newItems = [...items, { number: itemNumber, name: newItem }];
      setItemNumber(itemNumber + 1);

      const itemsAsString = JSON.stringify(newItems);
      localStorage.setItem("items", itemsAsString);

      setItems(newItems);
      setNewItem(""); //resets input
    }
  }
  //░░░

  //▓▓▓ Delete an Item from the list:
  function deleteItem(item) {
    const filteredItems = items.filter(function(idk) {
      return idk !== item;
    });

    const itemsAsString = JSON.stringify(filteredItems);
    localStorage.setItem("items", itemsAsString);

    setItems(filteredItems);
  }
  //░░░

  //Render the Shopping List
  return (
    <div className="App" id="grid">
      <div className="spacer" />
      <h1>Shopping List</h1>
      <div className="spacer" />

      <div className="spacer" />
      <div id="content">
        <input
          placeholder="I need to buy..."
          type="text"
          id="listInput"
          value={newItem}
          onChange={addItemInput}
        />
        <button onClick={addItem}>+</button>
        {/*instead of click > hit enter?!*/}

        <ul>
          {items.map(item => {
            return (
              <li>
                <span> {item.name} </span>
                <button
                  onClick={function() {
                    deleteItem(item);
                  }}
                >
                  🗙
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
//export default App;
