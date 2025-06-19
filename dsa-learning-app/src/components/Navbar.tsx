// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">
        {t("heroTitle")}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">{t("navHome")}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">{t("navLogin")}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/language-selection">{t("navLanguages")}</Link>
          </li>
          <li className="nav-item">
            <span className="nav-link" style={{ cursor: "pointer" }}>{t("navLogout")}</span>
          </li>
        </ul>
        <select
          className="form-select form-select-sm ms-3 w-auto"
          onChange={handleLanguageChange}
          value={i18n.language}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
          <option value="ta">Tamil</option>
          <option value="pa">Punjabi</option>
          <option value="bn">Bengali</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;


