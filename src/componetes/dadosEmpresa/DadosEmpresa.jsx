import { useState } from "react";
import { adicionarDadosEmpresas } from '../../services/apiService';
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

    // Função para formatar CPF e CNPJ
    const formatarDocumento = (valor, tipo) => {
        let v = valor.replace(/\D/g, "");
        if (tipo === "cpf") {
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (tipo === "cnpj") {
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

    const onSubmit = async () => {
        const dadosEmpresaEstagio = {
            nome_empresa: name,
            cnpj,
            endereco,
            local,
            estado,
            nome_representante: superior,
            cargo_funcao: cargo,
            cpf_representante: cpf,
            email_empresa: email,
            telefone_empresa: tel
        };

        try {
            const resposta = await adicionarDadosEmpresas(dadosEmpresaEstagio);
            console.log('Resposta da API:', resposta);
    
            handleSubmit(resposta);
            handleClose(); 
        } catch (error) {
            console.error("Erro ao enviar dados da empresa:", error);
           
        }
    };

        

    if (!show) return null;

    return (
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
                        maxLength="18"
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
                        maxLength="14"
                    />
                </div>

                <div className={style.labelContainer}>
                    <label>Email (Empresa):</label>
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
