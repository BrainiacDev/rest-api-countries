import React, { useEffect, useState } from 'react'
import { apiURL } from "../Api/api";

import SearchInput from "../Search/SearchInput";
import FilterCountry from "../FilterCountry/FilterCountry";

import { Link } from 'react-router-dom';

const AllCountries = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, seterror] = useState("");

    const getAllCountries = async () => {
        try {
            const res = await fetch(`${apiURL}/all`);

            if (!res.ok) throw new Error("Something went wrong!");

            const data = await res.json();
            // console.log(data);

            setCountries(data);

            setIsLoading(false);
        } catch (error) {
            // console.log(error);
            setIsLoading(false);
            seterror(error.message);
        }
    };

    const getCountriesByName = async (countryName) => {
        if (countryName !== "") {
            try {
                const res = await fetch(`${apiURL}/name/${countryName}`);
                if (!res.ok) throw new Error("Not found any country");

                const data = await res.json();
                setCountries(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                seterror(error.message)

            }
        }
    };

    const getCountriesByRegion = async (regionName) => {
        if (regionName !== "") {
            try {
                const res = await fetch(`${apiURL}/region/${regionName}`);

                if (!res.ok) throw new Error("Failed........");

                const data = await res.json();
                setCountries(data);

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                seterror(error.message)
            }
        } else {
            getAllCountries();
        }
    }

    useEffect(() => {
        getAllCountries();
    }, []);

    return (
        <div className='all__country__wrapper'>
            <div className="country__top">
                <div className="search">
                    <SearchInput onSearch={getCountriesByName} />
                </div>

                <div className="filter">
                    <FilterCountry onSelect={getCountriesByRegion} />
                </div>
            </div>

            <div className="country__bottom">
                {isLoading && !error && <h4 style={{ color: 'goldenrod' }}>Loading.......</h4>}
                {error && !isLoading && <h4 style={{ color: 'red' }}>{error}</h4>}

                {
                    countries.map((country, index) => (
                        <Link key={index} to={`/country/${country.name.common}`}>
                            <div className="country__card">
                                <div className="country__img">
                                    <img src={country.flags.png} alt="country flag" />
                                </div>

                                <div className="country__data">
                                    <h3>{country.name.common}</h3>
                                    <h6>
                                        Population:
                                        {new Intl.NumberFormat().format(country.population)}
                                    </h6>
                                    <h6>Region: {country.region}</h6>
                                    <h6>Capital: {country.capital}</h6>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>

        </div>
    )
}

export default AllCountries