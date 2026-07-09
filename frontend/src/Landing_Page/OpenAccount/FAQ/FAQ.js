import "./FAQ.css";

function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "What is a TradeNest account?",
      answer:
        "A TradeNest account combines a Demat and Trading account, allowing you to invest in stocks, ETFs, mutual funds, IPOs, bonds, and more from one secure platform.",
    },
    {
      id: 2,
      question: "What documents are required to open an account?",
      answer: (
        <ul>
          <li>PAN Card</li>
          <li>Aadhaar Card linked with your mobile number</li>
          <li>Cancelled cheque or bank statement</li>
          <li>Income proof (only for F&O trading)</li>
        </ul>
      ),
    },
    {
      id: 3,
      question: "Is account opening free?",
      answer:
        "Yes. Opening a TradeNest Demat and Trading account is completely free.",
    },
    {
      id: 4,
      question: "Are there any AMC charges?",
      answer:
        "AMC depends on the account type and applicable plans. Please check our pricing page for the latest information.",
    },
    {
      id: 5,
      question: "Can I open an account without a bank account?",
      answer:
        "No. A valid bank account is required for fund transfers and settlements.",
    },
    {
      id: 6,
      question: "How long does account verification take?",
      answer:
        "Most accounts are verified within 24–48 hours after successful document submission.",
    },
    {
      id: 7,
      question: "Can I apply for IPOs?",
      answer:
        "Yes. You can apply for IPOs directly from your TradeNest dashboard.",
    },
  ];

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="faq-title">FAQs</h2>

        <div className="accordion" id="faqAccordion">
          {faqs.map((faq) => (
            <div className="accordion-item custom-item" key={faq.id}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    faq.id !== 1 ? "collapsed" : ""
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq${faq.id}`}
                >
                  {faq.question}
                </button>
              </h2>

              <div
                id={`faq${faq.id}`}
                className={`accordion-collapse collapse ${
                  faq.id === 1 ? "show" : ""
                }`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
