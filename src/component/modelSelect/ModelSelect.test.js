import React from 'react';
import {render, waitFor} from '@testing-library/react';
import ModelSelect from './ModelSelect';
import VehicleContext from "../../provider/VehicleDataContext";

describe('ModelSelect', () => {
    const mockResponse = ["1er", "2er", "3er", "4er", "5er", "6er", "7er", "8er"];

    const contextData = {
        setError: jest.fn(),
        setSelectedModel: jest.fn(),
        selectedBrand: "Ford",
    };
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse)
        })
    });

    it('should render ModelSelect', async () => {
        const {container, getByTestId} = render(
            <VehicleContext.Provider value={contextData}>
                <ModelSelect/>
            </VehicleContext.Provider>
        );

        await waitFor(() => getByTestId("select-item"));
        expect(container).toMatchSnapshot();
    });

    it('should render empty model data error when model data is empty', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue([])
        });

        render(
            <VehicleContext.Provider value={contextData}>
                <ModelSelect/>
            </VehicleContext.Provider>
        );

        await waitFor(() => {
            expect(contextData.setError).toHaveBeenCalledTimes(2);
            expect(contextData.setError).toHaveBeenNthCalledWith(1, "");
            expect(contextData.setError).toHaveBeenNthCalledWith(2, "EMPTY_MODEL_DATA");
        })
    });

    it('should render API_ERROR when api fails', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject("API is down"));

        render(
            <VehicleContext.Provider value={contextData}>
                <ModelSelect/>
            </VehicleContext.Provider>
        );

        await waitFor(() => {
            expect(contextData.setError).toHaveBeenCalledTimes(2);
            expect(contextData.setError).toHaveBeenNthCalledWith(1, "");
            expect(contextData.setError).toHaveBeenNthCalledWith(2, "API_ERROR");
        })
    });
});
