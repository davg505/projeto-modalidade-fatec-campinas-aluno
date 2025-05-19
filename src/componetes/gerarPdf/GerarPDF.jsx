import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import style from './GerarPDF.module.css';
import { buscarDadosEstagio, buscarDadosEmpresa, buscarDadosAluno, buscarDadosEstagioInfo, buscarDadosAlunoFatec, buscarDadosEstagioSolicitacao } from '../../services/apiService';

const GerarPDF = () => {
  const [dadosEstagio, setEstagio] = useState(null);
  const [dadosEmpresa, setEmpresa] = useState(null);
  const [dadosAluno, setAluno] = useState(null);
  const [dadosEstagioInfo, setEstagioInfo] = useState(null);
  const [dadosFatec, setFatec] = useState(null);
  const [dadosSolicitacaoEstagio, setSolicitacaoEstagio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const MAX_RETRIES = 3;

  const dataAtual = new Date();

  const fetchDados = async () => {
    setLoading(true);
    setError(null);

    try {
      const estagio = await buscarDadosEstagio();
      const empresa = await buscarDadosEmpresa();
      const aluno = await buscarDadosAluno();
      const estagioInfo = await buscarDadosEstagioInfo();
      const fatec = await buscarDadosAlunoFatec();
      const solicitacaoEstagio = await buscarDadosEstagioSolicitacao();
      console.log('✅ Dados estágio:', estagio);
      console.log('✅ Dados empresa:', empresa);
      console.log('✅ Dados aluno:', aluno);
      console.log('✅ Dados info:', estagioInfo);
      console.log('✅ Dados fatec:', fatec);
      console.log('✅ Dados fatec:', solicitacaoEstagio);
      setEstagio(estagio);
      setEmpresa(empresa);
      setAluno(aluno);
      setEstagioInfo(estagioInfo);
      setFatec(fatec);
      setSolicitacaoEstagio(solicitacaoEstagio);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError(err);
      if (retryCount < MAX_RETRIES) {
        setRetryCount((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, [retryCount]);

  const gerarPDF = () => {
    if (!dadosEstagio) {
      console.log("Dados não carregados");
      return;
    }

        // Criar uma instância de jsPDF no formato A4
        const doc = new jsPDF();

        // Definir margens
        const alturaPagina = 290;
        const alturaLinha = 10;
        const margemEsquerda = 10;
        const margemSuperior = 10;
        const larguraPagina = doc.internal.pageSize.getWidth() - 3 * margemEsquerda;
    
        // Título
        doc.setFontSize(14);
        doc.text("ANEXO A – Termo de Compromisso de Estágio não Obrigatório Remunerado", margemEsquerda, margemSuperior);
        doc.setFontSize(10);
    
        const texto1 = "ATENÇÃO: Rubricar todas as páginas e assinar na última. As assinaturas deverão constar em folha que tenha, pelo menos uma cláusula do Termo de Compromisso de Estágio (a última página não deverá conter somente as assinaturas). Providenciar 03 (três) vias em papel timbrado pela empresa, uma para a empresa, outra para a Instituição de Ensino e outra para o aluno.";
    
        // O jsPDF quebra automaticamente o texto para caber na largura da página
        doc.text(texto1, margemEsquerda, margemSuperior + 10, { maxWidth: larguraPagina });
    
        const texto = `
    
      
    
          TERMO DE COMPROMISSO PARA A REALIZAÇÃO DE ESTÁGIO SUPERVISIONADO NÃO OBRIGATÓRIO (REMUNERADO) (Lei nº 11.788/08)
    
          Pelo presente instrumento, as partes a seguir nomeadas e ao final assinadas, de um lado ${dadosEmpresa.nome_empresa || "_____________________________"}, inscrita no CNPJ sob o nº ${dadosEmpresa.cnpj || "_____________________________"}, sita à rua ${dadosEmpresa.endereco || "_____________________________"}, doravante denominada CONCEDENTE, neste ato representada por ${dadosEmpresa.nome_representante || "_____________________________"}, portador do CPF ${dadosEmpresa.cpf_representante || "_____________________________"}, e de outro lado, o(a) estudante ${dadosAluno.nome_do_aluno || "_____________________________"}, RG nº ${dadosAluno.rg || "_____________________________"}, residente à ${dadosAluno.endereco || "_____________________________"}  , na cidade de ${dadosAluno.cidade || "_____________________________"}  , doravante denominado ESTAGIÁRIO (A), aluno (a) regularmente matriculado (a) no Curso Superior de Tecnologia em ${dadosAluno.curso || "_____________________________"}  da Faculdade de Tecnologia de ${dadosFatec.cidade || "_____________________________"}  – Fatec ${dadosFatec.cidade || "_____________________________"} , localizada na cidade de ${dadosFatec.cidade || "_____________________________"} , Estado de São Paulo, doravante denominada INSTITUIÇÃO DE ENSINO, na condição de interveniente, acordam e estabelecem entre si as cláusulas e condições que regerão este TERMO DE COMPROMISSO DE ESTÁGIO NÃO OBRIGATÓRIO REMUNERADO.
          CLÁUSULA PRIMEIRA. É objeto do presente Termo de Compromisso de Estágio autorizar a realização de estágio nos termos da Lei 11.788/08 de 25/09/2008, com a finalidade de possibilitar ao (à) Estagiário (a) complementação e aperfeiçoamento prático de seu Curso Superior de Tecnologia, celebrado entre a Concedente e a Instituição de Ensino da qual o (a) Estagiário (a) é aluno (a).
          Parágrafo Primeiro. Entende-se por estágio profissional aquele desenvolvido em ambiente real de trabalho, assumido como ato educativo e supervisionado pela instituição de ensino, em regime de parceria com organizações do mundo do trabalho, objetivando efetiva preparação do estudante para o trabalho, conforme o art. 34, § 1º da Resolução CNE/CP Nº 1/2021. 
          Parágrafo Segundo. As atividades de estágio somente poderão ser iniciadas após assinatura do Termo de Compromisso de Estágio pelas partes envolvidas, não sendo reconhecida ou validada com data retroativa.
          Parágrafo Terceiro. Em caso de prorrogação de vigência do Termo de Compromisso de Estágio, o preenchimento e a assinatura do Termo Aditivo deverão ser providenciados, com antecedência de 20 (vinte) dias, antes da data de encerramento, contida neste Termo de Compromisso.
          CLÁUSULA SEGUNDA. As atividades a serem desenvolvidas durante o Estágio, objeto do presente Termo de Compromisso, constarão de Plano de Estágio construído pelo (a) Estagiário (a) em conjunto com a Concedente e orientado por professor da Instituição de Ensino. 
          Parágrafo primeiro: O Plano de Atividade de Estágio – PAE está anexo ao Termo de Compromisso de Estágio. 
          CLÁUSULA TERCEIRA. Fica compromissado entre as partes que:
          I - As atividades do Estágio a serem cumpridas pelo (a) Estagiário (a) serão no horário das ${dadosEstagioInfo.horas_entrada || "____"} às ${dadosEstagioInfo.horas_saida || "___ "} horas, com intervalo das refeições das ${dadosEstagioInfo.horas_refeicao || "___ "}horas, de 2ª a 6ª feira, perfazendo  ${dadosEstagioInfo.horas_semanais || "____"}  horas semanais; 
          II - A jornada de atividade do (a) Estagiário (a) deverá compatibilizar-se com o horário escolar do (a) Estagiário (a) e com o horário da Concedente; 
          III - Este Termo de Compromisso terá vigência de  ${dadosSolicitacaoEstagio.data_inicial_estagio || "____"} a  ${dadosSolicitacaoEstagio.data_final_estagio || "____"}, podendo ser denunciado a qualquer tempo, por qualquer das três partes envolvidas, unilateralmente, mediante comunicação escrita, com antecedência mínima de 5 (cinco) dias; 
          IV-     O (A) Estagiário (a) receberá da concedente durante o período de estágio, uma bolsa no valor de R$ ${dadosEstagioInfo.valor || "____"} e auxílio transporte, conforme acordado entre as partes;  
          V - Nos períodos em que a instituição de ensino adotar verificações de aprendizagem periódica ou final, a carga horária do estágio será reduzida pelo menos à metade para garantir o bom desempenho do estudante, conforme o art. 10, § 2º da Lei de Estágio;
          VI - A duração do estágio, na mesma parte concedente, não poderá exceder 2 (dois) anos, exceto quando se tratar de estagiário com deficiência, conforme art. 11 da Lei de Estágio;
          VII - O Estágio não pode, em qualquer hipótese, se estender após a conclusão do Curso Superior de Tecnologia.
          CLÁUSULA QUARTA. Além das atribuições e responsabilidade previstas no presente Termo de Compromisso de Estágio, caberá à CONCEDENTE: 
          I – Garantir ao (à) estagiário (a) o cumprimento das exigências escolares, inclusive no que se refere ao horário escolar;
          II - Proporcionar ao (à) Estagiário (a) atividades de aprendizagem social, profissional e cultural compatíveis com sua formação profissional; 
          III - Proporcionar ao (à) Estagiário (a) condições de treinamento prático e de relacionamento humano; 
          IV - Designar um (a) Supervisor (a) ou responsável para orientar as tarefas do Estagiário; 
          V - Proporcionar à Instituição de Ensino, sempre que necessário, subsídios que possibilitem o acompanhamento, a supervisão e a avaliação parcial do Estagiário; 
          VI – Entregar ao (à) Estagiário (a), por ocasião do desligamento, termo de realização do estágio, indicando de forma resumida as atividades desenvolvidas, os períodos e a avaliação de desempenho.
          VII - Estabelecer o valor a ser pago como Bolsa-Estágio.
          CLÁUSULA QUINTA. Além das atribuições e responsabilidade previstas no presente Termo de Compromisso de Estágio, caberá ao (à) ESTAGIÁRIO (A): 
          I - Estar regularmente matriculado (a) na Instituição de Ensino, em semestre compatível com a prática exigida no Estágio; 
          II - Observar as diretrizes e/ou normas internas da Concedente e os dispositivos legais aplicáveis ao estágio, bem como as orientações do Professor Responsável de Estágios e do seu Supervisor ou responsável; 
          III - Cumprir, com seriedade e responsabilidade, empenho e interesse a programação estabelecida entre a Concedente, o (a) Estagiário (a) e a Instituição de Ensino e preservar o sigilo das informações a que tiver acesso; 
          IV - Elaborar e entregar à Instituição de Ensino de relatórios parciais e relatório final sobre seu estágio, na forma estabelecida por ele; 
          V - Cumprir as normas internas da Concedente, principalmente as relacionadas com o estágio e não divulgar ou transmitir, durante ou depois do período de estágio, a quem quer que seja, qualquer informação confidencial ou material que se relacione com os negócios da Concedente; 
          VI - Responder pelas perdas e danos consequentes da inobservância das cláusulas constantes do presente termo; 
          VII - Comunicar à Concedente, no prazo de 5 (cinco) dias, a ocorrência de qualquer uma das alternativas do inciso I da Cláusula Oitava; 
          VIII - Respeitar as cláusulas do Termo de Compromisso; 
          IX - Encaminhar obrigatoriamente à Instituição de Ensino e à Concedente uma via do presente instrumento, devidamente assinado pelas partes; 
          X – Comunicar à Instituição de Ensino qualquer fato relevante sobre o estágio.
          CLÁUSULA SEXTA. Caberá à INSTITUIÇÃO DE ENSINO: 
          I - Estabelecer critérios para a realização do Estágio Supervisionado, seu acompanhamento e avaliação bem como encaminhá-los à Concedente; 
          II - Planejar o estágio, orientar, supervisionar e avaliar o (a) Estagiário (a), parcialmente e ao final do estágio.
          CLÁUSULA SÉTIMA. A Concedente se obriga a fazer o Seguro de Acidentes Pessoais ocorridos nos locais de estágio, conforme legislação vigente, de acordo com a Apólice de Seguro nº ${dadosEstagioInfo.numero_apolice || "___ "}, da Seguradora ${dadosEstagioInfo.seguradora || "___ "}, nos termos do Artigo 9º Inciso IV da Lei 11.788/08.
          CLÁUSULA OITAVA. Constituem motivo para a rescisão automática do presente Termo de Compromisso: 
          I - A conclusão, abandono ou mudança de Curso, ou trancamento de matrícula do (a) Estagiário (a); 
          II - O não cumprimento do convencionado neste Termo de Compromisso; 
          III- O abandono do estágio.
          CLÁUSULA NONA. É assegurado ao (à) Estagiário (a), sempre que o estágio tenha duração igual ou superior a um ano, período de recesso de trinta dias, a ser gozado preferencialmente durante suas férias escolares. E proporcional aos estágios inferiores a um ano. O recesso de que trata esse artigo deverá ser remunerado quando o Estagiário receber bolsa ou outra forma de contraprestação e o auxílio transporte, conforme artigo 13º, § 1º e § 2º da Lei 11.788/08.
          CLÁUSULA DÉCIMA PRIMEIRA. As partes elegem o Foro da Comarca da Capital do Estado de São Paulo, com expressa renúncia de outro, por mais privilegiado que seja para dirimir qualquer questão emergente do presente Termo de Compromisso.
          CLÁUSULA DÉCIMA. Assim, materializado e caracterizado, o presente Estágio, segundo a legislação, não acarretará vínculo empregatício de qualquer natureza entre o (a) Estagiário (a) e a Concedente, nos termos do que dispõem o Artigo 12º da Lei nº 11.788/08.  
          Por estarem de inteiro e comum acordo com as condições e dizeres deste instrumento, as partes assinam-no em 3 (três) vias de igual teor e forma, todas assinadas pelas partes, depois de lido, conferido e achado conforme em todos os seus termos.
          Campinas, ${dataAtual.getDate()} de ${dataAtual.getMonth() + 1} de  ${dataAtual.getFullYear()}. 
    
    
    
    
    
    
    
    
          _________________________________
          ${dadosAluno.nome_do_aluno}
    
    
          _________________________________
          ${dadosEmpresa.nome_representante}
    
    
          _________________________________
    
    
    
          `;
    
        
        // Quebra o texto para caber na largura da página
        doc.setFontSize(10);
        const linhasTexto = doc.splitTextToSize(texto, larguraPagina);
    
        // Adicionar o texto ao PDF
       //doc.text (linhasTexto, margemEsquerda, margemSuperior + 40);
        
    
        let linhaAtual = 0;
        let paginaAtual = 1;
    
        const linhasPorPagina = Math.floor((alturaPagina - margemSuperior) / alturaLinha);
    
        const adicionarTexto = () => {
          while (linhaAtual < linhasTexto.length) {
            if (linhaAtual % linhasPorPagina === 0 && linhaAtual !== 0) {
              doc.addPage();
              paginaAtual++;
            }
            // Adiciona a linha atual no PDF
            const yPos = margemSuperior + (linhaAtual % linhasPorPagina) * alturaLinha;
            doc.text(linhasTexto[linhaAtual], margemEsquerda, yPos);
            linhaAtual++;
          }
        };
    
        // Adicionar o texto
        adicionarTexto();
    
        // Salvar o arquivo PDF
        doc.save("termo_compromisso_estagio.pdf");
      };
    
      // Renderização condicional para exibir carregamento ou erro
      if (loading) {
        return <div>Carregando os dados, por favor aguarde...</div>;
      }
    
      if (error) {
        return <div>Erro: {error}</div>;
      }
    
      return (
        <div>
          <button className={style.botao} onClick={gerarPDF}>Gerar PDF</button>
        </div>
      );
    };
    
    export default GerarPDF;