import React from 'react'
import './AboutUs.scss'
import UserImage from '../../Assets/Images/team.jpg';
import bg1IMG from '../../Assets/Images/bg-1.jpg';
import bg2IMG from '../../Assets/Images/bg-2.jpg';
function AboutUs() {
  return (
    <div>
      <div id="banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>About Us</h1>
              <p className="breadcrumb"><a href="/">Home</a>&nbsp;&gt;&nbsp;About Us</p>
            </div>
          </div>
        </div>
      </div>

      <div id="about-body" className="py-5">
        <div className="section section-1 mt-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 desktop-bg">
                <img src={bg1IMG} className="img-fluid" />
              </div>
              <div className="col-md-6 p-md-4">
                <h2>Heading 1</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eaque nihil nulla eius, quia provident omnis molestiae animi aspernatur
                  ipsum fugit optio corporis consectetur, error perferendis, distinctio numquam vel odit. Ipsam atque corrupti similique! Adipisci
                  excepturi error aliquid inventore cumque? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet optio natus adipisci eum
                  tempore explicabo!
                </p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic amet unde magnam perspiciatis deleniti aspernatur?</p>
              </div>
            </div>
          </div>
        </div>
        <div className="section section-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 p-md-4">
                <h2>Heading 2</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eaque nihil nulla eius, quia provident omnis molestiae animi aspernatur
                  ipsum fugit optio corporis consectetur, error perferendis, distinctio numquam vel odit. Ipsam atque corrupti similique! Adipisci
                  excepturi error aliquid inventore cumque? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet optio natus adipisci eum
                  tempore explicabo!
                </p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic amet unde magnam perspiciatis deleniti aspernatur?</p>
              </div>
              <div className="col-md-6 desktop-bg">
                <img src={bg2IMG} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <div className="section team-section mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 text-center mt-5 team-member">
                <img src={UserImage} alt="Team 1" className="img-fluid" />
                <h4 className="mt-4">Team Memeber</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="col-md-3 text-center mt-5 team-member">
                <img src={UserImage} alt="Team 1" className="img-fluid" />
                <h4 className="mt-4">Team Memeber</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="col-md-3 text-center mt-5 team-member">
                <img src={UserImage} alt="Team 1" className="img-fluid" />
                <h4 className="mt-4">Team Memeber</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="col-md-3 text-center mt-5 team-member">
                <img src={UserImage} alt="Team 1" className="img-fluid" />
                <h4 className="mt-4">Team Memeber</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              </div>
      
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs