// import { Country } from "../types";
import { CountryDetailsRawData, CountryRawData } from "../types";

const baseUrl = "https://restcountries.com/v3.1";
const allCountriesParams =
  "fields=name,flags,area,population,region,subregion,independent,unMember";
const countryParams =
  "fields=name,capital,subregion,languages,currencies,continents,borders,population,area,flags";

const getAll = async (): Promise<CountryRawData[]> => {
  const response = await fetch(`${baseUrl}/all?${allCountriesParams}`);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  return data;
};

const getByCca3 = async (cca3: string): Promise<CountryDetailsRawData> => {
  const response = await fetch(`${baseUrl}/alpha/${cca3}?${countryParams}`);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  return data;
};

export default { getAll, getByCca3 };
