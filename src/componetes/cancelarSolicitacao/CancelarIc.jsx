import { CancelarSolicitacaoIc } from '../../services/apiService';
import style from "./CancelarIc.module.css"; // Importe o arquivo CSS

// eslint-disable-next-line react/prop-types
const CancelarIc = ({ show, handleClose, handleSubmit }) => {
const onConfirmCancel = async () => {
  try {
    const result = await CancelarSolicitacaoIc(); // sem passar dados, só usa o token
    console.log('Cancelamento realizado:', result);
    handleSubmit?.(result); // retorna os dados cancelados
    handleClose();
  } catch (error) {
    console.error('Erro ao cancelar IC:', error);
    alert("Erro ao cancelar a solicitação. Tente novamente.");
  }
};

  if (!show) return null;

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <h2>Cancelar Iniciação Científica</h2>
        <p>Deseja realmente cancelar a solicitação de Iniciação Científica?</p>

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

export default CancelarIc;
