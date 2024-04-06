import { useEffect, useState } from "react";
import { Country, SortFilter } from "../types";

import countryService from "../services/countries";

import { capitalizeFirstLetter } from "../utils/stringUtils";

import Button from "./Button";
import CheckBox from "./CheckBox";

interface SortFilterOptions {
  value: SortFilter;
  label: string;
}

const sortFilterOptions: SortFilterOptions[] = Object.values(SortFilter).map(
  (v) => ({
    value: v,
    label: v.toString(),
  }),
);

function Main() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [sortFilter, setSortFilter] = useState<SortFilter>(
    SortFilter.Alphabetical,
  );

  const [unCheckBox, setUnCheckBox] = useState(false);
  const [independentCheckBox, setIndependentCheckBox] = useState(false);

  const handleUnCheckBox = () => {
    setUnCheckBox(!unCheckBox);
  };

  const handleIndependentCheckBox = () => {
    setIndependentCheckBox(!independentCheckBox);
  };

  useEffect(() => {
    const fetchCountryList = async () => {
      setIsLoading(true);
      try {
        const data = await countryService.getAll();
        setCountries(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchCountryList();
  }, []);

  const handleChangeFilter = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const value = event.target.value;
    const sortFilterValue = Object.values(SortFilter).find((v) => v === value);

    if (sortFilterValue) setSortFilter(sortFilterValue);
  };

  return (
    <main className="bg-[#191A1C] pb-[4.75rem] lg:px-6 lg:pb-0 2xl:px-12">
      <div className="border border-secondary bg-primary px-8 lg:relative lg:-top-[3.75rem] lg:rounded-xl xl:px-12 2xl:px-16">
        <header className="mb-8 flex items-center justify-between pb-1 pt-6">
          <div className="font-vietnam text-base font-semibold text-gray-base">
            Found {countries.length} countries
          </div>
          <div className="relative">
            <input
              className="h-[2.75rem] w-[21.25rem] rounded-xl bg-secondary bg-[url('./assets/Search.svg')] bg-[0.75rem] bg-no-repeat px-11 py-3 text-sm font-bold text-white-base placeholder-gray-base"
              placeholder="Search by Name, Region, Subregion"
            />
          </div>
        </header>

        <section className="lg:grid lg:grid-cols-4 lg:gap-8">
          <aside className="lg:col-start-1 lg:col-end-2">
            <div className="mb-8">
              <label className="flex flex-col">
                <span className="text-xs font-bold text-gray-base">
                  Sort by
                </span>
                <select
                  className="mt-2 max-w-[35.625rem] appearance-none rounded-xl border-2 border-secondary bg-primary bg-[url('./assets/Expand_down.svg')] bg-[center_right_1rem] bg-no-repeat py-2 pl-4 text-sm text-white-base"
                  value={sortFilter}
                  onChange={handleChangeFilter}
                >
                  {sortFilterOptions.map((option) => (
                    <option key={option.label} value={option.value}>
                      {capitalizeFirstLetter(option.label)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mb-8">
              <p className="text-xs font-bold text-gray-base">Region</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button isActive={true}>Americas</Button>
                <Button isActive={false}>Antarctic</Button>
                <Button isActive={true}>Africa</Button>
                <Button isActive={true}>Asia</Button>
                <Button isActive={true}>Europe</Button>
                <Button isActive={false}>Oceania</Button>
              </div>
            </div>

            <div className="mb-8">
              <p className="block text-xs font-bold text-gray-base">Status</p>
              <div className="flex flex-col">
                <CheckBox
                  isActive={unCheckBox}
                  handleCheckBox={handleUnCheckBox}
                >
                  Member of the United Nations
                </CheckBox>
                <CheckBox
                  isActive={independentCheckBox}
                  handleCheckBox={handleIndependentCheckBox}
                >
                  Independent
                </CheckBox>
              </div>
            </div>
          </aside>

          <article className="flex justify-center lg:col-start-2 lg:col-end-5">
            <div className="no-scrollbar h-[33.5rem] overflow-auto 2xl:h-[calc(100vh_-_15rem)]">
              {countries && !isLoading && (
                <table className="border-separate border-spacing-0">
                  <thead className="bg-current sticky top-0 border-b-2 border-secondary bg-primary">
                    <tr className="text-left text-xs font-bold text-gray-base">
                      <th className="min-w-[6.5rem] border-b-2 border-secondary pb-4">
                        Flag
                      </th>
                      <th className="min-w-[9.375rem] border-b-2 border-secondary pb-4">
                        Name
                      </th>
                      <th className="min-w-[9.375rem] border-b-2 border-secondary pb-4">
                        Population
                      </th>
                      <th className="min-w-[10.75rem] border-b-2 border-secondary pb-4">
                        Area (km²)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.map((row, index) => (
                      <tr
                        key={index}
                        className="text-base text-white-base hover:bg-secondary"
                      >
                        <td className="pb-2 pt-4">
                          <img
                            src={row.flags.png}
                            alt={row.flags.alt}
                            className="h-10 w-14 rounded-md "
                            loading="lazy"
                          />
                        </td>
                        <td className="pb-2 pt-4">{row.name.common}</td>
                        <td className="pb-2 pt-4">
                          {row.population
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                        <td className="pb-2 pt-4">
                          {row.area
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {isLoading && <div>Loading...</div>}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Main;
