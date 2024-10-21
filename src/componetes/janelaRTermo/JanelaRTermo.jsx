import { useState } from "react";
//import { UseAppContext } from "../../hooks";
import style from "./JanelaRTermo.module.css"; // Importe o arquivo CSS

// eslint-disable-next-line react/prop-types
export const JanelaRTermo = ({ show, handleClose, handleSubmit }) => {
const [dataRescindido, setDataRescindido] = useState("");
const [rescindidoTipo, setRescindidoTipo] = useState("obrigatorio");
const [outroTexto, setOutroTexto] = useState(""); // Para armazenar o valor do campo de texto
const [showTextInput, setShowTextInput] = useState(false); // Controla a exibição do campo de texto

  //const { adicionarSolicitacaoEstagio,  editarSolicitacaoEstagio } = UseAppContext();

  const handleCheckboxChange = (e) => {
    setRescindidoTipo(e.target.value);
    if (e.target.value === "item5") {
      setShowTextInput(true); // Exibe o campo de texto se "Outro" estiver marcado
    } else {
      setShowTextInput(false); // Oculta o campo de texto
    }
  };

const onSubmit = () => {
    const rescindido = {
    dataRescindido,
    rescindidoTipo,

    };

   // adicionarSolicitacaoEstagio(prorroga); // Chama a função para enviar a solicitação
   // editarSolicitacaoEstagio(prorroga); // Chama a função para enviar a solicitação
    handleSubmit(rescindido); // Se ainda precisar dessa função
    handleClose(); // Fecha o modal após o envio
};

if (!show) return null;


return (
    <div className={style.modalBackground}>
    <div className={style.modalContainer}>
        <h2>Prorrogação período</h2>

        <div className={style.labelContainer}>
        <label>Rescindido o Termo de Compromisso de Estágio:</label>
        <input
            className={style.input}
            type="date"
            value={dataRescindido}
            onChange={(e) => setDataRescindido(e.target.value)}
        />
        </div>

        <div className={style.labelContainer}>
          <label>Seguinte motivo:</label>
          <div className={style.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                value="item1"
                checked={rescindidoTipo === "item1"}
                onChange={(e) => setRescindidoTipo(e.target.value)}
              />
              Contratação do estagiário em regime CLT
            </label>
            <label>
              <input
                type="checkbox"
                value="item2"
                checked={rescindidoTipo === "item2"}
                onChange={(e) => setRescindidoTipo(e.target.value)}
              />
              Por iniciativa da empresa
            </label>
            <label>
              <input
                type="checkbox"
                value="item3"
                checked={rescindidoTipo === "item3"}
                onChange={(e) => setRescindidoTipo(e.target.value)}
              />
              Situação irregular de matrícula do estudante
            </label>
            <label>
              <input
                type="checkbox"
                value="item4"
                checked={rescindidoTipo === "item4"}
                onChange={(e) => setRescindidoTipo(e.target.value)}
              />
              Por iniciativa do estudante
            </label>

            <label>
                <input
                    type="checkbox"
                    value="item5"
                    checked={rescindidoTipo === "item5"}
                    onChange={handleCheckboxChange}
                />
                Outro
                </label>

            {/* Exibe o campo de texto apenas se o checkbox "Outro" estiver marcado */}
            {showTextInput && (
            <input
                type="text"
                value={outroTexto}
                onChange={(e) => setOutroTexto(e.target.value)}
                placeholder="Digite o motivo"
            />
            )}

          </div>
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
