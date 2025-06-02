import { useState } from "react";
import { UseAppContext } from "../../hooks";
import { Api } from '../../services/Api';
import { Icone } from "../icone";
import SolicitarEp from "../solicitarEp/SolicitarEp";
import CancelarEp from "../cancelarEp/CancelarEp";
import RequerimentoEquiv from "../requerimentoEquiv/RequerimentoEquiv";
import RelatorioEp from "../relatorioEp/RelatorioEp";
import ComprovacaoVinc from "../comprovacaoVinc/ComprovacaoVinc";
import CartaDescricaoAtividades from "../cartaDescricaoAtividades/CartaDescricaoAtividades";

import style from './MenuRetravelModalidadesep.module.css';
import { TitulosIcones } from "./titulosIcones";
import {buscarDadosAluno} from '../../services/apiService';

// eslint-disable-next-line react/prop-types
export const MenuRetravelModalidadesep = () => {
    const { iconesEp, cancelarSolicitacaoEstagio } = UseAppContext();
    const [showSolicitarEp, setShowSolicitarEp] = useState(false);
    const [showCancelar, setShowCancelar] = useState(false);
    const [showRequerimentoEquiv, setShowRequerimentoEquiv] = useState(false);
    const [showRelatorioEp, setShowRelatorioEp] = useState(false);
    const [showComprovacaoVinc, setShowComprovacaoVinc] = useState(false);
    const [showCartaDescricaoAtividades, setShowCartaDescricaoAtividades] = useState(false);

  

    const iconesInicio = iconesEp.filter(item => item.id === 1 || item.id === 3);
    const iconesDurante = iconesEp.filter(item => item.id === 4 || item.id === 5 || item.id === 6 || item.id === 7);

    const handleOpenSolicitarEstagio = async () => {
        try {
            const { data } = await Api.get('/aluno');
            const aluno = data[0]; 
            if (aluno.status === 'Sem solicitação' || aluno.status === 'Cancelado Solicitação') {
                setShowSolicitarEp(true); 
            } else {
                alert(`A solicitação não pode ser feita. Status atual: ${aluno.status}`);
            }
        } catch (error) {
            console.error('Erro ao verificar o status do aluno:', error);
        }
    };

    const handleCloseSolicitarEstagio = () => {
        setShowSolicitarEp(false); 
        setShowCancelar(false);// Fecha a janela
        setShowRequerimentoEquiv(false);
        setShowRelatorioEp(false);
        setShowComprovacaoVinc(false);
        setShowCartaDescricaoAtividades(false);
    };
    const handleSubmitEstagio = (data) => {
        console.log("Dados do estágio enviados:", data);
        setShowSolicitarEp(false); 
        setShowCancelar(false);// Fecha a janela
        setShowRequerimentoEquiv(false);
        setShowRelatorioEp(false);
        setShowComprovacaoVinc(false);
        setShowCartaDescricaoAtividades(false);
    };



     // Aqui faza verificação do status do usuario 
        const handleOpenCancelarEp = async () => {
         try {
                        const aluno = await buscarDadosAluno();
        
                        if (!aluno) {
                            alert('Dados do aluno não encontrados.');
                            return;
                        }
        
                        if (aluno.modalidade !== 'E. Profissional') {
                            alert('O cancelamento só é permitido para alunos com modalidade "E. Profissional".');
                            return;
                        }
        
                        if (aluno.status === 'Sem solicitação') {
                            alert('Não há solicitação vigente.');
                        } else if (aluno.modalidade === 'E. Profissional') {
                            setShowCancelar(true); // <- MOSTRA O MODAL DE CANCELAMENTO
                        } else {
                            alert(`Status não elegível para cancelamento: ${aluno.status}`);
                        }
                    } catch (error) {
                        console.error('Erro ao verificar o status do aluno:', error);
                        alert('Erro ao verificar o status do aluno.');
                    }
                };
        

    // Prorrogação de período do estagio
    const handleOpenRequerimentoEquiv = async () => {
         try {
                    const aluno = await buscarDadosAluno();

                        if (!aluno) {
                                alert('Dados do aluno não encontrados.');
                                return;
                            }

                        if (aluno.modalidade !== 'E. Profissional') {
                                alert('O cancelamento só é permitido para alunos com modalidade "E. Profissional".');
                                return;
                            }
                    
                        if (aluno.modalidade === 'E. Profissional' ) {
                            setShowRequerimentoEquiv(true); 
                        } else {
                            alert(`A solicitação não pode ser feita. Status atual: ${aluno.modalidade}`);
                        }
                    } catch (error) {
                        console.error('Erro ao verificar o status do aluno:', error);
                    }
                };

    const  handleOpenRelatorioEp = async () => {
         try {
                    const aluno = await buscarDadosAluno();

                        if (!aluno) {
                                alert('Dados do aluno não encontrados.');
                                return;
                            }

                        if (aluno.modalidade !== 'E. Profissional') {
                                alert('O cancelamento só é permitido para alunos com modalidade "E. Profissional".');
                                return;
                            }
                    
                        if (aluno.modalidade === 'E. Profissional' ) {
                            setShowRelatorioEp(true); 
                        } else {
                            alert(`A solicitação não pode ser feita. Status atual: ${aluno.modalidade}`);
                        }
                    } catch (error) {
                        console.error('Erro ao verificar o status do aluno:', error);
                    }
                };

    const handleOpenComprovacaoVinc = async () => {
         try {
                    const aluno = await buscarDadosAluno();

                        if (!aluno) {
                                alert('Dados do aluno não encontrados.');
                                return;
                            }

                        if (aluno.modalidade !== 'E. Profissional') {
                                alert('O cancelamento só é permitido para alunos com modalidade "E. Profissional".');
                                return;
                            }
                    
                        if (aluno.modalidade === 'E. Profissional' ) {
                            setShowComprovacaoVinc(true); 
                        } else {
                            alert(`A solicitação não pode ser feita. Status atual: ${aluno.modalidade}`);
                        }
                    } catch (error) {
                        console.error('Erro ao verificar o status do aluno:', error);
                    }
                };

    const  handleOpenCartaDescricaoAtividades = async () => {
         try {
                    const aluno = await buscarDadosAluno();

                        if (!aluno) {
                                alert('Dados do aluno não encontrados.');
                                return;
                            }

                        if (aluno.modalidade !== 'E. Profissional') {
                                alert('O cancelamento só é permitido para alunos com modalidade "E. Profissional".');
                                return;
                            }
                    
                        if (aluno.modalidade === 'E. Profissional' ) {
                            setShowCartaDescricaoAtividades(true); 
                        } else {
                            alert(`A solicitação não pode ser feita. Status atual: ${aluno.modalidade}`);
                        }
                    } catch (error) {
                        console.error('Erro ao verificar o status do aluno:', error);
                    }
                };

        

              

    const actions = {
        1: handleOpenSolicitarEstagio,
        3: handleOpenCancelarEp,
        4: handleOpenRequerimentoEquiv,
        5: handleOpenRelatorioEp,
        6: handleOpenComprovacaoVinc,
        7: handleOpenCartaDescricaoAtividades,
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
                    <h2>E.Profissional</h2>
                    <div>
                        <TitulosIcones nomeTitulo={'Solicitar E.Profissional'} />
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
                        <TitulosIcones nomeTitulo={'E.Profissional'} />
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
                    </div>
                </div>
            <SolicitarEp
                show={showSolicitarEp}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />

            <CancelarEp
                show={showCancelar}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />

            <RequerimentoEquiv
                show={showRequerimentoEquiv}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />

            <RelatorioEp
                show={showRelatorioEp}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />

            <ComprovacaoVinc
                show={showComprovacaoVinc}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />

            <CartaDescricaoAtividades
                show={showCartaDescricaoAtividades}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />

        </div>


    );
};
