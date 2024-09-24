import { useState } from "react";
//import { UseAppContext } from "../../hooks";
import style from './MenuDados.module.css';

export const MenuDados = () => { 

    // const { botaoDados } = UseAppContext();
    const [showMenu, setShowMenu] = useState(false);

   // const listabotao = botaoDados.map(item => (item.titulo));

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

        return (

        <div>
            <div>
            <button
                onClick={toggleMenu}
                className={style.botaoDados}
            > Teste
            </button>
            {showMenu && (
                <div className={style.Menu}>
                    <button  className={style.botaoDadosEditar} >Editar</button>
                </div>
            )};
                
            </div>
        </div>
                );



}