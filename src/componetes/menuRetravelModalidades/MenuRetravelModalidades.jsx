import { useState } from "react";
import { UseAppContext } from "../../hooks";
import { Api } from '../../services/Api';
import { Icone } from "../icone";
import { JanelaNoObrigatorio } from "../janelaNoObrigatorio";
import { JanelaPPeriodo } from "../JanelaPPeriodo";
import { JanelaRTermo } from "../janelaRTermo/JanelaRTermo";
import SolicitarEstagio from "../solicitarEstagio/SolicitarEstagio";
import style from './MenuRetravelModalidades.module.css';
import { TitulosIcones } from "./titulosIcones";

// eslint-disable-next-line react/prop-types
export const MenuRetravelModalidade = () => {
    const { iconesEstagio, cancelarSolicitacaoEstagio } = UseAppContext();
    const [showSolicitarEstagio, setShowSolicitarEstagio] = useState(false);
    const [showProrrogacaoDePeriodo, setShowProrrogacaoDePeriodo] = useState(false);
    const [showNoObrigatorio, setShowNoObrigatorio] = useState(false);
    const [showRescisaoTermo, setShowshowRescisaoTermo] = useState(false);

  

    const iconesInicio = iconesEstagio.filter(item => item.id === 1 || item.id === 3);
    const iconesDurante = iconesEstagio.filter(item => item.id === 4 || item.id === 5 || item.id === 6);
    const iconesFinal = iconesEstagio.filter(item => item.id === 7 || item.id === 8 || item.id === 9);

    const handleOpenSolicitarEstagio = async () => {
        try {
            const { data } = await Api.get('/aluno');
            const aluno = data[0]; 
            if (aluno.status === 'Sem solicitação' || aluno.status === 'Cancelado Solicitação') {
                setShowSolicitarEstagio(true); 
            } else {
                alert(`A solicitação não pode ser feita. Status atual: ${aluno.status}`);
            }
        } catch (error) {
            console.error('Erro ao verificar o status do aluno:', error);
        }
    };

    const handleCloseSolicitarEstagio = () => {
        setShowSolicitarEstagio(false); 
        setShowProrrogacaoDePeriodo(false);// Fecha a janela
        setShowNoObrigatorio(false);
        setShowshowRescisaoTermo(false);
    };
    const handleSubmitEstagio = (data) => {
        console.log("Dados do estágio enviados:", data);
        setShowSolicitarEstagio(false); // Fecha a janela após o envio
        setShowProrrogacaoDePeriodo(false);
        setShowNoObrigatorio(false);
        setShowshowRescisaoTermo(false);
    };



     // Aqui faza verificação do status do usuario 
        const handleOpenCancelarEstagio = async () => {
        try {
            const { data } = await Api.get('/aluno');
            const aluno = data[0]; 
            if (aluno.status === 'Sem solicitação') {
                alert(`Não tem solicitaçao vigente`);
            }  else if (aluno.status === 'Enviado Solicitação') { 
                cancelarSolicitacaoEstagio();
                alert(`A Solicitação Cancelada`);
            } else {
                alert(`Status cancelado ou outra ação: ${aluno.status}`);
            }
        } catch (error) {
            console.error('Erro ao verificar o status do aluno:', error);
        }
    };

    // Prorrogação de período do estagio
    const handleOpenProrrogacaoDePeriodo = async () => {
        try {
            const { data } = await Api.get('/aluno');
            const aluno = data[0]; 
            if (aluno.status === 'Sem solicitação' || aluno.status === 'Cancelado Solicitação') {
                setShowProrrogacaoDePeriodo(true); 
            } else {
                alert(`A solicitação não pode ser feita. Status atual: ${aluno.status}`);
            }
        } catch (error) {
            console.error('Erro ao verificar o status do aluno:', error);
        }
    };

        // TERMO ADITIVO - Estágio não obrigatório para obrigatório
        const handleOpenNObrigatório = async () => {
            try {
                const { data } = await Api.get('/aluno');
                const aluno = data[0]; 
                if (aluno.status === 'Sem solicitação' || aluno.status === 'Cancelado Solicitação') {
                    setShowNoObrigatorio(true); 
                } else {
                    alert(`A solicitação não pode ser feita. Status atual: ${aluno.status}`);
                }
            } catch (error) {
                console.error('Erro ao verificar o status do aluno:', error);
            }
        };

                // RESCISÃO DE TERMO DE COMPROMISSO DE ESTÁGIO
                const handleOpenRescisaoDoTermo = async () => {
                    try {
                        const { data } = await Api.get('/aluno');
                        const aluno = data[0]; 
                        if (aluno.status === 'Sem solicitação' || aluno.status === 'Cancelado Solicitação') {
                            setShowshowRescisaoTermo(true); 
                        } else {
                            alert(`A solicitação não pode ser feita. Status atual: ${aluno.status}`);
                        }
                    } catch (error) {
                        console.error('Erro ao verificar o status do aluno:', error);
                    }
                };

    const actions = {
        1: handleOpenSolicitarEstagio,
        3: handleOpenCancelarEstagio,
        4: handleOpenProrrogacaoDePeriodo,
        5: handleOpenNObrigatório,
        6: handleOpenRescisaoDoTermo,
    };

    const handleClick = (id) => {
        const action = actions[id];
        if (action) {
            action();
        } else {
            console.log("Ação padrão");
        }
    };

    return (
        <div className={style.Menu}>
                <div >
                    <h2>Estágio</h2>
                    <div>
                        <TitulosIcones nomeTitulo={'Início estágio'} />
                        <div className={style['menu-icones']}>
                            {iconesInicio.map(item => (
                                <Icone
                                    key={item.id}
                                    id={item.id}
                                    sigla={item.sigla}
                                    nome={item.nome}
                                    onClick={() => handleClick(item.id)}
                                />
                            ))}
                        </div>
                        <TitulosIcones nomeTitulo={'Durante estágio'} />
                        <div className={style['menu-icones']}>
                            {iconesDurante.map(item => (
                                <Icone
                                    key={item.id}
                                    id={item.id}
                                    sigla={item.sigla}
                                    nome={item.nome}
                                    onClick={() => handleClick(item.id)}
                                />
                            ))}
                        </div>
                        <TitulosIcones nomeTitulo={'Entregas finais estágio'} />
                        <div className={style['menu-icones']}>
                            {iconesFinal.map(item => (
                                <Icone
                                    key={item.id}
                                    id={item.id}
                                    sigla={item.sigla}
                                    nome={item.nome}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            <SolicitarEstagio
                show={showSolicitarEstagio}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />
            <JanelaPPeriodo
                show={showProrrogacaoDePeriodo}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />
            <JanelaNoObrigatorio 
                show={showNoObrigatorio}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />
            <JanelaRTermo
                show={showRescisaoTermo}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}

            />

        </div>


    );
};
