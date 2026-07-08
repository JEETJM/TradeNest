import "./styles/Charges.css";

function Charges() {
  return (
    <section id="charges" className="chargesSection">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Brokerage Charges</h2>

          <p>Transparent pricing with no hidden charges.</p>
        </div>

        <div className="table-responsive">
          <table className="table chargeTable align-middle">
            <thead>
              <tr>
                <th>Segment</th>

                <th>Brokerage</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Equity Delivery</td>

                <td>₹0</td>
              </tr>

              <tr>
                <td>Direct Mutual Funds</td>

                <td>₹0</td>
              </tr>

              <tr>
                <td>Equity Intraday</td>

                <td>0.03% or ₹20 per executed order, whichever is lower.</td>
              </tr>

              <tr>
                <td>Equity Futures</td>

                <td>0.03% or ₹20 per executed order, whichever is lower.</td>
              </tr>

              <tr>
                <td>Equity Options</td>

                <td>Flat ₹20 per executed order.</td>
              </tr>

              <tr>
                <td>Currency Futures</td>

                <td>0.03% or ₹20 per executed order.</td>
              </tr>

              <tr>
                <td>Currency Options</td>

                <td>Flat ₹20 per executed order.</td>
              </tr>

              <tr>
                <td>Commodity Futures</td>

                <td>0.03% or ₹20 per executed order.</td>
              </tr>

              <tr>
                <td>Commodity Options</td>

                <td>Flat ₹20 per executed order.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Charges;
