import style from './BotaoTrapezio.module.css';

// eslint-disable-next-line react/prop-types
export const BotaoTrapezio = ({ toggleMenu, text }) => {

    return (
        <div className={style.MenuRetravel}>
            <button 
                onClick={toggleMenu} 
                className={style.Trapezioinvertido}
            >
                {text}
            </button>
            </div>
    );
};