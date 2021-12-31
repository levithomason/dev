import * as React from "react";
import { appName, logo } from "../lib/app-config";

export const Logo = () => (
  <>
    <div className="app-logo">
      <img alt="A robot head icon" src={logo.src} />{" "}
      <span className="app-logo-text">{appName}</span>
    </div>

    <style jsx>{`
      .app-logo {
        display: inline-block;
        color: #000;
        --text-opacity: 0.8;
        vertical-align: middle;
      }

      .app-logo .app-logo-text {
        display: inline-block;
        padding-bottom: 14px;
        font-size: 24px;
        font-weight: bold;
        line-height: 1;
        letter-spacing: -1px;
        opacity: var(--text-opacity);
        color: #fff;
      }

      .app-logo img {
        vertical-align: bottom;
        padding: 0px 4px 8px 4px;
        width: 50px;
        background-color: #ffb05e;
        opacity: var(--text-opacity);
      }
    `}</style>
  </>
);
