import { useState } from "react";
import { UseAppContext } from "../../hooks";
import style from "./DadosEstagio.module.css"; // Importe o arquivo CSS

// eslint-disable-next-line react/prop-types
export const DadosEstagio = ({ show, handleClose, handleSubmit }) => {

    const [valor, setValor] = useState("");
    const [semana, setSemana] = useState("");
    const [entrada, setEntrada] = useState("");
    const [saida, setSaida] = useState("");
    const [refeicao, setRefeicao] = useState("");

    const { adicionarDadosEstagioAluno } = UseAppContext();

    const onSubmit = () => {
    const dadosEmpresaEstagio = {
        valor,
        semana,
        entrada,
        saida,
        refeicao,
    };
    
    adicionarDadosEstagioAluno(dadosEmpresaEstagio);
    handleSubmit(dadosEmpresaEstagio);
    handleClose();
    };

    if (!show) return null;


    const handleValorChange = (e) => {
        const valorDigitado = e.target.value;

        // Remover qualquer caractere que não seja número ou vírgula/ponto
        const valorNumerico = valorDigitado.replace(/[^\d,]/g, '');

        // Atualizar o estado
        setValor(valorNumerico);
    };


    return(

        <div className={style.modalBackground}>
        <div className={style.modalContainer}>
        <h2>Dados da Estagio</h2>

        <div className={style.labelContainer}>
            <label>Valor Estágio (0,00):</label>
            <input
                className={style.input}
                type="text"
                value={valor}
                onChange={handleValorChange}
                placeholder="0,00"
            />
        </div>

        <div className={style.labelContainer}>
            <label>Horas Semanais :</label>
            <input
            className={style.input}
            type="number"
            value={semana}
            onChange={(e) => setSemana(e.target.value)}
            />
        </div>

        <div className={style.labelContainer}>
            <label>Hora Entrada (HH:MM):</label>
            <input
            className={style.input}
            type="time"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            />
        </div>

        <div className={style.labelContainer}>
            <label>Hora Saida (HH:MM) :</label>
            <input
            className={style.input}
            type="time"
            value={saida}
            onChange={(e) => setSaida(e.target.value)}
            />
        </div>

        <div className={style.labelContainer}>
            <label>Hora Refeição (HH:MM) :</label>
            <input
            className={style.input}
            type="time"
            value={refeicao}
            onChange={(e) => setRefeicao(e.target.value)}
            />
        </div>

        <div className={style.buttonsContainer}>
            <button className={style.button} onClick={onSubmit}>
            Enviar
            </button>
            <button className={style.button} onClick={handleClose}>
            Cancelar
            </button>
        </div>
        </div>
    </div>

    );

    };