"use client";
import Item from "./item";
import { useState, useEffect } from "react";

const List: React.FC = () => {
  const [items, setItems] = useState<{ id: string; name: string; completed: boolean }[]>([]);
  const [completedVisible, setCompletedVisible] = useState(true);

  // Fetch items from the API when the component mounts
  useEffect(() => {
    fetch("https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  // Add a new item
  function addItem() {
    const newItem = { name: `Item ${items.length + 1}`, completed: false };
    fetch("https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => setItems([...items, data]));
  }

  // Delete an item by its ID
  function deleteItem(id: string) {
    fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${id}`, {
      method: "DELETE",
    }).then(() => setItems(items.filter((item) => item.id !== id)));
  }

  // Remove all items
  function removeAllItems() {
    if (!confirm("Are you sure you want to permanently delete all items?")) return;

    items.forEach((item) => {
      fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${item.id}`, {
        method: "DELETE",
      });
    });
    setItems([]);
  }

  // Update an item in the state
  function updateItem(id: string, updatedData: Partial<{ name: string; completed: boolean }>) {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updatedData } : item)));
  }

  return (
    <div className="to-do__list center">
      <div className="list__actions">
        <button className="list__action" onClick={addItem}>
          Add Item
        </button>
        <button className="list__action" onClick={() => setCompletedVisible(!completedVisible)}>
          {completedVisible ? "Hide Completed" : "Show Completed"}
        </button>
        <button className="list__action list__action--danger" onClick={removeAllItems}>
          Clear List
        </button>
      </div>
      {items
        .filter((item) => completedVisible || !item.completed)
        .map((item) => (
          <Item key={item.id} id={item.id} name={item.name} completed={item.completed} onDelete={deleteItem} onUpdate={updateItem} />
        ))}
    </div>
  );
};

export default List;
