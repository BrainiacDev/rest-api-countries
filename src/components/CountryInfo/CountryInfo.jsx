import React, { useState, useEffect } from 'react'
import { apiURL } from '../Api/api';
import { Link, useParams } from 'react-router-dom';


const CountryInfo = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, seterror] = useState("");

    const { countryName } = useParams();

    useEffect(() => {
        const getCountriesByName = async () => {
            try {
                const res = await fetch(`${apiURL}/name/${countryName}`);
                if (!res.ok) throw new Error("Could not found!")

                const data = await res.json();

                setCountries(data);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                seterror(error.message)

            }
        };
        getCountriesByName();
    }, [countryName])

    return (
        <div className="country__info__wrapper">
            <button>
                <Link to="/">Back</Link>
            </button>

            {isLoading && !error && <h4>Loading........</h4>}
            {error && !isLoading && { error }}

            {countries.map((country, index) => (
                <div className="country__info__container" key={index}>
                    <div className="country__info-img">
                        <img src={country.flags.png} alt="" />
                    </div>

                    <div className="country__info">
                        <h3>{country.name.common}</h3>

                        <div className="country__info-left">
                            <h5>
                                Population:
                                <span>
                                    {new Intl.NumberFormat().format(country.population)}
                                </span>
                            </h5>
                            <h5>
                                Region: <span>{country.region}</span>
                            </h5>
                            <h5>
                                Sub Region: <span>{country.subregion}</span>
                            </h5>
                            <h5>
                                Capital: <span>{country.capital}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CountryInfo