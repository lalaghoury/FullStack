import React, { useEffect, useState } from "react";
import "./CategoriesCard.scss";
import { Link } from "react-router-dom";
import { useFunctions } from "../../context/FunctionsSupply";

function CategoriesCard() {
  const { getAllCategories } = useFunctions();
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setAllCategories(data)).catch((error) => console.log(error)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="categories-wrapper">
      {loading ? (<div>Loading...</div>) : (
        allCategories.map((item) =>
          <div key={item._id} className="category-card">
            <div className="category-card-img">
              <img src={item.categoryimage} alt="img" />
            </div>
            <div className="category-card-text">
              <h3><Link className="links-fix text-black" to={`/category/${item._id}`}>{item.categoryname}</Link></h3>
            </div>
          </div>
        )
      )}

    </div>
  );
}

export default CategoriesCard;
