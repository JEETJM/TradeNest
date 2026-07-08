import "./styles/ContactSupport.css";

function ContactSupport() {
  return (
    <section className="contactSupport">
      <div className="container">
        <div className="contactHeading">
          <h2>Need more help?</h2>

          <p>
            Our support team is here to help you with your account and trading
            related queries.
          </p>
        </div>

        <div className="row g-4">
          {/* Email */}

          <div className="col-lg-3 col-md-6">
            <div className="supportCard">
              <div className="supportIcon">
                <i className="fa-solid fa-envelope"></i>
              </div>

              <h4>Email Support</h4>

              <p>jm382118@gmail.com.com</p>

              <a href="mailto:jm382118@gmail.com">Send Email →</a>
            </div>
          </div>

          {/* Phone */}

          <div className="col-lg-3 col-md-6">
            <div className="supportCard">
              <div className="supportIcon">
                <i className="fa-solid fa-phone"></i>
              </div>

              <h4>Call Support</h4>

              <p>+91 6296601904</p>
              <p>+91 8293538236</p>

              <a href="tel:+916296601904">Call Now →</a>
            </div>
          </div>

          {/* Ticket */}

          <div className="col-lg-3 col-md-6">
            <div className="supportCard">
              <div className="supportIcon">
                <i className="fa-solid fa-ticket"></i>
              </div>

              <h4>Raise Ticket</h4>

              <p>Create a support request anytime.</p>

              <a href="/">Open Ticket →</a>
            </div>
          </div>

          {/* Hours */}

          <div className="col-lg-3 col-md-6">
            <div className="supportCard">
              <div className="supportIcon">
                <i className="fa-solid fa-clock"></i>
              </div>

              <h4>Working Hours</h4>

              <p>
                Mon – Sat
                <br />
                9:00 AM – 6:00 PM
              </p>

              <a href="/">Learn More →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSupport;
