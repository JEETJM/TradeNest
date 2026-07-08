import "./styles/PopularArticles.css";

const articles = [
  {
    title: "How to open a TradeNest account?",
    desc: "Complete guide for opening your Demat & Trading account online.",
    icon: "fa-solid fa-user-plus",
  },
  {
    title: "How to add funds?",
    desc: "Different ways to instantly add funds to your trading account.",
    icon: "fa-solid fa-wallet",
  },
  {
    title: "Withdraw funds",
    desc: "Learn how to withdraw your available balance quickly.",
    icon: "fa-solid fa-money-bill-transfer",
  },
  {
    title: "Activate F&O segment",
    desc: "Enable Futures & Options in a few simple steps.",
    icon: "fa-solid fa-chart-line",
  },
  {
    title: "Reset login password",
    desc: "Forgot your password? Recover your account securely.",
    icon: "fa-solid fa-lock",
  },
  {
    title: "Update nominee & KYC",
    desc: "Change nominee, address, PAN and bank details online.",
    icon: "fa-solid fa-id-card",
  },
];

function PopularArticles() {
  return (
    <section className="popularArticles">
      <div className="container">
        <div className="sectionHeading">
          <h2>Popular Help Articles</h2>

          <p>Frequently visited support articles by TradeNest users.</p>
        </div>

        <div className="row g-4">
          {articles.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="articleCard">
                <div className="articleIcon">
                  <i className={item.icon}></i>
                </div>

                <h4>{item.title}</h4>

                <p>{item.desc}</p>

                <a href="/">
                  Read Article
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

export default PopularArticles;
