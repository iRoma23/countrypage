import { Country, CountryDetails } from "../../types";

interface Props {
  cca3List: CountryDetails["currencies"];
  countries: Country[];
}

export default function NeighborList({ cca3List, countries }: Props) {
  const neighbouringCountries = countries.filter((country) => {
    return cca3List
      .map((cca3) => cca3.toLowerCase())
      .includes(country.cca3.toLocaleLowerCase());
  });

  return (
    <div className="flex flex-wrap gap-4">
      {neighbouringCountries.map((country) => {
        return <Neighbor key={country.cca3} country={country} />;
      })}
    </div>
  );
}

function Neighbor({ country }: { country: Country }) {
  return (
    <div>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        loading="lazy"
        className="mb-2 h-16 w-[5.25rem] rounded-md object-cover"
      />
      <p className="text-xs font-bold text-white-base">{country.name.common}</p>
    </div>
  );
}
