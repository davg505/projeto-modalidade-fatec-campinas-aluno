import { useState, useEffect } from 'react';
import style from './AbasDasSolicitacoesIc.module.css';
import { buscarDadosEstagio } from '../../services/apiService';

export const AbasDasSolicitacoesIc = () => {
  const [abaAtiva, setAbaAtiva] = useState(null);

  const handleAbaClick = (aba) => {
    setAbaAtiva(prev => (prev === aba ? null : aba));
  };


  return (
    <div className={style.AbasContainer}>
      <div
        className={abaAtiva === 'Pedidos de solicitações' ? style.AbaAtiva : style.Aba}
        onClick={() => handleAbaClick('Pedidos de solicitações')}
      >
        <h2>Dados - Documentação</h2>
      </div>

      <h2>Documentação: Carta Apresentação</h2>

      <h2>Documentação: Carta Avaliação </h2>

      <h2>Documentação: Relatório Final </h2>

    </div>
  );
};
