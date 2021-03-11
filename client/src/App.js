import React, { useState, useEffect } from "react";
import { getAmount, getDonors, postDonation } from "./api";

const App = () => {
  const [amount, setAmount] = useState(50);
  const [totalAmount, setTotalAmount] = useState(0);
  const [allDonors, setAllDonors] = useState(0);
  const [err, setErr] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  useEffect(() => {
    getDonationsDetails()
  }, []);

  const getDonationsDetails = async () => {
    const total = await getAmount();
    const donors = await getDonors();
    if (total) {
      setTotalAmount(total)
    }
    if (donors) {
      setAllDonors(donors)
    }
  }

  const onInputSubmit = async (e) => {
    e.preventDefault();
    if (amount !== 0 && amount && !isNaN(amount) && amount > 0) {
      const message = await postDonation(amount);
      setSubmittedMessage(message)
      setErr(false)
      getDonationsDetails()
    } else {
      setErr(true)
      setSubmittedMessage('')
    }
  }

  const onInputChange = (e) => {
    setAmount(e.target.value);
    if (isNaN(amount) || amount < 0) {
      setErr(true)
    } else {
      setErr(false)
    }
  }

  return (
    <div className="fund">
      <div className="frame-out">
        <div className="frame-in">
          <section >
            <div className="speak-bubble">
              {
                totalAmount
                  ? <div><span className="bold">{totalAmount}$</span> has been invested in this project.</div>
                  : <div><span className="bold">167$</span> still needed for this project.</div>
              }
            </div>
            <div className="triangle"></div>
            <div className="main">
              <div className="progress-wrap">
                <div className="progress-bar">
                  <div className="progress-light"></div>
                  <div className="progress-light"></div>
                  <div className="progress-light"></div>
                  <div className="progress-light"></div>
                  <div className="progress-light"></div>
                  <div className="progress-light"></div>
                </div>
                <div className="empty-progress"></div>
              </div>
              <div className="space">
                <span className="progress-text bold">Only 3 days left </span>
                            to fund this projects.
                        </div>
              <div className="space">
                {
                  totalAmount
                    ? <div>join the <span className="bold">{allDonors}</span> other donors who have</div>
                    : <div>be the <span className="bold">first</span> donor</div>
                }
                <div>already supported this project. Every</div>
                <div>dollar helps.</div>
              </div>
              <form action="" className="space">
                <div className="row">
                  <div className="amount-wrapper">
                    $ <input type="text" className="amount" placeholder="50" onBlur={onInputChange} />
                  </div>
                  <input type="submit" className="submit" value="Give Now" onClick={onInputSubmit} />
                </div>
                {
                  err &&
                  <div className='err'>Amount must exist and be positive</div>
                }
                {
                  submittedMessage &&
                  <div className='submitted'>{submittedMessage}</div>
                }
              </form>
              <a href="/" target="_blank" className="space">Why give $50?</a>
            </div>
          </section>
          <section>
            <div className="row">
              <button>Save for later</button>
              <button>Tell your friends</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
