import React, { useState } from "react";
import "./Homepage.css";
import Header from "../common/layout/Header";

function HomePage() {
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  const cards1 = [
    {
      title: "Học",
      imgSrc: "path/to/painting.jpg",
      alt: "Bức tranh",
      content: "la pintura",
      input: true,
    },
    {
      title: "Thẻ ghi nhớ",
      imgSrc: "path/to/heart.jpg",
      alt: "Trái tim",
      content: "tĩnh mạch chủ trên",
    },
    {
      title: "Kiểm tra",
      progress: 75,
      time: "6 phút",
      correct: 9,
      incorrect: 3,
    },
    {
      title: "Ghép thẻ",
      imgSrc: "path/to/stomach.jpg",
      alt: "Dạ dày",
      matching: [{ content: "phổi", imgSrc: "path/to/lungs.jpg" }],
    },
  ];

  const cards2 = [
    {
      title2: "IELTS Speaking 1: Hometown",
      terms2: "21 terms",
      teacher2: "do_huyen_trang",
      imgSrc2:
        "https://images.unsplash.com/photo-1490730141103-66a8b44f646f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title2: "CKPX - Business - Auditory",
      terms2: "17 terms",
      teacher2: "mysheotool",
      imgSrc2:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    // Additional card objects...
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
    <>
    {/* <div><Header /></div> */}
    <div className="homepage-container">
      <div className="homepage-section">
        <h2>Section 1</h2>
        <div className="homepage-content">
          <button
            className="homepage-arrow-button homepage-left"
            onClick={prev1}
          >
            {"<"}
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
            {">"}
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
            {"<"}
          </button>
          <div className="homepage-card-container">
            {visibleCards2.map((card, index) => (
              <div key={index} className="homepage-card homepage-card2">
                <h2>{card.title2}</h2>
                <p>{card.terms2}</p>
                <p>Giáo viên: {card.teacher2}</p>
                <img src={card.imgSrc2} alt={card.title2} />
              </div>
            ))}
          </div>
          <button
            className="homepage-arrow-button homepage-right"
            onClick={next2}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default HomePage;
