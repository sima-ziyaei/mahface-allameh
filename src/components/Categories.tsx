import { Category } from "@/models/category.model";
import axios from "axios";
import { useEffect, useState } from "react";

const Categories = () => {
  const BASE_URL = process.env.BASE_URL;
  const [categories, setCategories] = useState<Category[]>();
  useEffect(() => {
    axios.get(`${BASE_URL}/api/Categories/GetAll`).then((res) => {
      console.log(res);
      setCategories(res.data);
    });
  }, []);

  return (
    <div>
      {categories?.map((el) => {
        return <p key={el.id}>{el.title}</p>;
      })}
    </div>
  );
};

export default Categories;
