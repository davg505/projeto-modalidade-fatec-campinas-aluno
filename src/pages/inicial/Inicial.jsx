import { useState, useEffect } from 'react';
import { BotaoTrapezioPadrao, MenuRetravel } from '../../componetes';
import { buscarDadosAluno } from '../../services/apiService';


import style from './Inicial.module.css';

export const Inicial = () => {

  const [isMenuRetravelOpen, setIsMenuRetravelOpen] = useState(false);
  const [aluno, setAluno] = useState(null); // estado para armazenar os dados do aluno

  const handleBotaoTrapezioPadraoClick = () => {
    setIsMenuRetravelOpen(prev => !prev);
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

  return (
    <div className={style.Inicial}>
      <BotaoTrapezioPadrao toggleMenu={handleBotaoTrapezioPadraoClick} />
      {isMenuRetravelOpen && (
        <div>
          <MenuRetravel />
        </div>
      )}
      <div className={style.Title}>
      <h2>Bem-vindo, {aluno ? aluno.nome_do_aluno : 'Carregando...'}</h2>
      <p>{aluno ? aluno.email : 'Carregando...'}</p>
      </div>
    </div>
  );
};
