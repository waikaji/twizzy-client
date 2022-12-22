import React from "react"
import "./home.style.css";
import { Link } from "react-router-dom";
import img1 from "../../assets/img1.jpeg"
import img2 from "../../assets/img2.jpeg"
import img3 from "../../assets/img3.svg"
import img4 from "../../assets/img4.svg"
import img5 from "../../assets/img5.svg"

function Home() {

  return (
    <main className="page">
      <section className="page-section">
        <section className="first-section">
          <div className="banner">
            <div className="banner-body">
              <h2 className="banner-title">
                Make learning awesome
              </h2>
              <p className="banner-description">
                  Twizzy delivers engaging learning to billions
              </p>
              <button className="banner-button">
                <Link to="/">
                  Play for fun
                </Link>
              </button>
            </div>
            <img src={img1} alt="" className="banner-image" />
          </div>
          <div className="banner">
            <div className="banner-body">
              <h2 className="banner-title">
                Explore content
              </h2>
              <p className="banner-description">
                Explore content and join one of the world’s largest educator communities.
              </p>
              <button className="banner-button">
                <Link to="/">
                  Check public quizes
                </Link>
              </button>
            </div>
            <img src={img2} alt="" className="banner-image" />
          </div>
        </section>
        <section className="second-section">
          <div className="section-background"></div>
          <div className="info">
            <div className="info-body">
              <h2 className="info-title">
                Twizzy at school
              </h2>
              <p className="info-description">
                Engaging group and distance learning for teachers and students.
              </p>
              <a href="/" className="info-link">
                Learn more &gt;
              </a>
            </div>
          </div>
          <div className="info">
            <div className="info-body">
              <h2 className="info-title">
                Twizzy at work
              </h2>
              <p className="info-description">
                Deliver training, presentations, meetings and events in-person or on any video conferencing platform.
              </p>
              <a href="/" className="info-link">
                Learn more &gt;
              </a>
            </div>
          </div>
          <div className="info">
            <div className="info-body">
              <h2 className="info-title">
                Twizzy at home
              </h2>
              <p className="info-description">
                Learning Apps and games for family fun or home study.
              </p>
              <a href="/" className="info-link">
                Learn more &gt;
              </a>
            </div>
          </div>
        </section>
        <section className="third-section">
          <h1>
            How does Twizzy work?
          </h1>
          <div className="card-container">
            <div className="card-home">
              <img src={img3} alt="" />
              <div className="card-body">
                <h1>Create</h1>
                <p>
                  It only takes minutes to create a learning game or trivia quiz on any topic, in any language.
                </p>
              </div>
            </div>
            <div className="card-home">
              <img src={img4} alt="" />
              <div className="card-body">
                <h1>
                  Host or share
                </h1>
                <p>
                  Host a live game with questions on a big screen or share a game with remote players.
                </p>
              </div>
            </div>
            <div className="card-home">
              <img src={img5} alt="" />
              <div className="card-body">
                <h1>Play</h1>
                <p>
                  Game on! Join a kahoot with a PIN provided by the host and answer questions on your device.
                </p>
              </div>
            </div>
          </div>
          <div className="card-button">
            Play Twizzy to see how it works.{" "}
            &nbsp;
            <a href="/">
              Explore our public quizes
            </a>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Home
