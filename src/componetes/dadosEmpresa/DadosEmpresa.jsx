import { useState } from "react";
import { UseAppContext } from "../../hooks";
import style from "./DadosEmpresa.module.css"; // Importe o arquivo CSS

// eslint-disable-next-line react/prop-types
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

  
    const { adicionarDadosEmpresa } = UseAppContext();


        // Função para formatar CPF e CNPJ
        const formatarDocumento = (valor, tipo) => {
            let v = valor.replace(/\D/g, ""); // Remove qualquer caractere não numérico

            if (tipo === "cpf") {
            // Formatar CPF (000.000.000-00)
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            } else if (tipo === "cnpj") {
            // Formatar CNPJ (00.000.000/0000-00)
            v = v.replace(/^(\d{2})(\d)/, "$1.$2");
            v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
            v = v.replace(/(\d{4})(\d)/, "$1-$2");
            }

            return v;
        };

        const handleCpfChange = (e) => {
            const formattedCpf = formatarDocumento(e.target.value, "cpf");
            setCpf(formattedCpf);
        };

        const handleCnpjChange = (e) => {
            const formattedCnpj = formatarDocumento(e.target.value, "cnpj");
            setCnpj(formattedCnpj);
        };

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
    
      adicionarDadosEmpresa (dadosEmpresaEstagio);
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
            onChange={handleCnpjChange}
            maxLength="18" // Limita o input ao tamanho máximo de um CNPJ
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
                onChange={handleCpfChange}
                maxLength="14" // Limita o input ao tamanho máximo de um CPF
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