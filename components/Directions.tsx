type Props = {
  directions: string[];
};

const Directions: React.FC<Props> = ({ directions }: Props) => {
  return (
    <>
      <h2>Directions</h2>
      <ol>
        {directions.map((direction, index) => (
          <li key={index}>{direction}</li>
        ))}
      </ol>
    </>
  );
};

export default Directions;
