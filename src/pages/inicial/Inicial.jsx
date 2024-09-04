import { MenuRetravel } from '../../componetes';
import style from './Inicial.module.css';

export const Inicial = () => {
    return (
        <div className={style.Inicial}>
            <div className={style.Menu}>
                <MenuRetravel />
            </div>
            <div className={style.Title}>
                <h1>Área Aluno</h1>
            </div>
        </div>
    );
};