import { useState, useEffect } from 'react';
import { DadosEmpresa } from '../dadosEmpresa';
import { DadosEstagio } from '../dadosEstagio';
import GerarPDF from '../gerarPdf/GerarPDF';
import style from './AbasDasSolicitacoes.module.css';
import { buscarDadosEstagio, buscarDadosEmpresa, buscarDadosEstagioSolicitacao } from '../../services/apiService';

export const AbasDasSolicitacoes = () => {
  const [abaAtiva, setAbaAtiva] = useState(null);
  const [showDadosEmpresa, setShowDadosEmpresa] = useState(false);
  const [showDadosEstagio, setShowDadosEstagio] = useState(false);
  const [dadosEstagio, setEstagio] = useState(null);
  const [dadosEmpresa, setEmpresa] = useState(null);
  const [dadosSolicitacao, setSolicitacao] = useState(null);

  // Carrega dados do estágio
  useEffect(() => {
    const carregarDadosEstagio = async () => {
      try {
        const dados = await buscarDadosEstagio();
        console.log('✅ Dados estágio:', dados);
        setEstagio(dados);
      } catch (error) {
        console.error('Erro ao carregar os dados do estágio:', error);
      }
    };
    carregarDadosEstagio();
  }, []);


   // Carrega dados do estágio
   useEffect(() => {
    const carregarDadosEstagioSolicitacao = async () => {
      try {
        const dados = await buscarDadosEstagioSolicitacao();
        console.log('✅ Dados estágio:', dados);
        setSolicitacao(dados);
      } catch (error) {
        console.error('Erro ao carregar os dados do estágio:', error);
      }
    };
    carregarDadosEstagioSolicitacao();
  }, []);

  // Carrega dados da empresa
  useEffect(() => {
    const carregarDadosEmpresa = async () => {
      try {
        const dados = await buscarDadosEmpresa();
        console.log('✅ Dados empresa:', dados);
        setEmpresa(dados);
      } catch (error) {
        console.error('Erro ao carregar os dados da empresa:', error);
      }
    };
    carregarDadosEmpresa();
  }, []);

  const handleAbaClick = (aba) => {
    setAbaAtiva(prev => (prev === aba ? null : aba));
  };

  const handleOpenDadosEmpresa = () => setShowDadosEmpresa(true);
  const handleCloseDadosEmpresa = () => setShowDadosEmpresa(false);

  const handleOpenDadosEstagio = () => setShowDadosEstagio(true);
  const handleCloseDadosEstagio = () => setShowDadosEstagio(false);

  // Funções fictícias para submissão (você pode alterar conforme o que deseja fazer)
  const handleSubmitDadosEmpresa = (dados) => {
    console.log('🔵 Dados da empresa enviados:', dados);
    setEmpresa(dados);
    setShowDadosEmpresa(false);
  };

  const handleSubmitDadosEstagio = (dados) => {
    console.log('🟢 Dados do estágio enviados:', dados);
    setEstagio(dados);
    setShowDadosEstagio(false);
  };

  return (
    <div className={style.AbasContainer}>
      <div
        className={abaAtiva === 'Pedidos de solicitações' ? style.AbaAtiva : style.Aba}
        onClick={() => handleAbaClick('Pedidos de solicitações')}
      >
        <h2>Dados - Documentação</h2>
      </div>

            {abaAtiva === 'Pedidos de solicitações' && (
        <div>
            {!dadosSolicitacao  || !dadosEmpresa ? (
            <>
                <h3 className={style.Title2}>Preencher dados empresa:</h3>
                <button className={style.button} onClick={handleOpenDadosEmpresa}>Adicionar</button>

                <h3 className={style.Title2}>Preencher dados estágio:</h3>
                <button className={style.button} onClick={handleOpenDadosEstagio}>Adicionar</button>
            </>
            ) : (
            <>
                <h3 className={style.Title2}>Preencher termo automático:</h3>
                <GerarPDF />

                <h3 className={style.Title2}>Enviar para análise:</h3>
                <button className={style.button}>Enviar termos prontos</button>

                <h3 className={style.Title2}>Cancelar termo ou envio:</h3>
                <button className={style.button}>Cancelar envio</button>
            </>
            )}
        </div>
        )}


      <DadosEmpresa
        show={showDadosEmpresa}
        handleClose={handleCloseDadosEmpresa}
        handleSubmit={handleSubmitDadosEmpresa}
      />

      <DadosEstagio
        show={showDadosEstagio}
        handleClose={handleCloseDadosEstagio}
        handleSubmit={handleSubmitDadosEstagio}
      />
    </div>
  );
};
