import { useState } from "react"; 
import { criarCartaApresIc } from '../../services/apiService';
import { jsPDF } from "jspdf";
import style from "./CartaApresentacao.module.css";

const CartaApresentacao = ({ show, handleClose, handleSubmit }) => {
  const [loading, setLoading] = useState(false);

  const gerarEPDFEnviar = async () => {
    setLoading(true);

    // 1. Criar o PDF com jsPDF
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Carta de Apresentação", 20, 20);
    doc.setFontSize(12);
    doc.text("Esta é a carta de apresentação do Orientador e do Projeto de Iniciação Científica.", 20, 40);

    // Gerar blob do PDF
    const pdfBlob = doc.output("blob");

    // 2. Criar FormData para envio
    const formData = new FormData();
    formData.append("arquivo", pdfBlob, "CartaApresentacao.pdf");

    try {
      // 3. Enviar o FormData para backend via API
      const response = await criarCartaApresIc(formData);

      // 4. Opcional: baixar o PDF localmente no browser
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CartaApresentacao.pdf";
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
        <h2>Carta apresentação I. Científica</h2>
        <p>Deseja realmente criar a Carta apresentação do Orientador e do Projeto de Iniciação Científica?</p>

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

export default CartaApresentacao;
