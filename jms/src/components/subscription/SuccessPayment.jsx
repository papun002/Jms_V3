import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

function SuccessPayment() {
  const navi = useNavigate();

    const searchQuery = useSearchParams()[0]

    const refno = searchQuery.get('reference')

    const handleClick = () => {
      navi('/')
    }
  return (
    <div>
        <div className="row clearfix">
        <div className="col-12">
          <div class="card c_grid c_yellow">
            <div class="card-body text-white" style={{ background: "#E74C3C" }}>
              <div class="section-title">
                <h2>Payment Successfully Done !!</h2>
                <p>Reference No: {refno} </p>
                <p>Your Plan is Activated Now !</p>
                <button onClick={handleClick}>BACK TO HOME</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPayment