// import { Country } from "../types";
import { CountryRawData } from "../types";

const baseUrl = "https://restcountries.com/v3.1";
const allCountriesParams =
  "fields=name,flags,area,population,region,subregion,independent,unMember";

const getAll = async (): Promise<CountryRawData[]> => {
  const response = await fetch(`${baseUrl}/all?${allCountriesParams}`);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  return data;
};

export default { getAll };
