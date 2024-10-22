

import { Route, Routes } from "react-router-dom";
import { LayoutPadrao } from "./layout/layoutPadrao/LayoutPadrao";
import { Avisos, Error404, Estagio, IniciacaoCientifica, Inicial, MeusDados, Tutorial } from './pages';


export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutPadrao />}>
                <Route index element={<Inicial />} /> {/* Rota padrão para '/' */}
                <Route path="estagio" element={<Estagio />} />
                <Route path="iniciacaocientifica" element={<IniciacaoCientifica />} />
                <Route path="dados" element={<MeusDados />} />
                <Route path="avisos" element={<Avisos />} />
                <Route path="tutorial" element={<Tutorial />} />
            </Route>
            <Route path="*" element={<Error404 />} /> {/* Captura qualquer rota não encontrada */}
        </Routes>
    );
};