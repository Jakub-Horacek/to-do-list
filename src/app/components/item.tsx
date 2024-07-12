import "@/app/globals.css";

interface ItemProps {
  name: string;
  description: string;
}

const Item: React.FC<ItemProps> = ({ name, description }) => {
  return (
    <div className="to-do__item">
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Item;
