import { useState } from "react"; 
import { requerimentoEquivEp } from '../../services/apiService';
import { jsPDF } from "jspdf";
import style from "./RequerimentoEquiv.module.css";

const RequerimentoEquiv = ({ show, handleClose, handleSubmit }) => {
  const [loading, setLoading] = useState(false);

  const gerarEPDFEnviar = async () => {
    setLoading(true);

    // 1. Criar o PDF com jsPDF
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Requerimento de equivalências E. Profissional", 20, 20);
    doc.setFontSize(12);
    doc.text("Esta é a Requerimento de equivalências E. Profissional.", 20, 40);

    // Gerar blob do PDF
    const pdfBlob = doc.output("blob");

    // 2. Criar FormData para envio
    const formData = new FormData();
    formData.append("arquivo", pdfBlob, "Requerimentoequivalências.pdf");

    try {
      // 3. Enviar o FormData para backend via API
      const response = await requerimentoEquivEp(formData);

      // 4. Opcional: baixar o PDF localmente no browser
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Requerimentoequivalências.pdf";
      a.click();
      window.URL.revokeObjectURL(url);

      handleSubmit?.(response);
      handleClose();
    } catch (error) {
      alert("Erro ao criar e enviar o PDF.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <h2>Requerimento de equivalências E. Profissional</h2>
        <p>Deseja realmente criar a Requerimento de equivalências E. Profissional?</p>

        <div className={style.buttonsContainer}>
          <button className={style.button} onClick={gerarEPDFEnviar} disabled={loading}>
            {loading ? "Gerando e Enviando..." : "Sim"}
          </button>
          <button className={style.button} onClick={handleClose} disabled={loading}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequerimentoEquiv;
