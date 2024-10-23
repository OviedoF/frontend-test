'use client'
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Loading from './Loading';
import styles from './CountriesList.module.css';
import Link from 'next/link';

export default function CountriesList() {
    const [countries, setCountries] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const fetchCountries = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/countries");
            const data = await response.json();
            setCountries(data);
            console.log(data);
        } catch (error) {
            enqueueSnackbar("Failed to fetch countries", { variant: "error" });
        }
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <section>
            {countries.length === 0 ? <Loading /> : (
                <ul className={styles.countries}>
                    {countries.map(country => (
                        <li key={country.countryCode}>
                            <Link href={`/countries/${country.countryCode}`} className={styles.countryLink}>
                                {country.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
