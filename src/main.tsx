import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import "./index.css";
import { AboutPage } from "./pages/about";
import { ContactPage } from "./pages/contact";
import { HomePage } from "./pages/home";
import { ProjectsPage } from "./pages/projects";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
