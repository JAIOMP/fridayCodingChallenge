import React, { useState } from 'react';
import VehicleContext from './VehicleDataContext'

const VehicleDataProvider = ({ children }) => {
    const [selectedBrand, setSelectedBrand]  = useState('');
    const [selectedModel, setSelectedModel]  = useState('');
    const [error, setError] = useState('');

    return (
        <VehicleContext.Provider value={{
            selectedBrand,
            setSelectedBrand,
            selectedModel,
            setSelectedModel,
            error,
            setError
        }}>
            {children}
        </VehicleContext.Provider>
    );
};

export default VehicleDataProvider;
