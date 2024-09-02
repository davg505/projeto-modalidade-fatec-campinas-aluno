import { CaixaBotao, MenuRetravel } from '../../componetes'
import style from './Estagio.module.css'

export const Estagio = () => {
    return (
        <div className={style.Estagio}>
            <div className={style.Menu}>
                <MenuRetravel />
            </div>
            <div className={style.Caixa}>
                <h1 className={style.Title}>Área Aluno</h1>
                <CaixaBotao className={style.Caixa2} />
            </div>
        </div>
    )
}  