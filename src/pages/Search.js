import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import * as searchItem from "../utils/searchItem";
import { useHistory } from "react-router";
import { auth, database } from "../utils/firebase";
import { Typography } from "@mui/material";

export default function Search(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [prediction, setPrediction] = useState("none");
  const [products, setProducts] = useState(null);
  const history = useHistory();

  console.log(products);

  useEffect(() => {
    database.ref("items/").on("value", (snapshot) => {
      let data = snapshot.val();
      setProducts(data);
    });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        history.replace("/");
      }
      return unsubscribe;
    });
  }, []);

  const findMatchingClass = (data) => {
    Object.keys(products).forEach((i) => {
      if (i === 0) {
        if (data === "clock") {
          return products[i];
        }
      } else if (products[i].class === data) {
        console.log("found");
        props.handleCurrItemChange(products[i]);
        history.replace("/itemdetail");
      }
    });
    return null;
  };

  const onChangeHandler = async (event) => {
    let data = await searchItem.handleSearch(event);

    if (data) {
      let product = findMatchingClass(data);
      if (product) {
      }
    }
  };

  if (!isAuth) {
    return <div></div>;
  } else {
    return (
      <div>
        <NavBar />
        <div className="min-h-full mt-40 pb-20 bg-gradient-to-b from-gray-900 to-purple-900 relative z-40">
          <div className="stars">
            <div className="h-1"></div>
            <div className="mx-auto rounded-lg block m-12 text-center w-10/12 h-auto">
              <div className="grid pb-16 pt-6 grid-cols-1 my-14 bg-gradient-to-b from-yellow-600 to-red-600 rounded-md">
                <h2 className="w-full text-6xl font-extrabold tracking-tight text-center my-10 text-white">
                  ML SEARCH PREDICTION
                </h2>
                <div className="text-center">
                  <label for="upload-ar">
                    <img
                      src="https://i.pinimg.com/originals/a1/26/f3/a126f399104b7e828caca547957c46b3.jpg"
                      className="w-auto h-80 mx-auto cursor-pointer"
                    />
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="upload-ar"
                    accept=".jpg, .jpeg, .png"
                    className="hidden"
                    onInput={console.log("file inputted")}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
