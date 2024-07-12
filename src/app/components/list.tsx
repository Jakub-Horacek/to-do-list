"use client";
import Item from "./item";
import { useState, useEffect } from "react";

const List: React.FC = () => {
  const [items, setItems] = useState([{ name: "Item 1" }]);

  function addItem() {
    setItems([...items, { name: `Item ${items.length + 1}` }]);
  }

  return (
    <div className="to-do__list center">
      <button className="to-do__button" onClick={addItem}>
        Add Item
      </button>
      {items.map((item) => (
        <Item key={item.name} name={item.name} />
      ))}
    </div>
  );
};

export default List;
