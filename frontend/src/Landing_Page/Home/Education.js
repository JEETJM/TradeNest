import React from "react";
import "./styles/Education.css";

function Education() {
  return (
    <section className="container education-section">
      <div className="row align-items-center">
        {/* Left Image */}

        <div className="col-lg-6 text-center">
          <img
            src="Media/Images/education.svg"
            alt="TradeNest Learn"
            className="img-fluid education-img"
          />
        </div>

        {/* Right */}

        <div className="col-lg-6">
          <h2 className="education-heading">Free and open market education</h2>

          <p className="education-text">
            TradeNest Learn is a free educational platform covering everything
            from stock market basics to advanced investing strategies. Learn at
            your own pace with easy-to-understand lessons.
          </p>

          <a href="/" className="education-link">
            TradeNest Learn
            <i className="fa-solid fa-arrow-right ms-2"></i>
          </a>

          <div className="mt-5">
            <p className="education-text">
              Join our active investor community to ask questions, share
              knowledge, and discuss market trends with fellow traders and
              experts.
            </p>

            <a href="/" className="education-link">
              TradeNest Community
              <i className="fa-solid fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
