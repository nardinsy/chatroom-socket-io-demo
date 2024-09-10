type CardProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  children?: React.ReactNode;
};

const Card = ({ className, style, children }: CardProps) => {
  return (
    <div
      className={`relative m-0 rounded-md overflow-hidden bg-white ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
