import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { GatewayContext } from '../../../Context/GatewayProvider';
import "./AreaForm_CreateGateway.css";

export const AreaForm_CreateGateway = () => {
    const [formData, setFormData] = useState({
        MacAddress: '',
        GatewayFree: '',
        GatewayLoad: '',
        Timestamp: '',
    });

    const { createGateway } = useContext(GatewayContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createGateway(formData);
            Swal.fire('¡Éxito!', 'Gateway creado exitosamente!', 'success');
            setFormData({
                MacAddress: '',
                GatewayFree: '',
                GatewayLoad: '',
                Timestamp: '',
            }); // Limpiar el formulario después de enviar
        } catch (error) {
            console.error('Error al crear el gateway:', error.message);
            Swal.fire('Error', 'Error al crear el gateway', 'error');
        }
    };

    return (
        <div>
            <h2>REGISTRAR GATEWAY</h2>
            <form className='form-employe' onSubmit={handleSubmit}>
                <input type="text" name="MacAddress" placeholder='Mac Address' value={formData.MacAddress} required onChange={handleChange} />
                <input type="number" name="GatewayFree" placeholder='Gateway Free' value={formData.GatewayFree} required onChange={handleChange} />
                <input type="number" step="0.01" name="GatewayLoad" placeholder='Gateway Load' value={formData.GatewayLoad} required onChange={handleChange} />
                <input type="datetime-local" name="Timestamp" placeholder='Timestamp' value={formData.Timestamp} required onChange={handleChange} />
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};
