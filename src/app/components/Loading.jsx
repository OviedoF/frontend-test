'use client'
import React, { useState, useEffect } from 'react'

export default function Loading() {
    const [points, setPoints] = useState(0);

    useEffect(() => {
        window.setInterval(() => {
            setPoints((points) => {
                return points === 3 ? 0 : points + 1;
            });
        }, 500);
    }, []);

    return (
        <p style={{
            textAlign: "center",
        }}>
            Loading {".".repeat(points)}
        </p>
    )
}
