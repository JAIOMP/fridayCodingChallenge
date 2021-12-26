import React from 'react';
import {render, waitFor, fireEvent} from '@testing-library/react';
import SelectItem from './SelectItem';

describe('SelectItem', () => {
    const data = ["1er", "2er", "3er", "4er", "5er", "6er", "7er", "8er"];
    const props = {
        data,
        dataFor: "model",
        onSelect: jest.fn(),
    };
    it('should render SelectItem', () => {
        const {container} = render(<SelectItem {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('should select model from dropdown', async () => {
        const {getByTestId, getAllByTestId} = render(
            <SelectItem {...props} />
        );

        await waitFor(() => getByTestId("select-item"));
        fireEvent.change(getByTestId('select'), { target: { value: "2er" } });
        let options = getAllByTestId('select-option');
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
        expect(props.onSelect).toHaveBeenCalled();
    });
});
