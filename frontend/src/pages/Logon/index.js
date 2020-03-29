import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api.js';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (error) {
            alert('Falha no login, tente novamente');
        }
    }

    return(
        <div className="logon-container">

            <section className="wrapper">
                
                <img src={logoImg} alt="Be The Hero" className="logo"/>

                <form onSubmit={handleLogin} className="form">

                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="action" type="submit">Entrar</button>
                    <Link className="action-link" to="/register"><FiLogIn size={16} color="#e02041" />Não tenho cadastro</Link>

                </form>

            </section>

            <img src={heroesImg} alt="Heroes"/>

        </div>
    );
}