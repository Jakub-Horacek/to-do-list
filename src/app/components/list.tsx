import "@/app/globals.css";
import Item from "./item";

const List: React.FC = () => {
  return (
    <div className="to-do__list">
      <Item name="Item 1" description="Description 1"></Item>
    </div>
  );
};

export default List;
