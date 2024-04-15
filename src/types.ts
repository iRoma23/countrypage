export enum SortFilter {
  Alphabetical = "alphabetical",
  Population = "population",
  Area = "area",
}

type Region =
  | "Americas"
  | "Europe"
  | "Africa"
  | "Asia"
  | "Oceania"
  | "Antarctic";

type FlagsRawData = {
  png: string;
  svg: string;
  alt: string;
};

type NameRawData = {
  common: string;
  official: string;
  nativeName: object;
};

interface BaseCountryRawData {
  flags: FlagsRawData;
  name: NameRawData;
  area: number;
  population: number;
  subregion: string;
}

export interface CountryRawData extends BaseCountryRawData {
  independent?: boolean;
  unMember: boolean;
  region: Region;
}

type Flags = {
  png: string;
  alt: string;
};

type Name = {
  common: string;
  official: string;
};

interface BaseCountry {
  flags: Flags;
  name: Name;
  area: number;
  population: number;
  subregion: string;
}

export interface Country extends BaseCountry {
  independent?: boolean;
  unMember: boolean;
  region: Region;
}
