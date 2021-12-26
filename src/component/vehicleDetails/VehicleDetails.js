import React, {useContext, useEffect, useState} from 'react';
import VehicleContext from "../../provider/VehicleDataContext";
import './VehicleDetails.css';

const VehicleDetails = () => {
    const {selectedBrand, selectedModel, error, setError} = useContext(VehicleContext);
    const [vehicleDetails, setVehicleDetails] = useState([]);

    const Row = ({label, value}) => {
        return (<div className="row">
            <span className="row-label">{label}</span>
            <span className="row-value">{value}</span>
        </div>);
    };

    useEffect(() => {
        setError('');
        setVehicleDetails([]);
        fetch(`http://localhost:8080/api/vehicles?make=${selectedBrand}&model=${selectedModel}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setError('EMPTY_VEHICLE_DATA');
                    return false;
                }
                setVehicleDetails(data)
            }).catch(() => {
            setError('API_ERROR');
        });
    }, [selectedModel, selectedBrand]);

    return (
        <div className="vehicle-details-container">
            {error === '' && vehicleDetails.map((vehicle, index) => <div className="vehicle-details" key={`${vehicle.make}${index}`}>
                <Row value={vehicle.make} label="Brand"/>
                <Row value={vehicle.model} label="Model"/>
                <Row value={vehicle.enginePowerPS} label="Engine power in ps"/>
                <Row value={vehicle.enginePowerKW} label="Engine power in kw"/>
                <Row value={vehicle.fuelType} label="Fuel type"/>
                <Row value={vehicle.bodyType} label="Body type"/>
                <Row value={vehicle.engineCapacity} label="Engine capacity"/>
            </div>)}
        </div>
    );
};

export default VehicleDetails;
