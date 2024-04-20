import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Country } from "./types";

import countryService from "./services/countries";

import { parseCountries } from "./utils/helper";

import Header from "./components/Header";
import CountryListPage from "./pages/page";
import CountryPage from "./pages/countries/page";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountryList = async () => {
      setIsLoading(true);
      try {
        const data = await countryService.getAll();
        const parsedData = parseCountries(data);
        setCountries(parsedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchCountryList();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/countries/:cca3"
          element={<CountryPage countries={countries} />}
        />
        <Route
          path="/"
          element={
            <CountryListPage countries={countries} isLoading={isLoading} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
