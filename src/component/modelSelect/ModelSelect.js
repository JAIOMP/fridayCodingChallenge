import React, { useEffect, useContext, useState } from 'react';
import SelectItem from '../common/selectItem/SelectItem'
import VehicleContext from "../../provider/VehicleDataContext";
import './ModelSelect.css';

const ModelSelect = () => {
    const [models, setModels] = useState([]);
    const { selectedBrand, setSelectedModel, setError } = useContext(VehicleContext);

    useEffect(() => {
        setError('');
        fetch(`http://localhost:8080/api/models?make=${selectedBrand}`)
            .then(res => res.json())
            .then(data => {
                if(data.length === 0) {
                    setError('EMPTY_MODEL_DATA');
                }
                setModels(data)
            }).catch(() => {
                setError('API_ERROR');
        });
    }, [selectedBrand]);

    const onSelect = (event) => {
        setSelectedModel(event.target.value);
    };

    return (
        <>
            {models.length > 0  &&
            <SelectItem data={models} dataFor="model" onSelect={onSelect}/>}
        </>
    );
};

export default ModelSelect;
