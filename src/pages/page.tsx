import { useState, useMemo } from "react";
import { useActive } from "../hooks/useActive";
import { useNavigate } from "react-router-dom";
import { Country, SortFilter } from "../types";

import { capitalizeFirstLetter } from "../utils/stringUtils";

import Button from "../components/Button";
import CheckBox from "../components/CheckBox";

interface Props {
  countries: Country[];
  isLoading: boolean;
}
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

function CountryListPage({ countries, isLoading }: Props) {
  const [sortFilter, setSortFilter] = useState<SortFilter>(
    SortFilter.Population,
  );

  // Region Filter
  const [isActiveAmericas, handleToggleAmericas] = useActive(true);
  const [isActiveAntarctic, handleToggleAntarctic] = useActive(true);
  const [isActiveAfrica, handleToggleAfrica] = useActive(true);
  const [isActiveAsia, handleToggleAsia] = useActive(true);
  const [isActiveEurope, handleToggleEurope] = useActive(true);
  const [isActiveOceania, handleToggleOceania] = useActive(true);

  // Status Filter
  const [unCheckBox, setUnCheckBox] = useState(false);
  const [independentCheckBox, setIndependentCheckBox] = useState(false);

  // Search Filter
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      let filter = false;

      if (isActiveAmericas) filter = filter || country.region === "Americas";
      if (isActiveAntarctic) filter = filter || country.region === "Antarctic";
      if (isActiveAfrica) filter = filter || country.region === "Africa";
      if (isActiveAsia) filter = filter || country.region === "Asia";
      if (isActiveEurope) filter = filter || country.region === "Europe";
      if (isActiveOceania) filter = filter || country.region === "Oceania";

      const isUn = country.unMember || !unCheckBox;
      const isIndependent = country.independent || !independentCheckBox;

      filter = filter && isUn && isIndependent;

      if (!query) return filter;

      const isFound =
        country.name.common.toLowerCase().includes(query.toLowerCase()) ||
        country.region.toLowerCase().includes(query.toLocaleLowerCase()) ||
        country.subregion.toLowerCase().includes(query.toLocaleLowerCase());

      return filter && isFound;
    });
  }, [
    countries,
    isActiveAmericas,
    isActiveAntarctic,
    isActiveAfrica,
    isActiveAsia,
    isActiveEurope,
    isActiveOceania,
    unCheckBox,
    independentCheckBox,
    query,
  ]);

  const sortCountries = (): Country[] => {
    const sortedCountries = filteredCountries.sort((a, b) => {
      if (sortFilter === SortFilter.Alphabetical)
        return a.name.common.localeCompare(b.name.common);
      if (sortFilter === SortFilter.Area) return b.area - a.area;
      if (sortFilter === SortFilter.Population)
        return b.population - a.population;
      return 0;
    });

    return sortedCountries;
  };

  const handleChangeFilter = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const value = event.target.value;
    const sortFilterValue = Object.values(SortFilter).find((v) => v === value);

    if (sortFilterValue) setSortFilter(sortFilterValue);
  };

  const handleUnCheckBox = () => {
    setUnCheckBox(!unCheckBox);
  };

  const handleIndependentCheckBox = () => {
    setIndependentCheckBox(!independentCheckBox);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  return (
    <main className="bg-[#191A1C] pb-[4.75rem] lg:px-6 lg:pb-0 xl:px-[2.625rem] 2xl:px-12">
      <div className="border border-secondary bg-primary px-8 lg:relative lg:-top-[3.75rem] lg:rounded-xl 2xl:px-16">
        <header className="mb-8 flex items-center justify-between pb-1 pt-6">
          <div className="font-vietnam text-base font-semibold text-gray-base">
            Found {filteredCountries.length} countries
          </div>
          <div className="relative">
            <input
              className="h-[2.75rem] w-[21.25rem] rounded-xl bg-secondary bg-[url('./assets/Search.svg')] bg-[0.75rem] bg-no-repeat px-11 py-3 text-sm font-bold text-white-base placeholder-gray-base"
              placeholder="Search by Name, Region, Subregion"
              onChange={handleSearch}
              value={query}
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
                <Button
                  isActive={isActiveAmericas}
                  handleToogle={handleToggleAmericas}
                >
                  Americas
                </Button>
                <Button
                  isActive={isActiveAntarctic}
                  handleToogle={handleToggleAntarctic}
                >
                  Antarctic
                </Button>
                <Button
                  isActive={isActiveAfrica}
                  handleToogle={handleToggleAfrica}
                >
                  Africa
                </Button>
                <Button isActive={isActiveAsia} handleToogle={handleToggleAsia}>
                  Asia
                </Button>
                <Button
                  isActive={isActiveEurope}
                  handleToogle={handleToggleEurope}
                >
                  Europe
                </Button>
                <Button
                  isActive={isActiveOceania}
                  handleToogle={handleToggleOceania}
                >
                  Oceania
                </Button>
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
              {countries && (
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
                    {sortCountries().map((row, index) => (
                      <tr
                        key={index}
                        className="cursor-pointer text-base text-white-base hover:bg-secondary"
                        onClick={() =>
                          navigate(`/countries/${row.cca3.toLowerCase()}`)
                        }
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
                        <td className="hidden pb-2 pt-4 xl:table-cell">
                          {row.region}
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

export default CountryListPage;
