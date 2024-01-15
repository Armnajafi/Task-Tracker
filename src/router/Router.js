import { BrowserRouter, Routes, Route } from "react-router-dom";

import Api from "../components/Api";
import Task from "../components/Task";
import NoPage from "../components/NoPage";
import Layout from "./Layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="api" element={<Api />} />
          <Route path="task" element={<Task />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}