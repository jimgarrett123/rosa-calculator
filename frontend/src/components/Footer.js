import "./Footer.scss";
import React from "react";

function Footer() {
  return (
    <footer className="footer mt-auto pt-5 pb-2 text-center">
      <div className="container">
        <span className="text-muted">
          <a target="_blank" href="https://aws.amazon.com/privacy/">
            Privacy
          </a>
          &nbsp;|&nbsp;
          <a target="_blank" href="https://aws.amazon.com/terms/">
            Site terms
          </a>
          &nbsp;|&nbsp;© {new Date().getFullYear()}, Amazon Web Services, Inc.
          or its affiliates. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
