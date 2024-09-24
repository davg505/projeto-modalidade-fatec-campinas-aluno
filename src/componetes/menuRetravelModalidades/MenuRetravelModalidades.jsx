import { useState } from "react";
import { UseAppContext } from "../../hooks";
import { Api } from '../../services/Api';
import { Icone } from "../icone";
import SolicitarEstagio from "../solicitarEstagio/SolicitarEstagio";
import style from './MenuRetravelModalidades.module.css';
import { TitulosIcones } from "./titulosIcones";

export const MenuRetravelModalidade = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [showSolicitarEstagio, setShowSolicitarEstagio] = useState(false); // Estado para controlar a exibição da janela
    const [showEditarSolicitacaoEstagio, setShowEditarSolicitacaoEstagio] = useState(false); 

    const { iconesEstagio, cancelarSolicitacaoEstagio } = UseAppContext();


    // Seleciona para estagio.
    const iconesInicio = iconesEstagio.filter(item => item.id === 1 || item.id === 3 );
    const iconesDurante = iconesEstagio.filter(item => item.id === 4 || item.id === 5 || item.id === 6);
    const iconesFinal = iconesEstagio.filter(item => item.id === 7 || item.id === 8 || item.id === 9);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleEditarSolicitacaoEstagio = async () => {
        try {
            const { data } = await Api.get('/aluno');
            const aluno = data[0]; // Assumindo que o primeiro aluno retornado é o que você quer verificar.

            if (aluno.status === 'Enviado Solicitação') {
                setShowEditarSolicitacaoEstagio(true); // Abre a janela se o status for 'Sem solicitação'
            } else {
                alert(`A solicitação não pode ser feita. Status atual: ${aluno.status}`);
            }
        } catch (error) {
            console.error('Erro ao verificar o status do aluno:', error);
        }
    };

    const handleCloseEditarSolicitacaoEstagio = () => {
        setShowEditarSolicitacaoEstagio(false); // Fecha a janela
    };

    const handleSubmitEditarSolicitacaoEstagio = (data) => {
        console.log("Dados do estágio enviados:", data);
        setShowEditarSolicitacaoEstagio(false); // Fecha a janela após o envio
    };

    // Aqui faza verificação do status do usuario 
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
        setShowSolicitarEstagio(false); // Fecha a janela
    };

    const handleSubmitEstagio = (data) => {
        console.log("Dados do estágio enviados:", data);
        setShowSolicitarEstagio(false); // Fecha a janela após o envio
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

    const actions = {
        1: handleOpenSolicitarEstagio,
        2: handleEditarSolicitacaoEstagio,
        3: handleOpenCancelarEstagio,
        
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
        <div className={style.MenuRetravel}>
            <button 
                onClick={toggleMenu}
                className={style.Trapezio}
            >
                Estágio
            </button>
            {showMenu && (
                <div className={style.Menu}>
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
            )}

            <SolicitarEstagio
                show={showSolicitarEstagio}
                handleClose={handleCloseSolicitarEstagio}
                handleSubmit={handleSubmitEstagio}
            />

            <SolicitarEstagio
                show={showEditarSolicitacaoEstagio}
                handleClose={handleCloseEditarSolicitacaoEstagio}
                handleSubmit={handleSubmitEditarSolicitacaoEstagio}
            />
        </div>
    );
};
