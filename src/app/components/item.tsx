import React, { useState, useEffect } from "react";

interface ItemProps {
  name: string;
  completed?: boolean;
}

const Item: React.FC<ItemProps> = ({ name, completed = false }) => {
  const [itemName, setName] = useState(name);
  const [itemCompleted, setCompleted] = useState(completed);
  const [actionsExpanded, setActionsExpanded] = useState(false);

  const actions = [
    { name: "Delete item", action: () => deleteItem() },
    { name: itemCompleted ? "Mark uncompleted" : "Mark completed", action: () => toggleCompleted() },
  ];

  function deleteItem() {
    // This is a placeholder function. We'll implement this later.
  }

  function toggleCompleted() {
    setCompleted(!itemCompleted);
  }

  return (
    <div className="to-do__item">
      <div className={actionsExpanded ? "item__content item__content--expanded" : "item__content"}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setName(e.target.value)}
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
