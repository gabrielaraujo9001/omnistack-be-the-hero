import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api.js';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        
        try {
            const response = await api.post('ongs', data);
            alert('Seu ID de acesso: ' + response.data.id);
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section className="main">
                    <img className="logo" src={logoImg} alt="Be The Hero"/>
                    <h1 className="title">Cadastro</h1>
                    <p className="description">
                        Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG
                    </p>
                    <Link className="action-link" to="/"><FiArrowLeft size={16} color="#e02041" />Voltar</Link>
                </section>

                <div className="form-wrapper">
                    <form onSubmit={handleRegister} className="form">
                        <input
                            placeholder="Nome"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input
                            placeholder="WhatsApp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />

                        <div className="input-group">
                            <input
                                placeholder="Cidade"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />

                            <input
                                placeholder="UF"
                                style={{ width: 80 }}
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                            />
                        </div>
                        <button className="action" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}