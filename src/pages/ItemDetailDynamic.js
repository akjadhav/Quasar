import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { auth, database } from "../utils/firebase";
import * as handlePaymentCrypto from "../utils/handlePaymentCrypto";
import { useHistory } from "react-router";
import "@google/model-viewer/dist/model-viewer";
import { Card, Paper, Box, Typography, Button, Modal } from "@mui/material";

let blockchainData = require('../utils/blockchain/privateBlockchain.json').blockchain;
console.log(blockchainData);

export default function ItemDetail(props) {
  const [products, setProducts] = useState(null);
  const currItem = props.currItem;
  const modelBackgroundColor = "#203864";
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();

  const [isModal, setIsModal] = useState(false);
  const handleOpen = () => setIsModal(true);
  const handleClose = () => setIsModal(false);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };

  if (!isAuth) {
    return <div></div>;
  } else {
    return (
      <div>
        <NavBar />
        <div className="min-h-full mt-40 pb-20 bg-gradient-to-b from-gray-900 to-purple-900 relative z-40">
          <div className="stars">
            <div className="mx-auto rounded-lg block m-24 text-center w-10/12 h-auto">
              <div className="h-14"></div>

              {/* main product detail cell */}
              <div className="flex mt-30 bg-gradient-to-b from-orange to-magenta-900 rounded-md" style={{ height: "660px" }}>
                {currItem.mod_src && (
                  <div className="w-6/12 h-96 border-red-700 m-14 model">
                    <model-viewer
                      style={{ width: "500px", height: "500px" }}
                      class="model"
                      src={currItem.mod_src}
                      alt={currItem.description + " glb"}
                      preload=""
                      background-color={modelBackgroundColor}
                      shadow-intensity="1"
                      camera-controls=""
                      auto-rotate=""
                      disable-zoom
                      rotation-per-second="1"
                      ios-src={currItem.mod_ios_src}
                      quick-look-browsers="safari chrome"
                    ><div slot="progress-bar" /></model-viewer>
                  </div>
                )}
                {!currItem.mod_src && (
                  <div className="w-6/12 m-24">
                    <img src={currItem.img_src} className="" alt="no 3d model found." />
                  </div>
                )}
                <div className="mt-16 w-6/12">
                  <h2 className="text-6xl font-extrabold tracking-tight text-center my-10 text-white">
                    {currItem.name}
                  </h2>
                  <h2 className="text-4xl font-bold tracking-tight text-center my-10 text-white">
                    {currItem.price}
                  </h2>
                  <h3 className="text-2xl font-medium tracking-tight text-center text-white">
                    {currItem.desc}
                  </h3>


                  <button
                    className="mt-20 inline-block bg-black my-1 py-3 w-9/12 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-gray-900"
                    onClick={onPurchaseCryptoClick}
                  >
                    Buy With Crypto
                  </button>
                  <button
                    className="inline-block bg-yellow-600 my-2 py-3 w-9/12 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-yellow-500"
                    onClick={onPurchaseNCRCoinClick}
                  >
                    Buy With NCR Coin
                  </button>
                  <div>
                    <a
                      href="#"
                      className="inline-block bg-white w-9/12 mt-10 py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-900 hover:bg-indigo-50"
                      onClick={handleOpen}
                    >
                      View in AR on your phone
                    </a>
                    <Modal
                      open={isModal}
                      onClose={handleClose}
                    >
                      <Card>
                        <Box sx={styleModal}>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <h2 className="text-2xl font-extrabold text-center">Scan With Your Phone</h2>
                            <img className="mx-auto" src={currItem.img_src} alt='qr'></img>
                          </Typography>
                        </Box>
                      </Card>
                    </Modal>
                  </div>
                </div>
              </div>

              {/* stats */}
              <div className="grid pb-16 pt-6 grid-cols-1 my-14 bg-gradient-to-b from-green-600 to-blue-900 rounded-md">
                <h2 className="w-full text-6xl font-extrabold tracking-tight text-center my-10 text-white">
                  Product Lifecycle
                </h2>
                <div className="w-full text-white ">
                  <p className="text-lg mb-5">
                    * Each entry represents a unique QC of the product, including the unique hash ID that maps to the public QC ledger
                  </p>
                  { blockchainData.map((block, i)=> (
                    <div key={i} className="mb-3">
                      <p className="text-xl font-extrabold">
                      { block.timestamp }
                      </p>
                      <p className="text-s">
                      { block.hash }
                      </p>
                      
                    </div>

                  ))}

                </div>
              </div>
            </div>
            <h1 className="text-6xl font-extrabold tracking-tight text-center my-24 text-white">
              RECOMMENDED PRODUCTS
            </h1>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 mx-48 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
              {console.log(products)}
              {products &&
                products.map((product, i) => (
                  <Paper key={i} onClick={() => handleImageClick(product)}>
                    {/* each cell */}
                    <div key={i} onClick={() => scrollToTop()} className="group p-4 drop-shadow-2xl relative cell">
                      <div className="w-full rounded-xl min-h-80 bg-gradient-to-b from-blue-900 to-green-300 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-80 lg:h-112 lg:aspect-none cell">
                        <model-viewer
                          style={{ width: "280px", height: "390px", paddingTop: "20px", marginTop: "20px", paddingBottom: "20px", background: "none" }}
                          class="model"
                          src={product.mod_src}
                          alt={product.description + " glb"}
                          preload=""
                          background-color={modelBackgroundColor}
                          shadow-intensity="1"
                          auto-rotate=""
                          ios-src={product.mod_ios_src}
                          quick-look-browsers="safari chrome"
                          rotation-per-second={(i % 2 == 0) ? "500%" : "-500%"}
                          field-of-view="70deg"
                          auto-rotate-delay='0'>
                          <div slot="progress-bar" />
                        </model-viewer>
                      </div>
                      <div className="mt-4 p-4 flex justify-between">
                        <h3 className="text-2xl font-extrabold text-gray-700">
                          <a>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            <p>{product.name}</p>
                          </a>
                        </h3>
                        <p className="text-2xl font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </Paper>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}