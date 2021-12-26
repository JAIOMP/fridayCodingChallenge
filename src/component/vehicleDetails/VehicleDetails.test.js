import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import VehicleDetails from "./VehicleDetails";
import VehicleContext from "../../provider/VehicleDataContext";

describe('Vehicle Details', () => {
    const mockResponse = [{
        bodyType: "Limousine",
        engineCapacity: 1299,
        enginePowerKW: 44,
        enginePowerPS: 60,
        fuelType: "Benzin",
        make: "FORD",
        model: "Edge",
    }];
    const contextData = {
        setError: jest.fn(),
        selectedBrand: "Ford",
        selectedModel: "Edge",
        error: ""
    };
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse)
        })
    });

    it('should render Vehicles', async () => {
        const {container} = render(
            <VehicleContext.Provider value={contextData}>
                <VehicleDetails/>
            </VehicleContext.Provider>
        );

        await screen.findByText("Limousine");

        expect(container).toMatchSnapshot();
    });

    it('should not render vehicle details if error is present', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject("API is down"));
        render(
            <VehicleContext.Provider value={contextData}>
                <VehicleDetails/>
            </VehicleContext.Provider>
        );
        await waitFor(() => {
            expect(contextData.setError).toHaveBeenCalledTimes(2);
            expect(contextData.setError).toHaveBeenNthCalledWith(1, "");
            expect(contextData.setError).toHaveBeenNthCalledWith(2, "API_ERROR");
        })
    });
});
