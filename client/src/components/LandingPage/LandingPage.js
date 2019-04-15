import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.scss';

const LangingPage = () => (
  <section className="hero">
    <h1 className="hero__title">Welcome to Orgello</h1>
    <p className="hero__text">
      Orgello is a miniature clone of
      <a className="hero__link" href="https://trello.com/">
        Trello
      </a>
      that supports Boards, Lists, and Cards.
    </p>
    <Link className="hero__cta" to="/signup">
      Sign Up Now
    </Link>
  </section>
);

export default LangingPage;
