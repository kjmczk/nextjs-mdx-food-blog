type Props = {
  tips: string[];
};

const Tips: React.FC<Props> = ({ tips }: Props) => {
  return (
    <>
      <h2>Tips</h2>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </>
  );
};

export default Tips;
