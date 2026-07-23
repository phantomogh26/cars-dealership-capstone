import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Dealer.css";

const Dealer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const username = sessionStorage.getItem("username");

  const fetchDealer = async () => {
    const res = await fetch(`/djangoapp/dealer/${id}`);
    const json = await res.json();
    if (json.status === 200 && json.dealer.length > 0) {
      setDealer(json.dealer[0]);
    }
  };

  const fetchReviews = async () => {
    const res = await fetch(`/djangoapp/reviews/dealer/${id}`);
    const json = await res.json();
    if (json.status === 200) {
      setReviews(json.reviews);
    }
  };

  useEffect(() => {
    fetchDealer();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sentimentEmoji = (sentiment) => {
    if (sentiment === "positive") return "🙂 Positive";
    if (sentiment === "negative") return "🙁 Negative";
    return "😐 Neutral";
  };

  if (!dealer) {
    return <div className="dealer_container">Đang tải thông tin đại lý...</div>;
  }

  return (
    <div className="dealer_container">
      <button className="back_button" onClick={() => navigate("/")}>
        ← Quay lại danh sách
      </button>

      <div className="dealer_header">
        <h1>{dealer.full_name}</h1>
        <p>{dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}</p>
      </div>

      <div className="reviews_section">
        <div className="reviews_header">
          <h2>Đánh giá khách hàng</h2>
          {username && (
            <a className="post_review_btn" href={`/postreview/${id}`}>
              + Viết đánh giá
            </a>
          )}
        </div>

        {reviews.length === 0 ? (
          <p>Chưa có đánh giá nào cho đại lý này.</p>
        ) : (
          <div className="reviews_list">
            {reviews.map((r) => (
              <div className="review_card" key={r.id}>
                <div className="review_top">
                  <strong>{r.name}</strong>
                  <span className={`sentiment_badge sentiment_${r.sentiment}`}>
                    {sentimentEmoji(r.sentiment)}
                  </span>
                </div>
                <p className="review_text">{r.review}</p>
                {r.purchase && (
                  <p className="review_meta">
                    Đã mua: {r.car_year} {r.car_make} {r.car_model} ({r.purchase_date})
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dealer;
