import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { auth, database } from "../utils/firebase";
import * as handlePaymentCrypto from "../utils/handlePaymentCrypto";
import { useHistory } from "react-router";
import "@google/model-viewer/dist/model-viewer";
import { Button, Paper } from "@mui/material";

export default function ItemDetail(props) {
  const [products, setProducts] = useState(null);
  const currItem = props.currItem;
  const modelBackgroundColor = "#203864";
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        history.replace("/");
      }
      return unsubscribe;
    });

    database.ref("items/").on("value", (snapshot) => {
      let data = snapshot.val();
      setProducts(data);
    });
  }, []);

  const onPurchaseCryptoClick = (event) => {
    try {
      handlePaymentCrypto.openWeb3(event, false);
    } catch (err) {
      alert("Metamask Extension not installed");
    }
  };

  const onPurchaseNCRCoinClick = (event) => {
    try {
      handlePaymentCrypto.openWeb3(event, true);
    } catch (err) {
      alert("Metamask Extension not installed");
    }
  };

  const handleImageClick = (product) => {
    props.handleCurrItemChange(product);
    history.replace("/itemdetail");
  };
  
  if (!isAuth) {
    return <div></div>;
  } else {
    return (
      <div>
        <NavBar />
        <div className="bg-gray-900 relative z-50 min-h-full">
          <div className="mx-auto block m-24 text-center rounded-lg bg-gray-100 w-10/12 h-auto">
            <div className="flex">
              { currItem.mod_src && (
                <div className="w-6/12 h-96 border-red-700 m-14">
                <model-viewer
                  style = {{width: "500px", height: "500px"}}
                  class="model"
                  src={currItem.mod_src}
                  alt={currItem.description + " glb"}
                  preload=""
                  background-color={modelBackgroundColor}
                  shadow-intensity="1"
                  camera-controls=""
                  auto-rotate=""
                  ios-src={currItem.mod_ios_src}
                  quick-look-browsers="safari chrome"
                ></model-viewer>
              </div>
              )}
              { !currItem.mod_src && (
                <div className="w-6/12 m-24">
                <img src={currItem.img_src} className="" />
              </div>
              )}
              <div className="w-6/12">
                <h2 className="text-6xl font-extrabold tracking-tight text-center my-10 text-gray-900">
                  { currItem.name }
                </h2>
                <h2 className="text-4xl font-bold tracking-tight text-center my-10 text-gray-900">
                  { currItem.price }
                </h2>
                <h3 className="text-2xl font-medium tracking-tight text-center my-16 text-gray-900">
                  { currItem.desc }
                </h3>

                <button
                  className="inline-block bg-green-600 my-2 py-2 w-9/12 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-green-400"
                  onClick={onPurchaseCryptoClick}
                >
                  Buy With Crypto
                </button>
                <button
                  className="inline-block bg-yellow-600 my-2 py-2 w-9/12 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-yellow-400"
                  onClick={onPurchaseNCRCoinClick}
                >
                  Buy With NCR Coin
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 mx-24 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
              {console.log(products)}
              {products &&
                products.map((product, i) => (
                  <Paper key={i} onClick={() => handleImageClick(product)}>
                    <div key={i} className="group relative">
                      <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-96 lg:aspect-none">
                      <model-viewer
                        style = {{width: "280px", height: "375px"}}
                        class="model"
                        src={product.mod_src}
                        alt={product.description + " glb"}
                        preload=""
                        background-color={modelBackgroundColor}
                        shadow-intensity="1"
                        auto-rotate=""
                        ios-src={product.mod_ios_src}
                        quick-look-browsers="safari chrome"
                        rotation-per-second={(i % 2 == 0)? "500%" : "-500%"}
                        field-of-view="70deg"
                      ></model-viewer>
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
          <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">
            DESCRIPTION
          </h2>
        </div>
      </div>
    );
  }
}
