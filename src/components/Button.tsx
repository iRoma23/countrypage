type Props = {
  children: string;
  isActive: boolean;
  handleToogle: () => void;
};

function Button({ children, isActive, handleToogle }: Props) {
  return (
    <button
      className={`
      rounded-xl px-3 py-1.5 text-sm font-bold
      ${isActive ? "bg-secondary text-white-base" : "bg-primary text-gray-base"}
      `}
      onClick={handleToogle}
    >
      {children}
    </button>
  );
}

export default Button;
