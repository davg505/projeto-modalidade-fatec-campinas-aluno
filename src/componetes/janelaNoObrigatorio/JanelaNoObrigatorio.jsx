import { useState } from "react";
//import { UseAppContext } from "../../hooks";
import style from "./JanelaNoObrigatorio.module.css"; // Importe o arquivo CSS

// eslint-disable-next-line react/prop-types
export const JanelaNoObrigatorio = ({ show, handleClose, handleSubmit }) => {
  const [dataAlterada, setDataAlterada] = useState("");
  const [valor, setValor] = useState("");

  //const { adicionarSolicitacaoEstagio,  editarSolicitacaoEstagio } = UseAppContext();

  const onSubmit = () => {
    const altera = {
      dataAlterada,
      valor,
    };

  
   // adicionarSolicitacaoEstagio(prorroga); // Chama a função para enviar a solicitação
   // editarSolicitacaoEstagio(prorroga); // Chama a função para enviar a solicitação
    handleSubmit(altera); // Se ainda precisar dessa função
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
        <h2>Estágio não obrigatório para obrigatório</h2>

        <div className={style.labelContainer}>
          <label>Altera a modalidade de estágio não obrigatório para obrigatório a partir de:</label>
          <input
            className={style.input}
            type="date"
            value={dataAlterada}
            onChange={(e) => setDataAlterada(e.target.value)}
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
