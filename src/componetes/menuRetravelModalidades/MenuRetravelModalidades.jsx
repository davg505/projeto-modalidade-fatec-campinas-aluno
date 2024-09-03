import { useState } from "react";
import { UseAppContext } from "../../hooks";
import { Icone } from "../icone";
import style from './MenuRetravelModalidades.module.css';
import { TitulosIcones } from "./titulosIcones";

export const MenuRetravelModalidade = () => {
    const [showMenu, setShowMenu] = useState(false);

    const { iconesEstagio } = UseAppContext();

      // Seleciona para estagio. 
      const iconesInicio = iconesEstagio.filter(item => item.id === 1 || item.id === 2 || item.id === 3 );
      const iconesDurante = iconesEstagio.filter(item => item.id === 4 || item.id === 5 || item.id === 6 );
      const iconesFinal = iconesEstagio.filter(item => item.id === 7 || item.id === 8 || item.id === 9 );



    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return(
        <div className={style.MenuRetravel}>
            <button 
            onClick={toggleMenu}
            className={style.Trapezio}
            >
            Estágio
            </button >
            {showMenu && (
                <div className={style.Menu}>
                <h1>Estagio</h1> 
                <div>
                    <TitulosIcones nomeTitulo={'Início estágio'}/>
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

                    <TitulosIcones nomeTitulo={'Durante estágio'}/>
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

                    <TitulosIcones nomeTitulo={'Entregas finais estágio'}/>
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
            )
            }
        </div>
    );
};