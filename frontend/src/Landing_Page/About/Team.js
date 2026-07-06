import React, { useEffect, useState } from "react";
import "./styles/Team.css";
import teamData from "./TeamData";

function Team() {
  const [current, setCurrent] = useState(0);
  const [pause, setPause] = useState(false);

  // Auto Slide
  useEffect(() => {
    if (pause) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === teamData.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [pause]);

  // Next

  const nextSlide = () => {
    setCurrent(current === teamData.length - 1 ? 0 : current + 1);
  };

  // Previous

  const prevSlide = () => {
    setCurrent(current === 0 ? teamData.length - 1 : current - 1);
  };

  return (
    <section className="teamSection">
      <div className="container">
        <h2 className="teamHeading">Meet Our Leadership</h2>

        <p className="teamSubHeading">
          Passionate people building the future of investing.
        </p>

        <div
          className="teamCard"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          <button className="arrow leftArrow" onClick={prevSlide}>
            ❮
          </button>

          <div className="teamContent">
            <img
              src={teamData[current].image}
              alt={teamData[current].name}
              className="teamImage"
            />

            <h3>{teamData[current].name}</h3>

            <h5>{teamData[current].role}</h5>

            <p>{teamData[current].bio}</p>
          </div>

          <button className="arrow rightArrow" onClick={nextSlide}>
            ❯
          </button>
        </div>

        {/* Dots */}

        <div className="dots">
          {teamData.map((item, index) => (
            <span
              key={item.id}
              className={index === current ? "dot active" : "dot"}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className="contactInfo">
        <div className="contactItem">
          <i className="fa-solid fa-envelope"></i>

          <a href="mailto:jm382118@gmail.com">jm382118@gmail.com</a>
        </div>

        <div className="contactItem">
          <i className="fa-solid fa-phone"></i>

          <span>+91 6296601904</span>
          <br></br>
          <span>+91 8293538236</span>
        </div>

        <div className="contactItem">
          <i className="fa-solid fa-location-dot"></i>

          <span>Kandi, West Bengal, India</span>
        </div>
      </div>

      <div className="socialLinks">
        <a href="https://github.com/JEETJM">
          <i className="fab fa-github"></i>
        </a>

        <a href="https://www.linkedin.com/in/jm1904/">
          <i className="fab fa-linkedin"></i>
        </a>

        <a href="https://x.com/JEETJM04">
          <i
            style={{ textDecoration: "none" }}
            className="fab fa-x-twitter"
          ></i>
        </a>
      </div>
    </section>
  );
}

export default Team;
