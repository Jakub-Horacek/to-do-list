"use client";
import Item from "./item";
import { useState, useEffect, useCallback } from "react";

const List: React.FC = () => {
  const [items, setItems] = useState<{ id: string; name: string; completed: boolean; dueDate?: string }[]>([]);
  const [completedVisible, setCompletedVisible] = useState(true);

  const updateMetadata = useCallback(() => {
    document.title = `To-Do List (${items.length})`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", `A simple to-do list application with ${items.length} items.`);
  }, [items.length]);

  useEffect(() => {
    fetch("https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
    updateMetadata();
  }, [updateMetadata]);

  function addItem() {
    const newItem = { name: `Item ${items.length + 1}`, completed: false, dueDate: "" };
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

  function deleteItem(id: string) {
    fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${id}`, {
      method: "DELETE",
    }).then(() => setItems(items.filter((item) => item.id !== id)));
  }

  function removeAllItems() {
    if (!confirm("Are you sure you want to permanently delete all items?")) return;

    items.forEach((item) => {
      fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${item.id}`, {
        method: "DELETE",
      });
    });
    setItems([]);
  }

  function updateItem(id: string, updatedData: Partial<{ name: string; completed: boolean; dueDate?: string }>) {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updatedData } : item)));
    updateMetadata();
  }

  return (
    <div className="to-do__list-wrapper">
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
      <div className="to-do__list">
        {items
          .filter((item) => completedVisible || !item.completed)
          .map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              completed={item.completed}
              dueDate={item.dueDate}
              onDelete={deleteItem}
              onUpdate={updateItem}
            />
          ))}
      </div>
    </div>
  );
};

export default List;
