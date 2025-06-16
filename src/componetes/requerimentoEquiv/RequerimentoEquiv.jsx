import { useState,  useEffect } from "react"; 
import { requerimentoEquivEp, buscarDadosep, buscarDadosAluno  } from '../../services/apiService';
import { jsPDF } from "jspdf";
import style from "./RequerimentoEquiv.module.css";

const RequerimentoEquiv = ({ show, handleClose, handleSubmit }) => {
  const [loading, setLoading] = useState(false);
    const [dadosEp, setDadosEp] = useState(null);
    const [dadosAlunos, setDadosAlunos] = useState(null);


  
     useEffect(() => {
            const carregarDadosAlunos = async () => {
                try {
                    const dados = await buscarDadosAluno();
                    console.log('✅ Dados ep:', dados);  // VERIFICAR
                    setDadosAlunos(dados);
                } catch (error) {
                    console.error('Erro ao carregar os dados do aluno:', error);
                }
            };
            carregarDadosAlunos();
        }, []);   


         useEffect(() => {
                  const carregarDadosep = async () => {
                      try {
                          const dados1 = await buscarDadosep();
                          console.log('✅ Dados ep:', dados1);  // VERIFICAR
                          setDadosEp(dados1);
                      } catch (error) {
                          console.error('Erro ao carregar os dados do ep:', error);
                      }
                  };
                  carregarDadosep();
              }, []);
        

  const gerarEPDFEnviar = async () => {
    setLoading(true);

     // 1. Criar o PDF com jsPDF
    const doc = new jsPDF();

    const margemX = 20;
  let y = 20;

  doc.setFontSize(16);
  doc.text("Relatorio Equivalencia", margemX, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Aluno: ${dadosAlunos.nome_do_aluno}`, margemX, y);
  y += 7;
  doc.text(`RA: ${dadosAlunos.ra}`, margemX, y);
  y += 7;
  doc.text(`Curso: ${dadosAlunos.curso}`, margemX, y);
  y += 7;
  doc.text(`Modalidade: ${dadosAlunos.modalidade}`, margemX, y);
  y += 10;

  doc.text(`Empresa: ${dadosEp.nome_da_empresa}`, margemX, y);
  y += 7;
  doc.text(`Município: ${dadosEp.municipio_empresa}`, margemX, y);
  y += 7;
  doc.text(`Supervisor: ${dadosEp.superior_imediato}`, margemX, y);
  y += 7;
  doc.text(`Telefone: ${dadosEp.tel}`, margemX, y);
  y += 7;
  doc.text(`Email da empresa: ${dadosEp.email}`, margemX, y);
  y += 7;
  doc.text(`Área de Atuação: ${dadosEp.area_atuacao}`, margemX, y);
  y += 7;
  doc.text(`Data de Início: ${new Date(dadosEp.data_incio_atuacao).toLocaleDateString()}`, margemX, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Descrição das Atividades:", margemX, y);
  y += 8;
  doc.setFont("helvetica", "normal");

  const descricao = doc.splitTextToSize(dadosEp.descricao_atividade, 170);
  doc.text(descricao, margemX, y);
    // Gerar blob do PDF
    const pdfBlob = doc.output("blob");

    // 2. Criar FormData para envio
    const formData = new FormData();
    formData.append("arquivo", pdfBlob, `Requerimentoequivalências-${dadosAlunos.ra}.pdf`);
     formData.append("idAluno", dadosAlunos.id);

    try {
      // 3. Enviar o FormData para backend via API
      const response = await requerimentoEquivEp(formData);

      // 4. Opcional: baixar o PDF localmente no browser
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download =`Requerimentoequivalências-${dadosAlunos.ra}.pdf`;
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
        <h3>Requerimento de equivalências E. Profissional</h3>
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
