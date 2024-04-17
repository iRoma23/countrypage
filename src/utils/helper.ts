import {
  Country,
  CountryDetails,
  CountryDetailsRawData,
  CountryRawData,
} from "../types";

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

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const toCurrency = (object: unknown): string => {
  if (!object || typeof object !== "object") return "";

  if ("name" in object) {
    if (isString(object.name)) return object.name;
  }
  return "";
};

export const parseCountryDetails = (
  country: CountryDetailsRawData,
): CountryDetails => {
  const { flags, name, languages, currencies, ...rest } = country;

  const parsedLanguages = Object.values(languages).map((l) => {
    if (isString(l)) return l;
    return "";
  });

  const parsedCurrencies = Object.values(currencies).map((currency) => {
    return toCurrency(currency);
  });

  return {
    flags: {
      png: flags.png,
      alt: flags.alt,
    },
    name: {
      common: name.common,
      official: name.official,
    },
    languages: parsedLanguages,
    currencies: parsedCurrencies,
    ...rest,
  };
};
