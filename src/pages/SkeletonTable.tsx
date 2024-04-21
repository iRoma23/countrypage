function SkeletonTable() {
  return (
    <table className="border-separate border-spacing-0">
      <thead className="bg-current sticky top-0 border-b-2 border-secondary bg-primary">
        <tr className="text-left text-xs font-bold text-gray-base">
          <th className="w-[6.25rem] border-b-2 border-secondary pb-4 lg:w-[7.875rem] xl:w-[6.25rem]">
            Flag
          </th>
          <th className="w-[9.25rem] border-b-2 border-secondary pb-4 lg:w-[11.875rem] xl:w-[12.25rem]">
            Name
          </th>
          <th className="w-[9.25rem] border-b-2 border-secondary pb-4 lg:w-[12.875rem] xl:w-[12.25rem]">
            Population
          </th>
          <th className="w-[11.5rem] border-b-2 border-secondary pb-4 lg:w-[9.875rem] xl:w-[12.25rem]">
            Area (km²)
          </th>
          <th className="hidden border-b-2 border-secondary xl:table-cell xl:w-[10.75rem]">
            Region
          </th>
        </tr>
      </thead>
      <tbody>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="pb-2 pt-4">
                <div className="h-10 w-14 rounded-md bg-secondary" />
              </td>
              <td className="pb-2 pt-4">
                <div className="h-4 w-24 rounded-md bg-secondary" />
              </td>
              <td className="pb-2 pt-4">
                <div className="h-4 w-24 rounded-md bg-secondary" />
              </td>
              <td className="pb-2 pt-4">
                <div className="h-4 w-24 rounded-md bg-secondary" />
              </td>
              <td className="hidden pb-2 pt-4 xl:table-cell">
                <div className="h-4 w-24 rounded-md bg-secondary" />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default SkeletonTable;
