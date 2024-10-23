'use client'
import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './CountriesList.module.css'
import Link from 'next/link';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

export default function CountryInfo({ code }) {
    const [countryInfo, setCountryInfo] = useState(null);
    const [graphData, setGraphData] = useState(null);

    const fetchCountryInfo = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/country/${code}`);
            const data = await response.json();
            setCountryInfo(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const setData = () => {
        if (!countryInfo || !countryInfo.population || !countryInfo.population.populationCounts) return;

        const labels = countryInfo.population.populationCounts.map(entry => entry.year);
        const data = countryInfo.population.populationCounts.map(entry => entry.value);

        const formattedData = {
            labels: labels,
            datasets: [
                {
                    label: 'Population',
                    data: data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        };

        setGraphData(formattedData);
    };

    useEffect(() => {
        fetchCountryInfo();
    }, []);

    useEffect(() => {
        if (countryInfo) {
            setData();
        }
    }, [countryInfo]);

    if (!countryInfo) {
        return <Loading />;
    }

    return (
        <section style={{ padding: '50px' }}>
            <h1 style={{ textAlign: 'center' }}>{countryInfo.officialName}</h1>
            <h3 style={{ textAlign: 'center', marginTop: 20 }}>{countryInfo.region}</h3>

            {countryInfo.flag && (
                <img
                    src={countryInfo.flag}
                    alt={`Flag of ${countryInfo.officialName}`}
                    style={{
                        display: 'block',
                        margin: '30px auto',
                        maxWidth: '500px',
                    }}
                />
            )}

            <section style={{ marginTop: 50 }}>
                <h3>Population</h3>
                {graphData && <Line data={graphData} options={options} />}
            </section>

            <section style={{ marginTop: 50 }}>
                <h3>Borders</h3>

                <section>
                        <ul className={styles.countries}>
                            {countryInfo.borders.map(country => (
                                <li key={country.countryCode}>
                                    <Link href={`/countries/${country.countryCode}`} className={styles.countryLink}>
                                        {country.commonName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                </section>
            </section>
        </section>
    );
}
