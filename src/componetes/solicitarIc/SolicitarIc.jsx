import { useState } from "react";
import style from "./SolicitarIc.module.css"; // Importe o arquivo CSS
import { solicitacaoInicalIc } from '../../services/apiService';

// eslint-disable-next-line react/prop-types
const SolicitarIc = ({ show, handleClose, handleSubmit }) => {
  const [dataIncial, setDataIncial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [nomeInstituicao, setNomeInstituicao] = useState("");
  const [temaProjeto, setTemaProjeto] = useState("");
  const [professorOrientador, setProfessorOrientador] = useState("");
  const [horario, setHorario] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [atividade, setAtividade] = useState("");


  const onSubmit = () => {
    const solicitacao = {
      instituicao_centro_pesquisa: nomeInstituicao, 
      tema: temaProjeto,
      data_inicial: dataIncial,
      data_final: dataFinal,
      orientador: professorOrientador,
      horario: horario,
      dias_da_semana: diaSemana,
      descricao_atividade: atividade,
    };

    console.log(solicitacao);
  
    solicitacaoInicalIc(solicitacao); // Chama a função para enviar a solicitação
    handleSubmit(solicitacao); // Se ainda precisar dessa função
    handleClose(); // Fecha o modal após o envio
  };

  if (!show) return null;

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <h3>Solicitar I. Cientifico</h3>

        <div className={style.labelContainer}>
          <label>Data inicio IC:</label>
          <input
            className={style.input}
            type="date"
            value={dataIncial}
            onChange={(e) => setDataIncial(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
          <label>Data término IC:</label>
          <input
            className={style.input}
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
              <label>Instituição ou Centro de Pesquisa:</label>
                <input
                    className={style.input}
                    type="text"
                    value={nomeInstituicao}
                    onChange={(e) => setNomeInstituicao(e.target.value)}
                    />
                </div>

        <div className={style.labelContainer}>
                    <label>Tema do projeto:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={temaProjeto}
                        onChange={(e) => setTemaProjeto(e.target.value)}
                    />
                </div>  

      <div className={style.labelContainer}>
                    <label>Professor Orientador:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={professorOrientador}
                        onChange={(e) => setProfessorOrientador(e.target.value)}
                    />
                </div> 

       <div className={style.labelContainer}>
                    <label>Horario:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                    />
                </div> 

                 <div className={style.labelContainer}>
                    <label>Dia Semana:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={diaSemana}
                        onChange={(e) => setDiaSemana(e.target.value)}
                    />
                </div> 


                   <div className={style.labelContainer}>
                    <label>Atividade:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={atividade}
                        onChange={(e) => setAtividade(e.target.value)}
                    />
                </div> 




        <div className={style.buttonsContainer}>
          <button className={style.button} onClick={onSubmit}>
            Enviar
          </button>
          <button className={style.button} onClick={handleClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolicitarIc;
