import { useState } from "react";
//import { UseAppContext } from "../../hooks";
import style from "./JanelaPPeriodo.module.css"; // Importe o arquivo CSS

// eslint-disable-next-line react/prop-types
export const JanelaPPeriodo = ({ show, handleClose, handleSubmit }) => {
  const [dataProrroga, setDataProrroga] = useState("");
  const [seguro, setSeguro] = useState("");
  const [seguradora, setSeguradora] = useState("");
  const [valor, setValor] = useState("");

  

  //const { adicionarSolicitacaoEstagio,  editarSolicitacaoEstagio } = UseAppContext();

  const onSubmit = () => {
    const prorroga = {
      dataProrroga,
      seguro,
      seguradora,
      valor,
    };

  
   // adicionarSolicitacaoEstagio(prorroga); // Chama a função para enviar a solicitação
   // editarSolicitacaoEstagio(prorroga); // Chama a função para enviar a solicitação
    handleSubmit(prorroga); // Se ainda precisar dessa função
    handleClose(); // Fecha o modal após o envio
  };

  if (!show) return null;


  const handleValorChange = (e) => {
    const valorDigitado = e.target.value;

    // Remover qualquer caractere que não seja número ou vírgula/ponto
    const valorNumerico = valorDigitado.replace(/[^\d,]/g, '');

    // Atualizar o estado
    setValor(valorNumerico);
};


  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <h2>Prorrogação período</h2>

        <div className={style.labelContainer}>
          <label>Termo Aditivo prorroga até o dia:</label>
          <input
            className={style.input}
            type="date"
            value={dataProrroga}
            onChange={(e) => setDataProrroga(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
            <label>Apólice de Seguro nº:</label>
            <input
            className={style.input}
            type="text"
            value={seguro}
            onChange={(e) => setSeguro(e.target.value)}
            />
        </div>

        <div className={style.labelContainer}>
            <label>Seguradora:</label>
            <input
            className={style.input}
            type="text"
            value={seguradora}
            onChange={(e) => setSeguradora(e.target.value)}
            />
        </div>

        <div className={style.labelContainer}>
            <label>Bolsa Auxílio no valor de R$ (0,00):</label>
            <input
                className={style.input}
                type="text"
                value={valor}
                onChange={handleValorChange}
                placeholder="0,00"
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
