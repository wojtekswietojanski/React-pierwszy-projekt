import "./Styling/Home/home.css";
const FoodProducts = ({ elements, handleDelete }) => {
  return (
    <div className="addedElementsWrapper">
      {elements.map((element) => (
        <div className="addedElement" key={element.id} id={element.id}>
          {element.content}
          <button onClick={() => handleDelete(element.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default FoodProducts;
