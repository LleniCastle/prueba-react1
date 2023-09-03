import React, { useState, useEffect } from 'react';

const apiUrl = 'https://api.victorsanmartin.com/feriados/en.json';

const MiApi = ({ setData }) => {
    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.data)) {
                    setData(data.data);
                } else {
                    console.error('Los datos no tienen el formato esperado.');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setData]);

    return (
        <div className="mi-api-component">
        </div>
    );
};

export default MiApi;