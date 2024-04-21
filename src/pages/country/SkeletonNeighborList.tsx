function SkeletonNeighborList() {
  return (
    <div className="flex flex-wrap gap-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <div className="mb-2 h-16 w-[5.25rem] rounded-md bg-secondary" />
            <div className="text-xs font-bold text-white-base" />
          </div>
        ))}
    </div>
  );
}

export default SkeletonNeighborList;
