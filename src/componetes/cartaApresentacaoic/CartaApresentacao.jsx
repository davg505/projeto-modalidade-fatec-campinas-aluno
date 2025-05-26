import { CriarCartaApresIc } from '../../services/apiService';
import style from "./CartaApresentacao.module.css"; // Importe o arquivo CSS

// eslint-disable-next-line react/prop-types
const CartaApresentacao = ({ show, handleClose, handleSubmit }) => {

  const onConfirmCancel = () => {
    const solicitacao = {}; // Inclua os dados necessários aqui, se houver

    CriarCartaApresIc(solicitacao); // Chama a função para cancelar a solicitação
    handleSubmit?.(solicitacao); // Se necessário
    handleClose(); // Fecha o modal após o envio
  };

  if (!show) return null;

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <h2>Carta apresentação I. Científica</h2>
        <p>Deseja realmente criar a Carta apresentação do Orientador e do Projeto de Iniciação Científica?</p>

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

export default CartaApresentacao;
