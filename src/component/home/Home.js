import React, {useContext} from 'react';
import BrandSelect from "../brandSelect/BrandSelect";
import ModelSelect from "../modelSelect/ModelSelect";
import VehicleDetails from "../vehicleDetails/VehicleDetails";
import VehicleContext from "../../provider/VehicleDataContext";
import {ERRORS} from "../constant";

const Home = () => {
    const { selectedBrand, selectedModel, error } = useContext(VehicleContext);
    return (
        <div>
            <BrandSelect/>
            {selectedBrand && <ModelSelect/>}
            {selectedModel && <VehicleDetails/>}
            {
                error !== '' &&
                <div className="error-message">
                    {ERRORS[error]}
                </div>
            }
        </div>
    );
};

export default Home;
