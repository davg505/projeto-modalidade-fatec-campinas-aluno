import { useState, useEffect } from 'react';
import style from './AbasDasSolicitacoesEp.module.css';
import { buscarArquivos } from '../../services/apiService';

export const AbasDasSolicitacoesEp = () => {
  const [abaAtiva, setAbaAtiva] = useState(null);
  const [buscarArquivo, setBuscarArquivo] = useState("");

  const handleAbaClick = (aba) => {
    setAbaAtiva(prev => (prev === aba ? null : aba));
  };

   useEffect(() => {
      const carregarArquivo = async () => {
        try {
          const arquivos = await buscarArquivos(); // retorna array
          setBuscarArquivo(arquivos[0]); // pega o primeiro por enquanto
        } catch (error) {
          console.error('Erro ao carregar arquivo:', error);
        }
      };
      carregarArquivo();
    }, []);

  return (
    <div className={style.AbasContainer}>
      <div
        className={abaAtiva === 'Pedidos de solicitações' ? style.AbaAtiva : style.Aba}
        onClick={() => handleAbaClick('Pedidos de solicitações')}
      >
        <h2>Dados - Documentação</h2>
      </div>

      <h2>Documentação: Carta descrição atividades de trabalho</h2>
      <h3>Arquivo: </h3>
      <h3>Download: </h3>
      <h2>Documentação: Comprovação vínculo trabalho </h2>
      <h3>Arquivo: </h3>
      <h3>Download: </h3>
      <h2>Documentação: Relatórios </h2>
      <h3>Arquivo: </h3>
      <h3>Download: </h3>
      <h2>Documentação: Requerimento de equivalências </h2>
      <h3>Arquivo: </h3>
      <h3>Download: </h3>

    </div>
  );
};
