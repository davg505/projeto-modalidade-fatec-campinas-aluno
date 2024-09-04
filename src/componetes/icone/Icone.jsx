
import { Link } from 'react-router-dom';
import style from './Icone.module.css';

export const Icone = (props) => {

    const { sigla, nome, link } = props

    return(
        <div>
        <Link to={link} className={style.IconeLink}>
        <button className={style.Icone}>
        {sigla}
        </button>
        </Link>
        <i className={style.IconeNome}>{nome}</i>
        </div>
    );
};

