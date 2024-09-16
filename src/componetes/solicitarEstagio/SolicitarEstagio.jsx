import { useState } from "react";
import { UseAppContext } from "../../hooks";
import style from "./SolicitarEstagio.module.css"; // Importe o arquivo CSS

const SolicitarEstagio = ({ show, handleClose, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dataIncial, setDataIncial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [local, setLocal] = useState("");
  const [superior, setSupervisor] = useState("");
  const [tel, setTel] = useState("");
  const [estagioTipo, setEstagioTipo] = useState("obrigatorio");
  const [estagioModelo, setEstagioModelo] = useState("Remunerado");

  const { adicionarSolicitacaoEstagio,  editarSolicitacaoEstagio } = UseAppContext();

  const onSubmit = () => {
    const solicitacao = {
      email,
      name,
      estagioTipo,
      estagioModelo,
      dataIncial,
      dataFinal,
      cnpj,
      local,
      superior,
      tel,
    };
  
    adicionarSolicitacaoEstagio(solicitacao); // Chama a função para enviar a solicitação
    editarSolicitacaoEstagio(solicitacao); // Chama a função para enviar a solicitação
    handleSubmit(solicitacao); // Se ainda precisar dessa função
    handleClose(); // Fecha o modal após o envio
  };

  if (!show) return null;

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <h2>Solicitar Estágio</h2>

        <div className={style.labelContainer}>
          <label>Tipo de estágio:</label>
          <div className={style.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                value="obrigatorio"
                checked={estagioTipo === "obrigatorio"}
                onChange={(e) => setEstagioTipo(e.target.value)}
              />
              Obrigatório
            </label>
            <label>
              <input
                type="checkbox"
                value="naoObrigatorio"
                checked={estagioTipo === "naoObrigatorio"}
                onChange={(e) => setEstagioTipo(e.target.value)}
              />
              Não Obrigatório
            </label>
          </div>
        </div>

        <div className={style.labelContainer}>
          <label>Modelo:</label>
          <div className={style.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                value="remunerado"
                checked={estagioModelo === "remunerado"}
                onChange={(e) => setEstagioModelo(e.target.value)}
              />
              Remunerado
            </label>
            <label>
              <input
                type="checkbox"
                value="naoRemunerado"
                checked={estagioModelo === "naoRemunerado"}
                onChange={(e) => setEstagioModelo(e.target.value)}
              />
              Não Remunerado
            </label>
          </div>
        </div>

        <div className={style.labelContainer}>
          <label>Data inicial estágio:</label>
          <input
            className={style.input}
            type="date"
            value={dataIncial}
            onChange={(e) => setDataIncial(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
          <label>Data final estágio:</label>
          <input
            className={style.input}
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
          <label>Empresa:</label>
          <input
            className={style.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
          <label>CNPJ:</label>
          <input
            className={style.input}
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
          <label>Local do Estágio (município):</label>
          <input
            className={style.input}
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
          <label>Supervisor (Empresa):</label>
          <input
            className={style.input}
            type="text"
            value={superior}
            onChange={(e) => setSupervisor(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
          <label>Email (Empresa) :</label>
          <input
            className={style.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={style.labelContainer}>
          <label>Telefone (Empresa):</label>
          <input
            className={style.input}
            type="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
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

export default SolicitarEstagio;
