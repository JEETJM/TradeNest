import "./styles/BrowseTopics.css";

const topics = [
  {
    icon: "fa-solid fa-user-plus",
    title: "Account Opening",
    desc: "Open, activate and verify your trading account.",
  },
  {
    icon: "fa-solid fa-wallet",
    title: "Funds",
    desc: "Add funds, withdrawals and payment issues.",
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Trading",
    desc: "Orders, positions, holdings and execution.",
  },
  {
    icon: "fa-solid fa-building-columns",
    title: "IPO",
    desc: "IPO applications, allotment and mandates.",
  },
  {
    icon: "fa-solid fa-desktop",
    title: "Kite Platform",
    desc: "Trading platform support and troubleshooting.",
  },
  {
    icon: "fa-solid fa-chart-pie",
    title: "Console",
    desc: "Reports, tax P&L, statements and portfolio.",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "Security",
    desc: "2FA, password, login and account protection.",
  },
  {
    icon: "fa-solid fa-user-gear",
    title: "Profile",
    desc: "Nominee, KYC, bank details and profile updates.",
  },
];

function BrowseTopics() {
  return (
    <section className="browseTopics">
      <div className="container">
        <div className="sectionTitle">
          <h2>Browse Help Topics</h2>

          <p>Find answers to the most common questions quickly.</p>
        </div>

        <div className="row g-4">
          {topics.map((topic, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="topicCard">
                <div className="topicIcon">
                  <i className={topic.icon}></i>
                </div>

                <h4>{topic.title}</h4>

                <p>{topic.desc}</p>

                <a href="/">
                  Learn More
                  <i className="fa-solid fa-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrowseTopics;
