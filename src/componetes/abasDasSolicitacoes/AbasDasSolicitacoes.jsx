import { useState } from 'react';
import { DadosEmpresa } from '../dadosEmpresa';
import { DadosEstagio } from '../dadosEstagio';
import GerarPDF from '../gerarPdf/GerarPDF';
import style from './AbasDasSolicitacoes.module.css';

export const AbasDasSolicitacoes = () => {
    const [abaAtiva, setAbaAtiva] = useState(null);
    const [showDadosEmpresa, setShowDadosEmpresa] = useState(false); 
    const [showDadosEstagio, setShowDadosEstagio] = useState(false);
    const [empresaPreenchida, setEmpresaPreenchida] = useState(false); // Novo estado para controlar se os dados da empresa foram preenchidos
    const [estagioPreenchido, setEstagioPreenchido] = useState(false); // Novo estado para controlar se os dados do estágio foram preenchidos

    const handleAbaClick = (aba) => {
        if (abaAtiva === aba) {
            setAbaAtiva(null);
        } else {
            setAbaAtiva(aba);
        }
    };

    const handleOpenDadosEmpresa = () => {
        setShowDadosEmpresa(true); 
    };

    const handleCloseDadosEmpresa = () => {
        setShowDadosEmpresa(false); 
    };

    const handleSubmitDadosEmpresa = (data) => {
        console.log("Dados do empresa enviados:", data);
        setShowDadosEmpresa(false);
        setEmpresaPreenchida(true); // Marca como preenchido
    };

    const handleOpenDadosEstagio = () => {
        setShowDadosEstagio(true); 
    };

    const handleCloseDadosEstagio = () => {
        setShowDadosEstagio(false); 
    };

    const handleSubmitDadosEstagio = (data) => {
        console.log("Dados do estágio enviados:", data);
        setShowDadosEstagio(false); 
        setEstagioPreenchido(true); // Marca como preenchido
    };

    return (
        <div className={style.AbasContainer}>
            <div className={abaAtiva === 'Pedidos de solicitações' ? style.AbaAtiva : style.Aba} onClick={() => handleAbaClick('Pedidos de solicitações')}>
                <h2>Dados - Documentação</h2>
            </div>
            {abaAtiva === 'Pedidos de solicitações' && (
                <div>
                    <h3 className={style.Title2}>Preencher dados empresa:</h3>
                    <button className={style.button} onClick={handleOpenDadosEmpresa}>Adicionar</button>
                    <h3 className={style.Title2}>Preencher dados estagio:</h3>
                    <button className={style.button} onClick={handleOpenDadosEstagio}>Adicionar</button>
                    
                    {/* Exibe o GerarPDF apenas se ambos os dados forem preenchidos */}
                    {empresaPreenchida && estagioPreenchido && (
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
