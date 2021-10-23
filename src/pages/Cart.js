import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useHistory } from "react-router";
import { auth, database } from "../utils/firebase";
import { Button, Paper } from "@mui/material";

export default function Cart(props) {
  const [products, setProducts] = useState(null);
  const history = useHistory();
  const id = 1;
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        history.replace("/");
      }
      return unsubscribe;
    });
  }, []);

  useEffect(() => {
    database.ref("items/").on("value", (snapshot) => {
      let data = snapshot.val();
      setProducts(data);
    });
  }, []);

  const handleImageClick = (product) => {
    history.replace("/itemdetail");
    props.setCurrItem(product);
  };

  if (!isAuth) {
    return <div></div>;
  } else {
    return (
      <div>
        <NavBar />

        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">
              CART
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 mx-24 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
              {console.log(products)}
              {products &&
                products.map((product, i) => (
                  <Paper key={i} onClick={() => handleImageClick(product)}>
                    <div key={i} className="group relative">
                      <div className="w-full min-h-48 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-48 lg:aspect-none">
                        <img
                          src={product.img_src}
                          alt={product.desc}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </Paper>
                ))}
            </div>

            <div className="mt-20">
              <button className="inline-block bg-green-600 py-2 w-full px-24 border border-transparent rounded-md text-base font-medium text-white hover:bg-green-400">
                Chcckout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
