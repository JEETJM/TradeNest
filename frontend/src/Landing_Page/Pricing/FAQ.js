import "./styles/FAQ.css";

function FAQ() {
  return (
    <section className="faqSection">
      <div className="container">
        <div className="faqHeading">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about TradeNest pricing.</p>
        </div>

        <div className="accordion" id="pricingFaq">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq1"
              >
                Is account opening really free?
              </button>
            </h2>

            <div
              id="faq1"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                Yes. Opening a TradeNest trading and demat account is completely
                free with no hidden charges.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
              >
                What is the brokerage for equity delivery?
              </button>
            </h2>

            <div
              id="faq2"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                Equity delivery investments are completely brokerage-free.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq3"
              >
                Are there any hidden charges?
              </button>
            </h2>

            <div
              id="faq3"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                No. TradeNest follows a transparent pricing model with no hidden
                charges. All applicable exchange, GST, SEBI, and stamp duty
                charges are shown clearly before placing an order.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq4"
              >
                Do I need to maintain a minimum account balance?
              </button>
            </h2>

            <div
              id="faq4"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                No. There is no minimum balance requirement to maintain your
                TradeNest account.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq5"
              >
                What is the maximum brokerage per order?
              </button>
            </h2>

            <div
              id="faq5"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                The maximum brokerage is ₹20 per executed order for intraday,
                futures, and options trades.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq6"
              >
                Are mutual fund investments free?
              </button>
            </h2>

            <div
              id="faq6"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                Yes. Direct mutual fund investments are completely free with
                zero brokerage.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq7"
              >
                Are AMC charges applicable?
              </button>
            </h2>

            <div
              id="faq7"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                Annual Maintenance Charges (AMC) may apply depending on your
                demat account type and applicable regulations.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq8"
              >
                How can I add funds to my account?
              </button>
            </h2>

            <div
              id="faq8"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                You can instantly add funds using UPI, Net Banking, or supported
                payment methods from the Funds section.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq9"
              >
                Is there any charge for withdrawing funds?
              </button>
            </h2>

            <div
              id="faq9"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                No. Fund withdrawals are generally free, subject to applicable
                banking and regulatory policies.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq10"
              >
                Can I trade in IPOs through TradeNest?
              </button>
            </h2>

            <div
              id="faq10"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                Yes. You can apply for IPOs online using the UPI payment process
                directly through your TradeNest account.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq11"
              >
                Is TradeNest suitable for beginners?
              </button>
            </h2>

            <div
              id="faq11"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                Yes. TradeNest is designed for both beginners and experienced
                investors, with a simple interface, educational resources, and
                transparent pricing.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq12"
              >
                How can I contact TradeNest support?
              </button>
            </h2>

            <div
              id="faq12"
              className="accordion-collapse collapse"
              data-bs-parent="#pricingFaq"
            >
              <div className="accordion-body">
                You can contact our support team through email, live chat, or
                the Help Center available in your TradeNest account.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
