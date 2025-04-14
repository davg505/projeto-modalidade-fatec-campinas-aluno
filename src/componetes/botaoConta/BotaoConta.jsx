import { useState, useEffect } from "react";
import style from './BotaoConta.module.css';
import { buscarDadosAluno } from '../../services/apiService';

export const BotaoConta = () => {
    const [showMenu, setShowMenu] = useState(false);
     const [aluno, setAluno] = useState(null);

    const toggleMenu = () => {
    setShowMenu(!showMenu);
    };

     useEffect(() => {
        const carregarDados = async () => {
          try {
            const dados = await buscarDadosAluno();
            setAluno(dados);
          } catch (error) {
            console.error('Erro ao carregar o perfil do aluno:', error);
          }
        };
    
        carregarDados();
      }, []);

    return(
        <div className={style.BotaoConta}>
        <button onClick={toggleMenu} className={style.Icone}>
          {/* Ícone de Conta (pode ser um SVG ou qualquer conteúdo) */}
        ☰
        </button>
        {showMenu && (
        <div className={style.Menu}>
            <ul >
            <li>{aluno ? aluno.login : 'Carregando...'}</li>
            <li>Sair</li>
            </ul>
        </div>
        )}
    </div>

    );

};