import React, { useState } from "react";

interface ItemProps {
  id: string;
  name: string;
  completed?: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedData: Partial<{ name: string; completed: boolean }>) => void;
}

const Item: React.FC<ItemProps> = ({ id, name, completed = false, onDelete, onUpdate }) => {
  const [itemName, setName] = useState(name);
  const [itemCompleted, setCompleted] = useState(completed);
  const [actionsExpanded, setActionsExpanded] = useState(false);

  const actions = [
    { name: "Delete item", action: () => deleteItem() },
    { name: itemCompleted ? "Mark uncompleted" : "Mark completed", action: () => toggleCompleted() },
  ];

  // Delete the item
  function deleteItem() {
    fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDelete(id);
    });
  }

  // Toggle the completed status of the item
  function toggleCompleted() {
    const newCompletedStatus = !itemCompleted;
    setCompleted(newCompletedStatus);
    fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: newCompletedStatus }),
    }).then(() => {
      onUpdate(id, { completed: newCompletedStatus });
    });
  }

  // Update the item's name
  function updateName() {
    fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName }),
    }).then(() => {
      onUpdate(id, { name: itemName });
    });
  }

  return (
    <div className="to-do__item">
      <div className={actionsExpanded ? "item__content item__content--expanded" : "item__content"}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setName(e.target.value)}
          onBlur={updateName}
          className={itemCompleted ? "item__name item__name--completed" : "item__name"}
        />
        <button className="to-do__action-expand" onClick={() => setActionsExpanded(!actionsExpanded)}>
          ⋮
        </button>
      </div>
      {actionsExpanded && (
        <div className="item__actions">
          {actions.map((action) => (
            <button
              key={action.name}
              onClick={action.action}
              className={action.name.toLowerCase().includes("delete") ? "item__action item__action--danger" : "item__action"}
            >
              {action.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;
