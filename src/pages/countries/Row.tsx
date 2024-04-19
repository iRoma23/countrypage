interface Props {
  field: string;
  value: string;
}

function Row({ field, value }: Props) {
  return (
    <div className="flex justify-between border-t border-secondary px-5">
      <div className="py-6 text-sm font-bold text-gray-base">{field}</div>
      <div className="py-6 text-sm font-bold text-white-base">{value}</div>
    </div>
  );
}

export default Row;
