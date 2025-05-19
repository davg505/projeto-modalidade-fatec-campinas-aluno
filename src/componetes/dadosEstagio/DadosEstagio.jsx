import { useState } from "react"; 
import { adicionarDadosEstagio } from '../../services/apiService';
import style from "./DadosEstagio.module.css"; // Importe o arquivo CSS

// eslint-disable-next-line react/prop-types
export const DadosEstagio = ({ show, handleClose, handleSubmit }) => {

    const [valor, setValor] = useState("");
    const [horasSemanais, setHorasSemanais] = useState("");
    const [horasEntrada, setHorasEntrada] = useState("");
    const [horasSaida, setHorasSaida] = useState("");
    const [horasRefeicao, setHorasRefeicao] = useState("");
    const [seguradora, setSeguradora] = useState("");
    const [apolice, setApolice] = useState("");

    const onSubmit = async () => {
        const dadosEstagio = {
            valor: valor,
            horas_semanais: horasSemanais,
            horas_entrada: horasEntrada,
            horas_saida: horasSaida,
            horas_refeicao: horasRefeicao,
            seguradora: seguradora,
            numero_apolice: apolice,
        };
    
        try {
            const resposta = await adicionarDadosEstagio(dadosEstagio);
            console.log('Resposta da API:', resposta);
    
            handleSubmit(resposta);
            handleClose();
        } catch (error) {
            console.error('Erro ao enviar dados do estágio:', error);
            // Você pode exibir um alerta ou mensagem de erro aqui para o usuário
        }
    };
    

    if (!show) return null;

    const handleValorChange = (e) => {
        const valorDigitado = e.target.value;
        const valorNumerico = valorDigitado.replace(/[^\d,]/g, '');
        setValor(valorNumerico);
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <h2>Dados do Estágio</h2>

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
                    <label>Horas Semanais:</label>
                    <input
                        className={style.input}
                        type="number"
                        value={horasSemanais}
                        onChange={(e) => setHorasSemanais(e.target.value)}
                    />
                </div>

                <div className={style.labelContainer}>
                    <label>Hora Entrada (HH:MM):</label>
                    <input
                        className={style.input}
                        type="time"
                        value={horasEntrada}
                        onChange={(e) => setHorasEntrada(e.target.value)}
                    />
                </div>

                <div className={style.labelContainer}>
                    <label>Hora Saída (HH:MM):</label>
                    <input
                        className={style.input}
                        type="time"
                        value={horasSaida}
                        onChange={(e) => setHorasSaida(e.target.value)}
                    />
                </div>

                <div className={style.labelContainer}>
                    <label>Hora Refeição (HH:MM):</label>
                    <input
                        className={style.input}
                        type="time"
                        value={horasRefeicao}
                        onChange={(e) => setHorasRefeicao(e.target.value)}
                    />
                </div>

                  <div className={style.labelContainer}>
                                    <label>Nome da seguradora:</label>
                                    <input
                                        className={style.input}
                                        type="text"
                                        value={seguradora}
                                        onChange={(e) => setSeguradora(e.target.value)}
                                    />
                    </div>

                    
                  <div className={style.labelContainer}>
                                    <label> Apólice de Seguro nº:</label>
                                    <input
                                        className={style.input}
                                        type="text"
                                        value={apolice}
                                        onChange={(e) => setApolice(e.target.value)}
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
