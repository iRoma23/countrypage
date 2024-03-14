type Props = {
  children: string;
  isActive: boolean;
};

function Button({ children, isActive }: Props) {
  return (
    <button
      className={`
      rounded-xl px-3 py-1.5 text-sm font-bold
      ${isActive ? "bg-secondary text-white-base" : "bg-primary text-gray-base"}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
