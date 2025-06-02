import { useState } from "react";
import style from "./SolicitarEp.module.css"; // Importe o arquivo CSS
import { solicitacaoInicalEp } from '../../services/apiService';

// eslint-disable-next-line react/prop-types
const SolicitarEp = ({ show, handleClose, handleSubmit }) => {
  const [dataInicioAtuacao, setDataInicioAtuacao] = useState("");
  const [areaAtuacao, setAreaAtuacao] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [superior, setSuperior] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [atividade, setAtividade] = useState("");


  const onSubmit = () => {
    const solicitacao = {
      nome_da_empresa: nomeEmpresa, 
      municipio_empresa: municipio, 
      superior_imediato: superior,
      tel: tel,
      email: email,
      area_atuacao: areaAtuacao,
      data_incio_atuacao: dataInicioAtuacao,
      descricao_atividade: atividade,
    };

    console.log(solicitacao);
  
    solicitacaoInicalEp(solicitacao); // Chama a função para enviar a solicitação
    handleSubmit(solicitacao); // Se ainda precisar dessa função
    handleClose(); // Fecha o modal após o envio
  };

  if (!show) return null;

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <h2>Solicitar E. Profissional</h2>

        <div className={style.labelContainer}>
          <label>Data inicio atuação:</label>
          <input
            className={style.input}
            type="date"
            value={dataInicioAtuacao}
            onChange={(e) =>  setDataInicioAtuacao(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
              <label>Nome da Empresa:</label>
                <input
                    className={style.input}
                    type="text"
                    value={nomeEmpresa}
                    onChange={(e) => setNomeEmpresa(e.target.value)}
                    />
                </div>

        <div className={style.labelContainer}>
                    <label>Municipio da Empresa:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={municipio}
                        onChange={(e) => setMunicipio(e.target.value)}
                    />
                </div>  

      <div className={style.labelContainer}>
                    <label>Superior imediato:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={superior}
                        onChange={(e) => setSuperior(e.target.value)}
                    />
                </div> 

       <div className={style.labelContainer}>
                    <label>Telefone:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                    />
                </div> 

                 <div className={style.labelContainer}>
                    <label>Email:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                 <div className={style.labelContainer}>
                    <label>Area de atuação:</label>
                    <input
                        className={style.input}
                        type="text"
                        value={areaAtuacao}
                        onChange={(e) => setAreaAtuacao(e.target.value)}
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

export default SolicitarEp;
