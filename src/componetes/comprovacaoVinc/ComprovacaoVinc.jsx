import { useState } from "react";
import { comprovanteVincEp } from '../../services/apiService';
import style from "./ComprovacaoVinc.module.css";

const ComprovacaoVinc = ({ show, handleClose, handleSubmit }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);

  const handleSimClick = () => {
    setStep(2); // Avança para a etapa de upload
  };

 const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  console.log('Arquivo selecionado:', selectedFile);
  setFile(selectedFile); // ESSENCIAL
};

 const handleUpload = async () => {
  if (!file) {
    alert("Por favor, selecione um arquivo PDF.");
    return;
  }

  try {
    const response = await comprovanteVincEp(file); // envia só o arquivo
    handleSubmit?.(response);
    handleClose();
  } catch (error) {
    console.error("Erro ao enviar o relatório:", error);
    alert("Erro ao enviar o relatório. Tente novamente.");
  }
};

  if (!show) return null;

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <h2>Comprovação vínculo trabalho E.Profissional</h2>

        {step === 1 && (
          <>
            <p>Deseja enviar arquivos Comprovação vínculo trabalho E.Profissional?</p>
            <div className={style.buttonsContainer}>
              <button className={style.button} onClick={handleSimClick}>Sim</button>
              <button className={style.button} onClick={handleClose}>Não</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p>Selecione o arquivo PDF do Comprovação vínculo trabalho:</p>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <div className={style.buttonsContainer}>
              <button className={style.button} onClick={handleUpload}>Enviar</button>
              <button className={style.button} onClick={handleClose}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComprovacaoVinc;
