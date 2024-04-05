type Props = {
  children: string;
  isActive: boolean;
  handleCheckBox: () => void;
};

function CheckBox({ children, isActive, handleCheckBox }: Props) {
  return (
    <label className="mt-3 flex w-fit cursor-pointer items-center text-sm font-bold text-white-base">
      <input
        type="checkbox"
        className={`mr-3 size-6 appearance-none rounded-md border-2 border-gray-base bg-primary bg-center checked:border-blue-base checked:bg-blue-base
        ${isActive ? "bg-[url('./assets/Done_round.svg')]" : ""}`}
        onChange={handleCheckBox}
        checked={isActive}
      />
      {children}
    </label>
  );
}

export default CheckBox;
