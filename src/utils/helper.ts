import { Country, CountryRawData } from "../types";

export const parseCountries = (
  countriesRawData: CountryRawData[],
): Country[] => {
  const countries = countriesRawData.map((country) => {
    const { name, flags, ...rest } = country;

    return {
      flags: {
        png: flags.png,
        alt: flags.alt,
      },
      name: {
        common: name.common,
        official: name.official,
      },
      ...rest,
    };
  });

  return countries;
};
