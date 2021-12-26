import React, {useEffect, useState, useContext} from 'react';
import SelectItem from '../common/selectItem/SelectItem'
import VehicleContext from "../../provider/VehicleDataContext";

const BrandSelect = () => {
    const [brands, setBrands] = useState([]);
    const {setSelectedBrand, setSelectedModel} = useContext(VehicleContext);

    useEffect(() => {
        fetch('http://localhost:8080/api/makes')
            .then(res => res.json())
            .then(data => setBrands(data));
    }, []);

    const onSelect = (event) => {
        setSelectedBrand(event.target.value);
        setSelectedModel("");
    };

    return (
        <>
            <SelectItem data={brands} dataFor="brand" onSelect={onSelect}/>
        </>
    );
};

export default BrandSelect;
