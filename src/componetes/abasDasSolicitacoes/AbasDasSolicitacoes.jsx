import { useState } from 'react';
import { DadosEmpresa } from '../dadosEmpresa';
import { DadosEstagio } from '../dadosEstagio';
import GerarPDF from '../gerarPdf/GerarPDF';
import style from './AbasDasSolicitacoes.module.css';

export const AbasDasSolicitacoes = () => {
    const [abaAtiva, setAbaAtiva] = useState(null);
    const [showDadosEmpresa, setShowDadosEmpresa] = useState(false); // Estado para controlar a exibição da janela
    const [showDadosEstagio, setShowDadosEstagio] = useState(false); // Estado para controlar a exibição da janela

    const handleAbaClick = (aba) => {
        if (abaAtiva === aba) {
            // Se a aba clicada for a mesma que a aba ativa, desativa a aba
            setAbaAtiva(null);
        } else {
            // Caso contrário, ativa a aba clicada
            setAbaAtiva(aba);
        }
    };

    const handleOpenDadosEmpresa = () => {
        setShowDadosEmpresa(true); 
    };

    const handleCloseDadosEmpresa = () => {
        setShowDadosEmpresa(false); // Fecha a janela
    };

    const handleSubmitDadosEmpresa = (data) => {
        console.log("Dados do empresa enviados:", data);
        setShowDadosEmpresa(false); // Fecha a janela após o envio
    };

    const handleOpenDadosEstagio = () => {
        setShowDadosEstagio(true); 
    };

    const handleCloseDadosEstagio = () => {
        setShowDadosEstagio(false); // Fecha a janela
    };

    const handleSubmitDadosEstagio = (data) => {
        console.log("Dados do empresa enviados:", data);
        setShowDadosEstagio(false); // Fecha a janela após o envio
    };

    return (
        <div className={style.AbasContainer}>
            <div className={abaAtiva === 'Pedidos de solicitações' ? style.AbaAtiva : style.Aba} onClick={() => handleAbaClick('Pedidos de solicitações')}>
            <h2>Dados - Documentação</h2>
            </div>
            {abaAtiva === 'Pedidos de solicitações' && (
                <div>
                    <h3 className={style.Title2}>Preencher dados empresa:</h3>
                    <button className={style.button}  onClick={handleOpenDadosEmpresa}>Adicionar</button>
                    <h3 className={style.Title2}>Preencher dados estagio:</h3>
                    <button className={style.button} onClick={handleOpenDadosEstagio}>Adicionar</button>
                    <h3 className={style.Title2}>Preencher termo automático:</h3>
                    <GerarPDF/>
                    <h3 className={style.Title2}>Download termo para assinar:</h3>
                    <button className={style.button}>Download termo </button>
                    <h3 className={style.Title2}>Enviar para análise:</h3>
                    <button className={style.button}>Enviar termos prontos </button>
                    <h3 className={style.Title2}>Cancelar termo ou envio:</h3>
                    <button className={style.button}>Cancelar envio</button>
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