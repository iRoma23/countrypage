export type Country = {
  flags: Flags;
  name: Name;
  independent: boolean;
  unMember: boolean;
  area: number;
  population: number;
};

type Flags = {
  png: string;
  svg: string;
  alt: string;
};

type Name = {
  common: string;
  official: string;
  nativeName: NativeName;
};

type NativeName = {
  ell: Ell;
  tur: Tur;
};

type Ell = {
  official: string;
  common: string;
};

type Tur = {
  official: string;
  common: string;
};

export enum SortFilter {
  Alphabetical = "alphabetical",
  Population = "population",
  Area = "area",
}
