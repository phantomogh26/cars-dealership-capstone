import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostReview.css";

const PostReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  const [review, setReview] = useState("");
  const [purchase, setPurchase] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const makesRes = await fetch("/djangoapp/get_cars");
      const makesJson = await makesRes.json();
      setCarMakes(makesJson.car_makes || []);

      const modelsRes = await fetch("/djangoapp/get_car_models");
      const modelsJson = await modelsRes.json();
      setCarModels(modelsJson.car_models || []);
    };
    fetchCars();
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();

    const reviewData = {
      name: username,
      dealership: id,
      review,
      purchase,
      purchase_date: purchaseDate,
      car_make: carMake,
      car_model: carModel,
      car_year: carYear ? parseInt(carYear, 10) : null,
    };

    const res = await fetch("/djangoapp/add_review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    const json = await res.json();
    if (json.status === 200) {
      navigate(`/dealer/${id}`);
    } else {
      alert("Có lỗi khi gửi đánh giá, vui lòng thử lại.");
    }
  };

  return (
    <div className="postreview_container">
      <form className="postreview_form" onSubmit={submitReview}>
        <h2>Viết đánh giá đại lý</h2>

        <label htmlFor="review">Nội dung đánh giá</label>
        <textarea
          id="review"
          rows="5"
          placeholder="Chia sẻ trải nghiệm của bạn..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />

        <label className="checkbox_label">
          <input
            type="checkbox"
            checked={purchase}
            onChange={(e) => setPurchase(e.target.checked)}
          />
          Tôi đã mua xe tại đại lý này
        </label>

        {purchase && (
          <>
            <label htmlFor="purchaseDate">Ngày mua</label>
            <input
              type="date"
              id="purchaseDate"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />

            <label htmlFor="carMake">Hãng xe</label>
            <select
              id="carMake"
              value={carMake}
              onChange={(e) => setCarMake(e.target.value)}
            >
              <option value="">-- Chọn hãng xe --</option>
              {carMakes.map((make) => (
                <option key={make.id} value={make.name}>
                  {make.name}
                </option>
              ))}
            </select>

            <label htmlFor="carModel">Mẫu xe</label>
            <select
              id="carModel"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
            >
              <option value="">-- Chọn mẫu xe --</option>
              {carModels.map((model) => (
                <option key={model.id} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>

            <label htmlFor="carYear">Năm sản xuất</label>
            <input
              type="number"
              id="carYear"
              placeholder="2023"
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
            />
          </>
        )}

        <button type="submit">Gửi đánh giá</button>
      </form>
    </div>
  );
};

export default PostReview;
