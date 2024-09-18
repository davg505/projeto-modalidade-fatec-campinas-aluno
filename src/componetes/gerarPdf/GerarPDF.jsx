import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { UseAppContext } from "../../hooks";

const GerarPDF = () => {
  const [dadosEstagio, setDadosEstagio] = useState(null);
  const { enviarDadosTermoNOR } = UseAppContext();

  // Função para buscar os dados do aluno (ou termo de compromisso)
  useEffect(() => {
    const fetchDadosEstagio = async () => {
      const aluno = await enviarDadosTermoNOR();
      if (aluno) {
        setDadosEstagio(aluno);
      }
    };

    fetchDadosEstagio();
  }, []);

  const gerarPDF = () => {
    if (!dadosEstagio) {
      console.log("Dados não carregados");
      return;
    }

    const doc = new jsPDF();

    // Título
    doc.setFontSize(14);
    doc.text("ANEXO A – Termo de Compromisso de Estágio não Obrigatório Remunerado", 10, 10);
    doc.setFontSize(12);
    doc.text("ATENÇÃO: Rubricar todas as páginas e assinar na última.", 10, 20);

    // Texto principal com placeholders preenchidos
    const texto = `
    TERMO DE COMPROMISSO PARA A REALIZAÇÃO DE ESTÁGIO SUPERVISIONADO NÃO OBRIGATÓRIO (REMUNERADO) (Lei nº 11.778/08)
    
    P ${dadosEstagio.nomeDoAluno} (Concedente), inscrita no CNPJ sob o nº ${dadosEstagio.nomeDoAluno}, 
    `;

      /*{const texto = `
      TERMO DE COMPROMISSO PARA A REALIZAÇÃO DE ESTÁGIO SUPERVISIONADO NÃO OBRIGATÓRIO (REMUNERADO) (Lei nº 11.778/08)
      
      Pelo presente instrumento, as partes a seguir nomeadas e ao final assinadas, de um lado ${dadosEstagio.nomeConcedente} (Concedente), inscrita no CNPJ sob o nº ${dadosEstagio.cnpj}, 
      sita à rua ${dadosEstagio.enderecoConcedente}, doravante denominada CONCEDENTE, neste ato representada por ${dadosEstagio.nomeRepresentante}, Cargo ou função do representante, 
      portador do CPF ${dadosEstagio.cpfRepresentante}, e de outro lado, o(a) estudante ${dadosEstagio.nomeEstagiario}, RG nº ${dadosEstagio.rgEstagiario}, residente à ${dadosEstagio.enderecoEstagiario}, 
      na cidade de ${dadosEstagio.cidadeEstagiario}, doravante denominado ESTAGIÁRIO (A), aluno (a) regularmente matriculado (a) no Curso Superior de Tecnologia em XXXXXX da Faculdade de Tecnologia de XXX – Fatec XXX,
      inscrita no CNPJ sob o nº , localizada na cidade de XXXX, Estado de São Paulo, doravante denominada INSTITUIÇÃO DE ENSINO, na condição de interveniente, acordam e estabelecem entre si as cláusulas e 
      condições que regerão este TERMO DE COMPROMISSO DE ESTÁGIO NÃO OBRIGATÓRIO REMUNERADO.

      `; }*/

    doc.text(texto, 10, 30);

    // Exemplo de espaço para preencher (linhas) com dados dinâmicos
    //doc.text(`Concedente: ${dadosEstagio.nomeConcedente || "_____________________________"}`, 10, 80);
   // doc.text(`CNPJ: ${dadosEstagio.cnpj || "_______________________________"}`, 10, 90);
   // doc.text(`Endereço: ${dadosEstagio.enderecoConcedente || "_____________________________"}`, 10, 100);
    //doc.text(`Estagiário: ${dadosEstagio.nome || "_____________________________"}`, 10, 110);
   // doc.text(`RG: ${dadosEstagio.rg || "_________________________________"}`, 10, 120);

    // Salvar o arquivo
    doc.save("termo_compromisso_estagio.pdf");
  };

  return (
    <div>
      <button onClick={gerarPDF}>Gerar PDF</button>
    </div>
  );
};

export default GerarPDF;


