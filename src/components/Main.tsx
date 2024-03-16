import { useEffect, useState } from "react";
import { Country } from "../types";

import countryService from "../services/countries";

import Button from "./Button";
import CheckBox from "./CheckBox";

function Main() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(false);
        setCountries(data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    void fetchCountryList();
  }, []);

  return (
    <main className="bg-[#1A1B1D]">
      <div className="border-t border-secondary bg-primary px-8">
        <header className="flex items-center justify-between pb-1 pt-6">
          <div className="font-vietnam text-base font-semibold text-gray-base">
            Found 234 countries
          </div>
          <div className="relative">
            <input
              className="h-[2.75rem] w-[21.25rem] rounded-xl bg-secondary bg-[url('./assets/Search.svg')] bg-[0.75rem] bg-no-repeat px-11 py-3 text-sm font-bold text-white-base placeholder-gray-base"
              placeholder="Search by Name, Region, Subregion"
            />
          </div>
        </header>

        <section>
          <aside>
            <div className="mt-8">
              <label className="flex flex-col">
                <span className="text-xs font-bold text-gray-base">
                  Sort by
                </span>
                <select className="mt-2 appearance-none rounded-xl border-2 border-secondary bg-primary bg-[url('./assets/Expand_down.svg')] bg-[center_right_1rem] bg-no-repeat py-2 pl-4 text-sm text-white-base">
                  <option value="population">Population</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="area">Area</option>
                </select>
              </label>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold text-gray-base">Region</p>
              <div className="mt-2 flex gap-4">
                <Button isActive={true}>Americas</Button>
                <Button isActive={false}>Antarctic</Button>
                <Button isActive={true}>Africa</Button>
                <Button isActive={true}>Asia</Button>
                <Button isActive={true}>Europe</Button>
                <Button isActive={false}>Oceania</Button>
              </div>
            </div>

            <div className="mt-8">
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

          <div className="mt-8">
            {isLoading && <div>Loading...</div>}
            {countries &&
              countries.map((country) => (
                <div key={country.name.common}>{country.name.common}</div>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Main;
