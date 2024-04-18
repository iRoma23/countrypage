import { useEffect, useState } from "react";
import { Country, CountryDetails } from "../../types";

import countryService from "../../services/countries";

import { parseCountryDetails } from "../../utils/helper";
import NeighborList from "./NeighborList";

interface Props {
  countries: Country[];
}

function CountryPage({ countries }: Props) {
  const [country, setCountry] = useState<CountryDetails>();
  const cca3 = "per";

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await countryService.getByCca3(cca3);
        const parsedData = parseCountryDetails(data);
        setCountry(parsedData);
        console.log(parsedData);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchCountry();
  }, []);

  return (
    <main>
      <article className="bg-primary">
        {country && (
          <>
            <header>
              <div>
                <img src={country.flags.png} alt={country.flags.alt} />
              </div>
              <div>
                <h2>{country.name.common}</h2>
                <h3>{country.name.official}</h3>
              </div>
              <div>
                <div>
                  <span>Population</span>
                  <div></div>
                  <span>
                    {country.population
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </div>
                <div>
                  <span>Area(km²)</span>
                  <div></div>
                  <span>
                    {country.area
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </div>
              </div>
            </header>

            <section>
              <div className="flex justify-between">
                <div>Capital</div>
                <div>{country.capital}</div>
              </div>
              <div>
                <div>Subregion</div>
                <div>{country.subregion}</div>
              </div>
              <div>
                <div>Language</div>
                <div>
                  {country.languages.map((lang, i) =>
                    i === 0 ? lang : ", " + lang,
                  )}
                </div>
              </div>
              <div>
                <div>Currencies</div>
                <div>
                  {country.currencies.map((currency, i) =>
                    i === 0 ? currency : ", " + currency,
                  )}
                </div>
              </div>
              <div>
                <div>Continents</div>
                <div>{country.continents.map((continent) => continent)}</div>
              </div>
              <div>
                <div>Neighbouring Countries</div>
                <NeighborList
                  cca3List={country.borders}
                  countries={countries}
                />
              </div>
            </section>
          </>
        )}
      </article>
    </main>
  );
}

export default CountryPage;
