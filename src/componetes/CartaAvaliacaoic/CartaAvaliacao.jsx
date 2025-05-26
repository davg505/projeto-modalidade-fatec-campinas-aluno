import { CriarCartaAvalIc } from '../../services/apiService';
import style from "./CartaAvaliacao.module.css"; // Importe o arquivo CSS

// eslint-disable-next-line react/prop-types
const CartaAvaliacao = ({ show, handleClose, handleSubmit }) => {

  const onConfirmCancel = () => {
    const solicitacao = {}; // Inclua os dados necessários aqui, se houver

    CriarCartaAvalIc(solicitacao); // Chama a função para cancelar a solicitação
    handleSubmit?.(solicitacao); // Se necessário
    handleClose(); // Fecha o modal após o envio
  };

  if (!show) return null;

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <h2>Carta Avaliação I. Científica</h2>
        <p>Deseja realmente criar a Carta Avaliação Orientador I. Científica?</p>

        <div className={style.buttonsContainer}>
          <button className={style.button} onClick={onConfirmCancel}>
            Sim
          </button>
          <button className={style.button} onClick={handleClose}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartaAvaliacao;
