function SkeletonRow({ rows }: { rows: number }) {
  return Array(rows)
    .fill(0)
    .map((_row, i) => (
      <div
        key={i}
        className="flex justify-between border-t border-secondary px-5"
      >
        <div className="my-6 h-[1.3125rem] w-[4.5rem] rounded-lg bg-secondary" />
        <div className="my-6 h-[1.3125rem] w-24 rounded-lg bg-secondary" />
      </div>
    ));
}

export default SkeletonRow;
