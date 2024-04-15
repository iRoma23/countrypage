export type Country = {
  flags: Flags;
  name: Name;
  independent?: boolean;
  unMember: boolean;
  area: number;
  population: number;
  region: Region;
  subregion: string;
};

type Flags = {
  png: string;
  svg: string;
  alt: string;
};

type Name = {
  common: string;
  official: string;
  nativeName: object;
};

type Region =
  | "Americas"
  | "Europe"
  | "Africa"
  | "Asia"
  | "Oceania"
  | "Antarctic";

export enum SortFilter {
  Alphabetical = "alphabetical",
  Population = "population",
  Area = "area",
}
