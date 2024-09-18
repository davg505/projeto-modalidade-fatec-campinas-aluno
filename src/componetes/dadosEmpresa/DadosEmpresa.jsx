import { useState } from "react";
import { UseAppContext } from "../../hooks";
import style from "./DadosEmpresa.module.css"; // Importe o arquivo CSS

export const DadosEmpresa = ({ show, handleClose, handleSubmit }) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [local, setLocal] = useState("");
    const [estado, setEstado] = useState("");
    const [endereco, setEndereco] = useState("");
    const [superior, setSupervisor] = useState("");
    const [cargo, setCargo] = useState("");
    const [cpf, setCpf] = useState("");
    const [tel, setTel] = useState("");

  
    const {  } = UseAppContext();
  
    const onSubmit = () => {
      const dadosEmpresaEstagio = {
        email,
        name,
        cnpj,
        local,
        estado,
        endereco,
        superior,
        cargo,
        cpf,
        tel,
      };
    
      handleSubmit(dadosEmpresaEstagio); // Se ainda precisar dessa função
      handleClose(); // Fecha o modal após o envio
    };
  
    if (!show) return null;


    return(

        <div className={style.modalBackground}>
        <div className={style.modalContainer}>
        <h2>Dados da Empresa</h2>

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
            <label>Município:</label>
            <input
            className={style.input}
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            />
        </div>

        <div className={style.labelContainer}>
            <label>Estado:</label>
            <input
            className={style.input}
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            />
        </div>

        <div className={style.labelContainer}>
            <label>Endereço:</label>
            <input
            className={style.input}
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
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
            <label>Cargo / Função (Supervisor):</label>
            <input
            className={style.input}
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            />
        </div>

        <div className={style.labelContainer}>
            <label>CPF (Supervisor):</label>
            <input
            className={style.input}
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
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


}