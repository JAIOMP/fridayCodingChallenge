import React from 'react';
import {render, waitFor} from '@testing-library/react';
import BrandSelect from './BrandSelect';
import VehicleContext from "../../provider/VehicleDataContext";

describe('BrandSelect', () => {
    const mockResponse = ["ALFA ROMEO", "AUDI", "AUSTIN", "BARKAS", "BMW", "CADILLAC", "CHEVROLET"];

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

    it('should render BrandSelect', async () => {
        const {container, getByTestId} = render(
            <VehicleContext.Provider value={contextData}>
                <BrandSelect/>
            </VehicleContext.Provider>
        );

        await waitFor(() => getByTestId("select-item"));
        expect(container).toMatchSnapshot();
    });
});
