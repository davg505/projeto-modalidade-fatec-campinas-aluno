import { useState } from "react";
import { UseAppContext } from "../../hooks";
import { Icone } from "../icone";
import SolicitarEstagio from "../solicitarEstagio/SolicitarEstagio";
import style from './MenuRetravelModalidades.module.css';
import { TitulosIcones } from "./titulosIcones";

// eslint-disable-next-line react/prop-types
export const MenuRetravelModalidade = () => {
    const { iconesEstagio } = UseAppContext();
    const [showSolicitarEstagio, setShowSolicitarEstagio] = useState(false);

    const iconesInicio = iconesEstagio.filter(item => item.id === 1 || item.id === 3);
    const iconesDurante = iconesEstagio.filter(item => item.id === 4 || item.id === 5 || item.id === 6);
    const iconesFinal = iconesEstagio.filter(item => item.id === 7 || item.id === 8 || item.id === 9);

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
            <SolicitarEstagio
                show={showSolicitarEstagio}
                handleClose={() => setShowSolicitarEstagio(false)}
            />
        </div>
    );
};
