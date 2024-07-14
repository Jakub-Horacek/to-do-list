import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck, faXmark, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "@/app/styles/animations.css";

interface ItemProps {
  id: string;
  name: string;
  completed?: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedData: Partial<{ name: string; completed: boolean }>) => void;
}

const Item: React.FC<ItemProps> = ({ id, name, completed = false, onDelete, onUpdate }) => {
  const isMobile = window.innerWidth < 768;
  const [itemName, setName] = useState(name);
  const [itemCompleted, setCompleted] = useState(completed);
  const [actionsExpanded, setActionsExpanded] = useState(false);
  const [animation, setAnimation] = useState("slide-out");

  const actions = [
    { name: itemCompleted ? "Mark uncompleted" : "Mark completed", icon: itemCompleted ? faXmark : faCheck, action: () => toggleCompleted() },
    { name: "Delete item", icon: faTrashCan, action: () => deleteItem() },
  ];

  useEffect(() => {
    function initCssVariables() {
      const root = document.documentElement;

      const actionWidth = getComputedStyle(root).getPropertyValue("--action-width");
      const actionWidthNumber = Number(actionWidth.replace("px", ""));

      const actionsWidth = `${(actionWidthNumber + 1) * actions.length}px`;
      root.style.setProperty("--actions-width", actionsWidth);
    }

    if (isMobile) {
      setAnimation("");
    }

    initCssVariables();
  }, [isMobile, actions.length]);

  const toggleExpanded = () => {
    if (isMobile) {
      setActionsExpanded(!actionsExpanded);
      return;
    }

    if (actionsExpanded) {
      setAnimation("slide-out");
      setTimeout(() => {
        setActionsExpanded(false);
      }, 500);
    } else {
      setActionsExpanded(true);
      setTimeout(() => {
        setAnimation("slide-in");
      }, 100);
    }
  };

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
        {actionsExpanded && (
          <span className={`item__actions ${animation}`}>
            {actions.map((action) => (
              <button
                key={action.name}
                onClick={action.action}
                className={action.name.toLowerCase().includes("delete") ? "item__action item__action--danger" : "item__action"}
                title={action.name}
              >
                <span className="action__name">{action.name}</span>
                <FontAwesomeIcon icon={action.icon} className="action__icon" />
              </button>
            ))}
          </span>
        )}
        <button className="to-do__action-expand" onClick={() => toggleExpanded()}>
          <span className="action__name">Actions</span>
          <FontAwesomeIcon icon={faAngleLeft} className={actionsExpanded ? "expander__icon expander__icon--expanded" : "expander__icon"} />
        </button>
      </div>
    </div>
  );
};

export default Item;
