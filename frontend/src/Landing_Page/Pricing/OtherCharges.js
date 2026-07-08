import "./styles/OtherCharges.css";

function OtherCharges() {
  return (
    <section className="otherCharges">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Other Charges</h2>

          <p>Regulatory and statutory charges applicable on trades.</p>
        </div>

        <div className="table-responsive">
          <table className="table otherChargeTable align-middle">
            <thead>
              <tr>
                <th>Charge Type</th>

                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Account Opening</td>
                <td>₹0 for Trading & Demat Account</td>
              </tr>

              <tr>
                <td>Annual Maintenance (AMC)</td>
                <td>₹300 + GST per year (from second year)</td>
              </tr>

              <tr>
                <td>DP Charges</td>
                <td>Applicable on equity sell transactions.</td>
              </tr>

              <tr>
                <td>Call & Trade</td>
                <td>₹50 per executed order.</td>
              </tr>

              <tr>
                <td>Pledge Creation</td>
                <td>₹30 + GST per ISIN.</td>
              </tr>

              <tr>
                <td>GST</td>
                <td>18% on brokerage and transaction charges.</td>
              </tr>

              <tr>
                <td>STT/CTT</td>
                <td>As per Government regulations.</td>
              </tr>

              <tr>
                <td>Exchange Charges</td>
                <td>Charged as per NSE/BSE/MCX.</td>
              </tr>

              <tr>
                <td>SEBI Charges</td>
                <td>Applicable as prescribed by SEBI.</td>
              </tr>

              <tr>
                <td>Stamp Duty</td>
                <td>Charged according to state regulations.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default OtherCharges;
