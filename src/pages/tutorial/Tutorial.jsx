import { CaixaDosTutorial, MenuRetravel } from '../../componetes';
import style from './Tutorial.module.css';



export const Tutorial = () => {
    return (
        <div className={style.Tutorial}>
            <div className={style.Menu}>
                <MenuRetravel />
            </div>
            <div className={style.conteudo}> 
                <h1 className={style.Title2}>Tutorial</h1>
                <CaixaDosTutorial />
            </div>
        </div>
    );
};