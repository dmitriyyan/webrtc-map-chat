type Props = {
  fontSize: string;
  text: string;
};

const Label = ({ fontSize, text }: Props) => {
  return (
    <p className="map_page_card_label" style={{ fontSize }}>
      {text}
    </p>
  );
};

export default Label;
