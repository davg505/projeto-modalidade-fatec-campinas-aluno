import { useState, useEffect } from 'react';
import style from './AbasDasSolicitacoesIc.module.css';
import {buscarDadosrelatoriosic } from '../../services/apiService';

export const AbasDasSolicitacoesIc = () => {
  const [abaAtiva, setAbaAtiva] = useState(null);
  const [buscarArquivo, setBuscarArquivo] = useState("");

  const handleAbaClick = (aba) => {
    setAbaAtiva(prev => (prev === aba ? null : aba));
  };

   useEffect(() => {
      const carregarArquivo = async () => {
        try {
          const arquivos = await buscarDadosrelatoriosic(); // retorna array
          setBuscarArquivo(arquivos); // pega o primeiro por enquanto
        } catch (error) {
          console.error('Erro ao carregar arquivo:', error);
        }
      };
      carregarArquivo();
    }, []);

 return (
    <div className={style.AbasContainer}>
      <div
      //  className={abaAtiva === 'Pedidos de solicitações' ? style.AbaAtiva : style.Aba}
    //    onClick={() => handleAbaClick('Pedidos de solicitações')}
      >

      
      </div>
     <h3>Carta apresentação: {buscarArquivo.carta_apresentacao_existe} </h3>
     <h3>Carta avaliação: {buscarArquivo.carta_avaliacao_existe} </h3>
     <h3>Relatorio: {buscarArquivo.relatorio_existe} </h3>
    </div>
  );
};

