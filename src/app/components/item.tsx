import React, { useEffect, useState } from "react";

interface ItemProps {
  id: string;
  name: string;
  completed?: boolean;
  onDelete: (id: string) => void;
}

const Item: React.FC<ItemProps> = ({ id, name, completed = false, onDelete }) => {
  const [itemName, setName] = useState(name);
  const [itemCompleted, setCompleted] = useState(completed);
  const [actionsExpanded, setActionsExpanded] = useState(false);

  const actions = [
    { name: "Delete item", action: () => deleteItem() },
    { name: itemCompleted ? "Mark uncompleted" : "Mark completed", action: () => toggleCompleted() },
  ];

  function deleteItem() {
    fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDelete(id);
    });
  }

  function toggleCompleted() {
    setCompleted(!itemCompleted);
    fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !itemCompleted }),
    });
  }

  function updateName() {
    fetch(`https://6691473c26c2a69f6e8f3485.mockapi.io/to-do/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName }),
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
            <button key={action.name} onClick={action.action}>
              {action.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;
