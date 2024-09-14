import { useState } from "react";
import Style from "./CategoriesDetails.module.css";
import { useEffect } from "react";

function CategoriesDetails() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log("Mounting CategoriesDetails");
  }, []);
  return (
    <>
      <div className="my-52">
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
          expedita, delectus molestias ad accusamus voluptates veritatis.
          Inventore reiciendis consequuntur ullam beatae quam, obcaecati at
          ipsum dolor, omnis fugiat, qui neque.
        </h2>
      </div>
    </>
  );
}

export default CategoriesDetails;
