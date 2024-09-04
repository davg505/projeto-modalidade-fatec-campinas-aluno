import { MenuRetravel, MenuRetravelModalidade, TabelaAluno } from '../../componetes'
import style from './Estagio.module.css'

export const Estagio = () => {
    return (
        <div className={style.Estagio}>
            <div className={style.Menu2}>
                <MenuRetravel />
            </div>
            <div className={style.MenuEstagio}>
                <MenuRetravelModalidade />
            </div>
            <div className={style.Caixa}>
                <h1 className={style.Title2}>Área Aluno: Modalidade Estágio</h1>
                <TabelaAluno/>
            </div>
        </div>
    )
}  