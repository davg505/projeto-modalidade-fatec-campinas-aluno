import { useState, useEffect } from "react"; 
import { criarCartaApresIc, buscarDadosic, buscarDadosAluno } from '../../services/apiService';
import { jsPDF } from "jspdf";
import style from "./CartaApresentacao.module.css";

const CartaApresentacao = ({ show, handleClose, handleSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [dadosIc, setDadosIc] = useState(null);
  const [dadosAlunos, setDadosAlunos] = useState(null);

  useEffect(() => {
    const carregarDadosic = async () => {
      try {
        const dados = await buscarDadosic();
        setDadosIc(dados);
      } catch (error) {
        console.error("Erro ao carregar os dados do IC:", error);
      }
    };
    carregarDadosic();
  }, []);

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

  const gerarEPDFEnviar = async () => {
    setLoading(true);

    if (!dadosIc || !dadosAlunos) {
      alert("Dados do projeto ou aluno não carregados.");
      setLoading(false);
      return;
    }

    const {
      instituicao_centro_pesquisa,
      tema,
      data_inicial,
      data_final,
      orientador,
      horario,
      dias_da_semana,
      descricao_atividade,
    } = dadosIc;

    const {
      nome_do_aluno,
      email,
      ra,
      curso,
      status,
      modalidade,
      telefone,
      id,
    } = dadosAlunos;

    const doc = new jsPDF();
    const margemX = 20;
    let y = 20;

    doc.setFontSize(16);
    doc.text("Carta de Apresentação – Iniciação Científica", margemX, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Aluno: ${nome_do_aluno}`, margemX, y); y += 7;
    doc.text(`RA: ${ra}`, margemX, y); y += 7;
    doc.text(`Curso: ${curso}`, margemX, y); y += 7;
    doc.text(`Modalidade: ${modalidade}`, margemX, y); y += 7;
    doc.text(`Status: ${status}`, margemX, y); y += 10;

    doc.text(`Instituição/Centro de Pesquisa: ${instituicao_centro_pesquisa}`, margemX, y); y += 7;
    doc.text(`Tema do Projeto: ${tema}`, margemX, y); y += 7;
    doc.text(`Orientador(a): ${orientador}`, margemX, y); y += 7;
    doc.text(`Período: ${data_inicial} a ${data_final}`, margemX, y); y += 7;
    doc.text(`Dias da Semana: ${dias_da_semana}`, margemX, y); y += 7;
    doc.text(`Horário: ${horario}`, margemX, y); y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Descrição das Atividades:", margemX, y); y += 8;
    doc.setFont("helvetica", "normal");

    const descricao = doc.splitTextToSize(descricao_atividade, 170);
    doc.text(descricao, margemX, y);
    y += descricao.length * 7 + 10;

    const contatos = `Contato do aluno: ${email} | ${telefone}`;
    const rodape = "Coordenação de Iniciação Científica - FATEC Campinas";

    doc.setFont("helvetica", "italic");
    doc.text(contatos, margemX, y); y += 10;
    doc.text(rodape, margemX, y);

    // Gerar blob do PDF
    const pdfBlob = doc.output("blob");

    // Criar FormData para envio
    const formData = new FormData();
    formData.append("arquivo", pdfBlob, `cartadeapresentacaoic-${ra}.pdf`);
    formData.append("idAluno", id);

    try {
      const response = await criarCartaApresIc(formData);

      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cartadeapresentacaoic-${ra}.pdf`;
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
        <h3>Carta de Apresentação – Iniciação Científica</h3>
        <p>Deseja realmente criar a Carta de Apresentação do projeto de Iniciação Científica?</p>

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
