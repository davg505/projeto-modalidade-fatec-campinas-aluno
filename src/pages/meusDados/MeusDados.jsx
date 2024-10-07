import { MenuDados, MenuRetravel } from '../../componetes';
import style from './MeusDados.module.css';



export const MeusDados = () => {
    return (
        <div className={style.Dados}>
            <div className={style.Menu}>
                <MenuRetravel />
            </div>
            <div className={style.MenuDosDados}>
                <MenuDados/>
            </div>
        </div>
    );
};