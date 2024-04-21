import SkeletonNeighborList from "./SkeletonNeighborList";
import SkeletonRow from "./SkeletonRow";

function SkeletonCountry() {
  return (
    <>
      <header className="relative -top-12 mb-10 px-11">
        <div className="mb-6 flex justify-center">
          <div className="h-[12.25rem] w-[16.375rem] rounded-xl bg-secondary" />
        </div>
        <div className="mb-9 flex animate-pulse flex-col items-center ">
          <div className="my-1 h-10 w-24 rounded-xl bg-secondary" />
          <div className="my-1 h-4 w-64 rounded-md bg-secondary" />
        </div>
        <div className="flex animate-pulse justify-between">
          <div className="flex h-14 w-72 rounded-xl bg-secondary py-2"></div>
          <div className="flex h-14 w-60 rounded-xl bg-secondary py-2"></div>
        </div>
      </header>

      <section className="relative -top-12 animate-pulse">
        <SkeletonRow rows={5} />
        <div className="border-t border-secondary px-5">
          <div className="my-6 h-[1.3125rem] w-44 rounded-lg bg-secondary" />
          <SkeletonNeighborList />
        </div>
      </section>
    </>
  );
}

export default SkeletonCountry;
