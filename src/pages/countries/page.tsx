import { useEffect, useState } from "react";
import { Country, CountryDetails } from "../../types";

import countryService from "../../services/countries";

import { parseCountryDetails } from "../../utils/helper";
import { toPointThousand } from "../../utils/numberUtils";
import { arrayToString } from "../../utils/stringUtils";

import NeighborList from "./NeighborList";
import Row from "./Row";

interface Props {
  countries: Country[];
}

function CountryPage({ countries }: Props) {
  const [country, setCountry] = useState<CountryDetails>();
  const [isLoading, setIsLoading] = useState(false);

  const cca3 = "chn";

  useEffect(() => {
    const fetchCountry = async () => {
      setIsLoading(true);
      try {
        const data = await countryService.getByCca3(cca3);
        const parsedData = parseCountryDetails(data);
        setCountry(parsedData);
        console.log(parsedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCountry();
  }, []);

  return (
    <main className="flex justify-center bg-[#17181A] pb-20">
      <article className="max-w-[45rem] border-b border-secondary bg-primary pb-12 xl:relative xl:-top-[3.75rem] xl:rounded-2xl xl:border">
        {country && (
          <>
            <header className="relative -top-12 mb-10 px-11">
              <div className="mb-6 flex justify-center">
                <img
                  src={country.flags.png}
                  alt={country.flags.alt}
                  loading="lazy"
                  className="h-[12.25rem] w-[16.375rem] rounded-xl object-cover"
                />
              </div>
              <div className="mb-9 flex flex-col items-center">
                <h1 className="text-xl font-semibold text-white-base">
                  {country.name.common}
                </h1>
                <h2 className="text-base font-semibold text-white-base">
                  {country.name.official}
                </h2>
              </div>
              <div className="flex justify-between">
                <div className="flex rounded-xl bg-secondary py-2">
                  <span className="m-auto px-5 py-2 text-sm font-bold text-white-base">
                    Population
                  </span>
                  <div className="border-r"></div>
                  <span className="m-auto px-5 py-2 text-base font-semibold text-white-base">
                    {toPointThousand(country.population)}
                  </span>
                </div>
                <div className="flex rounded-xl bg-secondary py-2">
                  <span className="m-auto px-5 py-2 text-sm font-bold text-white-base">
                    Area(km²)
                  </span>
                  <div className="border-r"></div>
                  <span className="m-auto px-5 py-2 text-base font-semibold text-white-base">
                    {toPointThousand(country.area)}
                  </span>
                </div>
              </div>
            </header>

            <section className="relative -top-12">
              <Row field="Capital" value={arrayToString(country.capital)} />
              <Row field="Subregion" value={country.subregion} />
              <Row field="Language" value={arrayToString(country.languages)} />
              <Row
                field="Currencies"
                value={arrayToString(country.currencies)}
              />
              <Row
                field="Continents"
                value={arrayToString(country.continents)}
              />
              <div className="border-t border-secondary px-5">
                <div className="py-6 text-sm font-bold text-gray-base">
                  Neighbouring Countries
                </div>
                <NeighborList
                  cca3List={country.borders}
                  countries={countries}
                />
              </div>
            </section>
          </>
        )}
        {isLoading && <div>Loading...</div>}
      </article>
    </main>
  );
}

export default CountryPage;
