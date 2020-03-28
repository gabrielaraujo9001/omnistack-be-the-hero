import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2, FiPower } from 'react-icons/fi';

import api from '../../services/api.js';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deleter caso. Tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header className="header">
                <img src={logoImg} alt="Be The Hero" className="logo"/>
                <span className="greeting">Bem-vindo(a), {ongName}!</span>

                <Link className="action" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout}><FiPower size={18} color="#e02041" /></button>
            </header>

            <h1>Casos registrados</h1>

            <ul className="incidents">
                {incidents.map(incident => (
                    <li key={incident.id} className="item">
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button"><FiTrash2 size={20} color="#a8a8b3" /></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}