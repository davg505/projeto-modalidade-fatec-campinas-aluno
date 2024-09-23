

import { Route, Routes } from "react-router-dom";
import { LayoutPadrao } from "./layout/layoutPadrao/LayoutPadrao";
import { Error404, Estagio, Inicial } from './pages';

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutPadrao />}>
                <Route index element={<Inicial />} /> {/* Rota padrão para '/' */}
                <Route path="estagio" element={<Estagio />} />
            </Route>
            <Route path="*" element={<Error404 />} /> {/* Captura qualquer rota não encontrada */}
        </Routes>
    );
};