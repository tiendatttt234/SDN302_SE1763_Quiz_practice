import React, { useState } from "react";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";
import "./Homepage.css";

function HomePage() {
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  const cards1 = [
    {
      title: "Học",
    },
    {
      title: "Thẻ ghi nhớ",
    },
    {
      title: "Kiểm tra",
    },
    {
      title: "Ghép thẻ",
    },
  ];

  const cards2 = [
    {
      title2: "IELTS Speaking 1: Hometown",
    },
    {
      title2: "CKPX - Business - Auditory",
    },
  ];

  const visibleCount1 = 4;
  const visibleCount2 = 3;

  const visibleCards1 = [...cards1, ...cards1].slice(
    currentIndex1,
    currentIndex1 + visibleCount1
  );

  const visibleCards2 = [...cards2, ...cards2].slice(
    currentIndex2,
    currentIndex2 + visibleCount2
  );

  const next1 = () => {
    setCurrentIndex1((prevIndex) => (prevIndex + 1) % cards1.length);
  };

  const prev1 = () => {
    setCurrentIndex1(
      (prevIndex) => (prevIndex - 1 + cards1.length) % cards1.length
    );
  };

  const next2 = () => {
    setCurrentIndex2((prevIndex) => (prevIndex + 1) % cards2.length);
  };

  const prev2 = () => {
    setCurrentIndex2(
      (prevIndex) => (prevIndex - 1 + cards2.length) % cards2.length
    );
  };

  return (
    <div className="homepage-container">
      <div className="homepage-section">
        <h2>Section 1</h2>
        <div className="homepage-content">
          <button
            className="homepage-arrow-button homepage-left"
            onClick={prev1}
          >
            <CaretLeft />
          </button>
          <div className="homepage-card-container">
            {visibleCards1.map((card, index) => (
              <div key={index} className="homepage-card">
                <h2>{card.title}</h2>
                <div className="homepage-card-content">
                  {card.imgSrc && (
                    <img src={card.imgSrc} alt={card.alt || card.title} />
                  )}
                  {card.content && <p>{card.content}</p>}
                  {card.input && (
                    <input type="text" placeholder="Nhập đáp án" />
                  )}
                  {card.progress && (
                    <div className="progress-circle">
                      <div
                        className="circle-segment"
                        style={{ "--percentage": card.progress }}
                      ></div>
                      <span>{card.progress}%</span>
                    </div>
                  )}
                  {card.time && <p>Thời gian: {card.time}</p>}
                  {card.correct !== undefined && (
                    <div className="result-item">
                      <span className="icon checkmark">✓</span>
                      <span className="count">{card.correct}</span>
                    </div>
                  )}
                  {card.incorrect !== undefined && (
                    <div className="result-item">
                      <span className="icon crossmark">×</span>
                      <span className="count">{card.incorrect}</span>
                    </div>
                  )}
                  {card.matching && (
                    <div className="matching-game">
                      {card.matching.map((match, i) => (
                        <div key={i} className="item">
                          <span className="icon checkmark">✓</span>
                          <p>{match.content}</p>
                          <img src={match.imgSrc} alt={match.content} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            className="homepage-arrow-button homepage-right"
            onClick={next1}
          >
            <CaretRight />
          </button>
        </div>
      </div>

      <div className="homepage-section">
        <h2>Section 2</h2>
        <div className="homepage-content">
          <button
            className="homepage-arrow-button homepage-left"
            onClick={prev2}
          >
            <CaretLeft />
          </button>
          <div className="homepage-card-container">
            {visibleCards2.map((card, index) => (
              <div key={index} className="homepage-card homepage-card2">
                <h2>{card.title2}</h2>
                <p>{card.terms2}</p>
                <p>Giáo viên: {card.teacher2}</p>
              </div>
            ))}
          </div>
          <button
            className="homepage-arrow-button homepage-right"
            onClick={next2}
          >
            <CaretRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
