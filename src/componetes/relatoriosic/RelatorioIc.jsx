import { useState,  useEffect } from "react";
import { relatorioFinal, buscarDadosAluno } from '../../services/apiService';
import style from "./RelatorioIc.module.css";

const RelatorioIc = ({ show, handleClose, handleSubmit }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [dadosAlunos, setDadosAlunos] = useState(null);


  useEffect(() => {
        const carregarDadosAluno = async () => {
          try {
            const dados = await buscarDadosAluno();
            setDadosAlunos(dados);
          } catch (error) {
            console.error("Erro ao carregar os dados do aluno:", error);
          }
        };
        carregarDadosAluno();
      }, []);

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

  const formData = new FormData();
          formData.append('arquivo', file);
          formData.append("idAluno", dadosAlunos.id);

  try {
    const response = await relatorioFinal(formData); // envia só o arquivo
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
        <h3>Relatório Final Iniciação Científica</h3>

        {step === 1 && (
          <>
            <p>Deseja enviar o relatório final iniciação científica?</p>
            <div className={style.buttonsContainer}>
              <button className={style.button} onClick={handleSimClick}>Sim</button>
              <button className={style.button} onClick={handleClose}>Não</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p>Selecione o arquivo PDF do relatório final:</p>
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

export default RelatorioIc;
