import style from './Icone.module.css';

export const Icone = (props) => {

    const { sigla, nome } = props

    return(
        <div>
        <button className={style.Icone}>
            {sigla}
        </button>
        <i className={style.IconeNome}>{nome}</i>
        </div>
    );
};