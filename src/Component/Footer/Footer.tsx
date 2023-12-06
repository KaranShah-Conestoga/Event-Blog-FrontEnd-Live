import React from 'react'
import './Footer.scss'
import SendIcon from "../../Assets/Images/btn-button.png";

function Footer() {
  return (
    <div id="footer">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-5">
            <div className="h4">Enter Your Email</div>
            <form className="newsletter">
              <input type="email" placeholder="Your Email" />
              <button><img src={SendIcon} className="img-fluid" /></button>
            </form>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-4">
                <a href="#" className="mb-3">About</a>
                <a href="#" className="mb-3">About</a>
                <a href="#" className="mb-3">About</a>
              </div>
              <div className="col-md-4">
                <a href="#" className="mb-3">About</a>
                <a href="#" className="mb-3">About</a>
              </div>
              <div className="col-md-4">
                <h5>Let's Chat</h5>
                <a href="mailto:group_2@conestogac.on.ca">group_2@conestogac.on.ca</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid copyright-bar">
        <div className="row">
          <div className="col-12">
            <p className="text-white text-center">© 2023 _____________, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer