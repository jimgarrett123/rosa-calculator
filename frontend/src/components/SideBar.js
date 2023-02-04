import "./SideBar.scss";
import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <section id="sidebar">
      <div className="inner">
        <div className="logo">
          <img src="/logo.svg" alt="PartnerCast" />
        </div>
        <nav>
          <div className="heading">ROSA</div>
          <ul>
            <li>
              <div className="nav-link-container">
                <NavLink end to="/" className="nav-link">
                  Calculator
                </NavLink>
              </div>
            </li>
          </ul>

        </nav>
      </div>
    </section>
  );
}

export default SideBar;
