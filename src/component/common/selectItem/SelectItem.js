import React from 'react';
import './SelectItem.css';

const SelectItem = ({ data, onSelect, dataFor }) => {
    return (
        <div className="select-item-container">
            <label className="select-label" htmlFor="brand" data-testid="select-item">Please select your <strong>{dataFor}</strong>:</label>
            <select id={`${dataFor}-list`} data-testid="select" onChange={onSelect}>
                <option>--Please choose an option--</option>
                {data.map((brand) => <option data-testid="select-option" key={brand} value={brand}>{brand}</option>)}
            </select>
        </div>
    );
};

export default SelectItem;
