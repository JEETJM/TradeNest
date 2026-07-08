import React from "react";
function NotFound() {
  return (
    <section className="container open-account-section text-center">
      <h2 className="open-title">
        {" "}
        <b>404 Not Found</b>
      </h2>
      <p className="open-description">
        We couldn’t find the page you were looking for. Visit{" "}
        <a style={{ textDecoration: "none" }} href="/">
          <b>TradeNest home page. </b>
        </a>
      </p>
    </section>
  );
}

export default NotFound;
