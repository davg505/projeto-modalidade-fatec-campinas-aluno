
import style from './Icone.module.css';

export const Icone = (props) => {

    const { sigla, nome, link } = props

    return(
        <div>
        <a href={link} className={style.IconeLink}>
        <button className={style.Icone}>
        {sigla}
        </button>
        </a>
        <i className={style.IconeNome}>{nome}</i>
        </div>
    );
};