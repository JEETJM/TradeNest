import "./styles/Calculators.css";

function Calculators() {
  return (
    <section className="calculatorSection">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Financial Calculators</h2>

          <p>Plan your investments smarter with our free financial tools.</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="calculatorCard">
              <div className="calculatorIcon">📊</div>

              <h4>Brokerage Calculator</h4>

              <p>Estimate brokerage charges before placing your trade.</p>

              <a href="/calculator/brokerage">Explore →</a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="calculatorCard">
              <div className="calculatorIcon">💰</div>

              <h4>Margin Calculator</h4>

              <p>
                Calculate required margin for Equity, F&O and Commodity trades.
              </p>

              <a href="/calculator/margin">Explore →</a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="calculatorCard">
              <div className="calculatorIcon">📈</div>

              <h4>SIP Calculator</h4>

              <p>
                Plan monthly SIPs and estimate your future investment value.
              </p>

              <a href="/calculator/sip">Explore →</a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="calculatorCard">
              <div className="calculatorIcon">🏠</div>

              <h4>EMI Calculator</h4>

              <p>Quickly calculate monthly EMI payments for your loans.</p>

              <a href="/calculator/emi">Explore →</a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="calculatorCard">
              <div className="calculatorIcon">🎯</div>

              <h4>Goal Planner</h4>

              <p>Plan your financial goals with personalized projections.</p>

              <a href="/calculator/goals">Explore →</a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="calculatorCard">
              <div className="calculatorIcon">👴</div>

              <h4>Retirement Planner</h4>

              <p>
                Estimate the amount you'll need for a comfortable retirement.
              </p>

              <a href="/calculator/retirement">Explore →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculators;
