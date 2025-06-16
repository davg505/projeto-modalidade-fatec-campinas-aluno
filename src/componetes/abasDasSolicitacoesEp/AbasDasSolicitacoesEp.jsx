import { useState, useEffect } from 'react';
import style from './AbasDasSolicitacoesEp.module.css';
import { buscarDadosrelatoriosep } from '../../services/apiService';

export const AbasDasSolicitacoesEp = () => {
  const [abaAtiva, setAbaAtiva] = useState(null);
  const [buscarArquivo, setBuscarArquivo] = useState("");

  const handleAbaClick = (aba) => {
    setAbaAtiva(prev => (prev === aba ? null : aba));
  };

   useEffect(() => {
      const carregarArquivo = async () => {
        try {
          const arquivos = await buscarDadosrelatoriosep(); // retorna array
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
     <h3>Carta Atividade: {buscarArquivo.cartadescricaoatividades_existe} </h3>
     <h3>Comprovate: {buscarArquivo.comprovacaovinc_existe} </h3>
     <h3>Relatorio: {buscarArquivo.relatorioep_existe} </h3>
     <h3>Requerimento: {buscarArquivo.requerimentoequiv_existe}</h3>
    
    </div>
  );
};
