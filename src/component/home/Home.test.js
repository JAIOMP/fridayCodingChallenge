import React from 'react';
import {render} from '@testing-library/react';
import Home from './Home';
import VehicleContext from "../../provider/VehicleDataContext";
import ModelSelect from "../modelSelect/ModelSelect";

jest.mock("../brandSelect/BrandSelect", () => () => <div>Brand Select</div>);
jest.mock("../modelSelect/ModelSelect", () => () => <div>Model Select</div>);
jest.mock("../vehicleDetails/VehicleDetails", () => () => <div>Vehicle Details</div>);
describe('Home', () => {
    const contextData = {
        selectedModel: "Edge",
        selectedBrand: "Ford",
        error: "",
        setError: jest.fn(),
    };

    it('should render Home', async () => {
        const {container} = render(
            <VehicleContext.Provider value={contextData}>
                <Home />
            </VehicleContext.Provider>
        );

        expect(container).toMatchSnapshot();
    });
});
