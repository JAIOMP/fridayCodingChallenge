import React from 'react';
import './App.css';
import VehicleDataProvider from "./provider/VehicleDataProvider";
import Home from "./component/home/Home";


function App() {
    return (
        <VehicleDataProvider>
            <div className="App">
                <header className="app-header">
                    Car Portfolio
                </header>
                <Home />
            </div>
        </VehicleDataProvider>
    );
}

export default App;
