import React, { useContext, useEffect, useState } from 'react';
import { EventosBeaconsContext } from '../../Context/EventosBeaconsProvider';
import { GatewayContext } from '../../Context/GatewayProvider';
import { AreaAssigmentContext } from '../../Context/AreaAssigmentProvider';
import ProjectTable from '../../components/ProjectTable/ProjectTable';
import './Dashboard.css';

export const Dashboard = () => {
    const { eventosBeacons, loading } = useContext(EventosBeaconsContext);
    const { gateways } = useContext(GatewayContext);
    const { assignments, fetchAssignments } = useContext(AreaAssigmentContext);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        fetchAssignments();
    }, [eventosBeacons, gateways]);

    useEffect(() => {
        console.log("Eventos Beacons:", eventosBeacons);
        console.log("Gateways:", gateways);
        console.log("Asignaciones:", assignments);
        updateAreas();
    }, [eventosBeacons, gateways, assignments]);

    const updateAreas = () => {
        const updatedAreas = gateways.map(gateway => {
            const areaNombre = getAreaNombre(gateway.MacAddress);
            return { ...gateway, areaNombre };
        });
        setAreas(updatedAreas);
    };

    const getUniqueBeaconsByGateway = (gatewayID) => {
        const beacons = eventosBeacons.filter(evento => evento.GatewayID === gatewayID);
        const latestEvents = beacons.reduce((acc, current) => {
            const existing = acc[current.BeaconMacAddress];
            if (!existing || new Date(existing.Timestamp) < new Date(current.Timestamp)) {
                acc[current.BeaconMacAddress] = current;
            }
            return acc;
        }, {});
        return Object.values(latestEvents);
    };

    const getAreaNombre = (macAddress) => {
        const asignacion = assignments.find(aga => aga.macGateway === macAddress);
        return asignacion ? asignacion.areaTrabajo : 'No asignada';
    };

    if (loading) {
        return <div className='grid'>Cargando...</div>;
    }

    return (
        <div className='grid'>
            {areas.map(gateway => {
                const totalEvents = getUniqueBeaconsByGateway(gateway.GatewayID);
                return (
                    <div key={gateway.GatewayID}>
                        <div className='containerInfoTable'>
                            <div className='containerImgTable'></div>
                            <h2 className='flexRow containerData'>
                                <img className='imgRouter' src="/img/gateway.png" alt="gateway" />
                                <span>{gateway.MacAddress}</span>
                            </h2>
                            <h3>{gateway.areaNombre}</h3>
                            <p className='flexRow imgP'>
                                <img src="/img/user.png" alt="usuarioDetectados" />
                                <span>{totalEvents.length}</span>
                            </p>
                        </div>
                        <div className='table-container'>
                            {totalEvents.length > 0 ? (
                                <ProjectTable data={totalEvents} />
                            ) : (
                                <div>No hay datos disponibles.</div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
