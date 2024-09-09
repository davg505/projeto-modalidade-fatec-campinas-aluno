import { useState } from "react";
import { UseAppContext } from "../../hooks";
import { Icone } from "../icone";
import SolicitarEstagio from "../solicitarEstagio/SolicitarEstagio";
import style from './MenuRetravelModalidades.module.css';
import { TitulosIcones } from "./titulosIcones";

export const MenuRetravelModalidade = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSolicitarEstagio, setShowSolicitarEstagio] = useState(false); // Estado para controlar a exibição da janela

    const { iconesEstagio } = UseAppContext();

    // Seleciona para estagio.
    const iconesInicio = iconesEstagio.filter(item => item.id === 1 || item.id === 2 || item.id === 3);
    const iconesDurante = iconesEstagio.filter(item => item.id === 4 || item.id === 5 || item.id === 6);
    const iconesFinal = iconesEstagio.filter(item => item.id === 7 || item.id === 8 || item.id === 9);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleOpenSolicitarEstagio = () => {
        setShowSolicitarEstagio(true); // Abre a janela
    };

    const handleCloseSolicitarEstagio = () => {
        setShowSolicitarEstagio(false); // Fecha a janela
    };

    const handleSubmitEstagio = (data) => {
        console.log("Dados do estágio enviados:", data);
        setShowSolicitarEstagio(false); // Fecha a janela após o envio
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
                    <h1>Estágio</h1>
                    <div>
                        <TitulosIcones nomeTitulo={'Início estágio'} />
                        <div className={style['menu-icones']}>
                            {iconesInicio.map(item => (
                                <Icone
                                    key={item.id}
                                    id={item.id}
                                    sigla={item.sigla}
                                    nome={item.nome}
                                    onClick={item.id === 1 ? handleOpenSolicitarEstagio : null} // Abre a janela apenas no ícone com id 1
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
        </div>
    );
};
