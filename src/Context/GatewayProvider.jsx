import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GatewayContext = createContext();

export const GatewayProvider = ({ children }) => {
    const [gateways, setGateways] = useState([]);
    const [areas, setAreas] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                await Promise.all([fetchGateways(), fetchAreas(), fetchAsignaciones()]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const fetchGateways = async () => {
        const response = await axios.get('http://localhost:3000/gatewayregister');
        setGateways(response.data);
    };

    const fetchAreas = async () => {
        const response = await axios.get('http://localhost:3000/areas');
        setAreas(response.data);
    };

    const createGateway = async (gatewayData) => {
        await axios.post('http://localhost:3000/gatewayregister', gatewayData);
        fetchGateways();
    };

    const updateGateway = async (id, macAddress) => {
        await axios.put(`http://localhost:3000/gatewayregister/${id}`, { MacAddress: macAddress });
        fetchGateways();
    };

    const deleteGateway = async (id) => {
        await axios.delete(`http://localhost:3000/gatewayregister/${id}`);
        fetchGateways();
    };

    const fetchAsignaciones = async () => {
        const response = await axios.get('http://localhost:3000/asignaciongatewaysareas');
        setAsignaciones(response.data);
    };

    return (
        <GatewayContext.Provider value={{ gateways, createGateway, updateGateway, deleteGateway, areas, fetchAsignaciones, asignaciones, setAsignaciones, loading, error }}>
            {children}
        </GatewayContext.Provider>
    );
};
