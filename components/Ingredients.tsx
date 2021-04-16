type Props = {
  ingredients: string[];
};

const Ingredients: React.FC<Props> = ({ ingredients }: Props) => {
  return (
    <>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </>
  );
};

export default Ingredients;
