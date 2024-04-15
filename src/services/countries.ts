import { Country } from "../types";

const url =
  "https://restcountries.com/v3.1/all?fields=name,flags,area,population,region,subregion,independent,unMember";

const getAll = async (): Promise<Country[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  return data;
};

export default { getAll };
