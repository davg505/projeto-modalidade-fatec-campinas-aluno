import { useState, useEffect } from "react";
import { UseAppContext } from "../../hooks";
import { Api } from '../../services/Api';
import { Icone } from "../icone";
import style from './MenuRetravelModalidadesic.module.css';
import { TitulosIcones } from "./titulosIcones";
import SolicitarIc from "../solicitarIc/SolicitarIc";
import CartaApresentacao from "../cartaApresentacaoic/cartaApresentacao";
import CartaAvaliacao from "../CartaAvaliacaoic/CartaAvaliacao";
import RelatorioIc from "../relatoriosic/RelatorioIc";
import CancelarIc from "../cancelarSolicitacao/CancelarIc";
import {buscarDadosAluno, buscarDadosrelatoriosic} from '../../services/apiService';


// eslint-disable-next-line react/prop-types
export const MenuRetravelModalidadeic = () => {
    const { iconesIc, cancelarSolicitacaoEstagio } = UseAppContext();
    const [showSolicitarEstagio, setShowSolicitarEstagio] = useState(false);
    const [showCancelar, setShowCancelar] = useState(false);
    const [showCartaApresentacao, setshowCartaApresentacao] = useState(false);
    const [showCartaAvaliacao, setshowCartaAvaliacao] = useState(false);
    const [showRelatorios, setshowRelatorios] = useState(false);
    const [dadosIc, setDadosIc] = useState(null);

    const iconesInicio = iconesIc.filter(item => item.id === 1 || item.id === 3);
    const iconesDurante = iconesIc.filter(item => item.id === 4);
    const iconesFinal = iconesIc.filter(item => item.id === 5 || item.id === 6);

       useEffect(() => {
                  const carregarDadosic = async () => {
                      try {
                          const dados1 = await buscarDadosrelatoriosic();
                          console.log('✅ Dados ep:', dados1);  // VERIFICAR
                          setDadosIc(dados1);
                      } catch (error) {
                          console.error('Erro ao carregar os dados do ep:', error);
                      }
                  };
                  carregarDadosic();
              }, []);

    const handleOpenSolicitarEstagio = async () => {
                        try {
                        const aluno = await buscarDadosAluno();

                        if (!aluno) {
                            alert('Dados do aluno não encontrados.');
                            return;
                        }

                        const modalidade = aluno.modalidade;

                        if (modalidade === 'Estagio') {
                            alert('Você já está na modalidade Estágio.');
                            return;
                        }

                        if (modalidade === 'E. Profissional') {
                            alert('Você já está na modalidade E. Profissional.');
                            return;
                        }

                        if (modalidade === 'I. Cientifica') {
                            alert('Você já está na modalidade I. Cientifica.');
                            return;
                        }

                        if (modalidade === 'Sem Modalidade') {
                            setShowSolicitarEstagio(true); // libera processo
                            return;
                        }

                        // Caso a modalidade não seja reconhecida:
                        alert(`Modalidade "${modalidade}" não reconhecida.`);
                    } catch (error) {
                        console.error('Erro ao verificar o status do aluno:', error);
                        alert('Erro ao verificar os dados do aluno.');
                    }
                };


    const handleCloseSolicitarEstagio = () => {
        setShowSolicitarEstagio(false); 
        setShowCancelar(false); 
        setshowCartaApresentacao(false);// Fecha a janela
        setshowCartaAvaliacao(false);
        setshowRelatorios(false);
        
    };
    const handleSubmitEstagio = (data) => {
        console.log("Dados do estágio enviados:", data);
        setShowSolicitarEstagio(false); // Fecha a janela após o envio
        setShowCancelar(false); 
        setshowCartaApresentacao(false);// Fecha a janela
        setshowCartaAvaliacao(false);
        setshowRelatorios(false);
       
    };



     // Aqui faza verificação do status do usuario 
       const handleOpenCancelarEstagio = async () => {
            try {
                const aluno = await buscarDadosAluno();

                if (!aluno) {
                    alert('Dados do aluno não encontrados.');
                    return;
                }

                if (aluno.modalidade !== 'I. Cientifica') {
                    alert('O cancelamento só é permitido para alunos com modalidade "I. Cientifica".');
                    return;
                }

                if (aluno.status === 'Sem solicitação') {
                    alert('Não há solicitação vigente.');
                } else if (aluno.modalidade === 'I. Cientifica') {
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
    const handleOpenCartaApresentacao = async () => {
        try {
            const aluno = await buscarDadosAluno();

              if (!aluno) {
                    alert('Dados do aluno não encontrados.');
                    return;
                }

             if (aluno.modalidade !== 'I. Cientifica') {
                    alert('O cancelamento só é permitido para alunos com modalidade "I. Cientifica".');
                    return;
                }
        
            if (aluno.modalidade === 'I. Cientifica' ) {
                setshowCartaApresentacao(true); 
            } else {
                alert(`A solicitação não pode ser feita. Status atual: ${aluno.modalidade}`);
            }
        } catch (error) {
            console.error('Erro ao verificar o status do aluno:', error);
        }
    };

        // TERMO ADITIVO - Estágio não obrigatório para obrigatório
        const handleOpenCartaAvaliacao = async () => {
            try {
                    const aluno = await buscarDadosAluno();

                        if (!aluno) {
                                alert('Dados do aluno não encontrados.');
                                return;
                            }

                        if (aluno.modalidade !== 'I. Cientifica') {
                                alert('O cancelamento só é permitido para alunos com modalidade "I. Cientifica".');
                                return;
                            }
                    
                        if (aluno.modalidade === 'I. Cientifica' ) {
                            setshowCartaAvaliacao(true); 
                        } else {
                            alert(`A solicitação não pode ser feita. Status atual: ${aluno.modalidade}`);
                        }
                    } catch (error) {
                        console.error('Erro ao verificar o status do aluno:', error);
                    }
                };

                // RESCISÃO DE TERMO DE COMPROMISSO DE ESTÁGIO
                const handleOpenRelatorioIc = async () => {
                            try {
                            const aluno = await buscarDadosAluno();

                    if (!aluno) {
                            alert('Dados do aluno não encontrados.');
                            return;
                        }

                    if (aluno.modalidade !== 'I. Cientifica') {
                            alert('O cancelamento só é permitido para alunos com modalidade "I. Cientifica".');
                            return;
                        }
                
                    if (aluno.modalidade === 'I. Cientifica' ) {
                        setshowRelatorios(true); 
                    } else {
                        alert(`A solicitação não pode ser feita. Status atual: ${aluno.modalidade}`);
                    }
                } catch (error) {
                    console.error('Erro ao verificar o status do aluno:', error);
        }
                };

    const actions = {
        1: handleOpenSolicitarEstagio,
        3: handleOpenCancelarEstagio,
        4: handleOpenCartaApresentacao,
        5: handleOpenCartaAvaliacao,
        6: handleOpenRelatorioIc,
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
                    <h2>I.Cientifica</h2>
                    <div>
                        <TitulosIcones nomeTitulo={'Solicitar I.Cientifica'} />
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
                        <TitulosIcones nomeTitulo={'Inicio I.Cientifica'} />
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
                        <TitulosIcones nomeTitulo={'Entregas I.Cientifica'} />
                        <div className={style['menu-icones']}>
                            {iconesFinal.map(item => (
                                <Icone
                                    key={item.id}
                                    id={item.id}
                                    sigla={item.sigla}
                                    nome={item.nome}
                                    onClick={() => handleClick(item.id)} // <- Correção aqui
                                />
                            ))}
                        </div>
                    </div>
                </div>
            <SolicitarIc
                show={showSolicitarEstagio}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />

            <CancelarIc
                show={showCancelar}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />

            <CartaApresentacao
                show={showCartaApresentacao}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />
            <CartaAvaliacao
                show={showCartaAvaliacao}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />
            <RelatorioIc
                show={showRelatorios}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}

            />

        </div>


    );
};
