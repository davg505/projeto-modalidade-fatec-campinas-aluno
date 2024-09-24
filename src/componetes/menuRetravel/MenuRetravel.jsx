import { useState } from "react";
import { UseAppContext } from "../../hooks";
import { Icone } from "../icone";
import style from './MenuRetravel.module.css';
import { TitulosIcones } from "./titulosIcones";

export const MenuRetravel = () => {
    const [showMenu, setShowMenu] = useState(false);

    const {  iconesAluno } = UseAppContext();

      // Seleciona dois ícones para "Minha área"
    const iconesMinhaArea = iconesAluno.filter(item => item.id === 4 || item.id === 5);

      // Seleciona três ícones para "Modalidades"
    const iconesModalidades = iconesAluno.filter(item => item.id === 1 || item.id === 2 || item.id === 3 );
    
      // Seleciona três ícones para "Modalidades"
    const iconesTutoria = iconesAluno.filter(item => item.id === 6);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return(
        <div className={style.MenuRetravel}>
            <button 
            onClick={toggleMenu}
            className={style.Trapezioinvertido}
            >
            Menu
            </button >
            {showMenu && (
                <div className={style.Menu}>
                <h2>Ola, Aluno. Bem Vindo!</h2> 
                <div>
                    <TitulosIcones nomeTitulo={'Minha área'}/>
                    <div className={style['menu-icones']}>
                        {iconesMinhaArea.map(item => (
                            <Icone
                                key={item.id}
                                id={item.id}
                                sigla={item.sigla}
                                nome={item.nome}
                            />
                        ))}
                    </div>

                    <TitulosIcones nomeTitulo={'Modalidades'}/>
                    <div className={style['menu-icones']}>
                        {iconesModalidades.map(item => (
                            <Icone
                                key={item.id}
                                id={item.id}
                                sigla={item.sigla}
                                nome={item.nome}
                                link={item.link}
                            />
                        ))}
                    </div>

                    <TitulosIcones nomeTitulo={'Tutorial'}/>
                    <div className={style['menu-icones']}>
                        {iconesTutoria.map(item => (
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