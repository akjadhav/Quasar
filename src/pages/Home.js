import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useHistory } from "react-router";
import { auth, database } from "../utils/firebase";
import { Button, Paper } from "@mui/material";
import { putItem } from "../utils/database_api";

export default function Home(props) {
  putItem(
    "Alarm Clock",
    "0",
    "https://storage.echo3d.co/flat-poetry-6028/24f46462-fe01-470f-a0c7-ab22875061cf.png",
    "https://storage.echo3d.co/flat-poetry-6028/250639c3-f867-4b0c-9731-2b82b62394b8.glb",
    "https://storage.echo3d.co/flat-poetry-6028/6e556520-1ffa-4784-90ba-61cd347a36b3.usdz",
    "$10",
    "Alarm Clock to Wake the Deepest of Sleepers"
  );
  const [products, setProducts] = useState(null);
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  const id = 1;
  const modelBackgroundColor = "#203864";

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
  });

  const handleAddScan = () => {
    const unsubscribe = database
      .ref("users/" + auth.currentUser.uid + "/scans/")
      .child("numScans")
      .transaction(function (numScans) {
        return (numScans || 0) + 1;
      });
    return unsubscribe;
  };

  const handleImageClick = (product) => {
    props.handleCurrItemChange(product);
    history.replace("/itemdetail");
  };

  if (!isAuth) {
    return <div></div>;
  } else {
    return (
      <div className="">
        <NavBar id={id} />

        {"DONT MOVE THIS BUTTON OR ELSE THINGS WILL BREAK"}
        {isAuth && (
          <div>
            <Button>Sign Out</Button>
            <h1>THIS IS THE HOMEPAGE</h1>
          </div>
        )}

        <Button onClick={handleAddScan}>Add Scan</Button>

        <div className="bg-gradient-to-b from-gray-900 to-purple-900 relative z-40">
          <div className="stars">
            <div className="max-w-2xl mx-auto px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 -my-32 z-0">
              <h1 className="text-6xl mb-20 drop-shadow-lg font-extrabold tracking-tight text-center my-0 text-white">
                ECOMMERCE FOR THE FUTURE.
              </h1>

              {/* product cells div */}
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 mx-24 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
                {console.log(products)}
                {products &&
                  products.map((product, i) => (
                    <Paper key={i} onClick={() => handleImageClick(product)}>
                      {/* each cell */}
                      <div
                        key={i}
                        className="group p-4 drop-shadow-2xl relative cell"
                      >
                        <div className="w-full rounded-xl min-h-80 bg-gradient-to-b from-blue-900 to-green-300 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-80 lg:h-112 lg:aspect-none cell">
                          <model-viewer
                            style={{
                              width: "280px",
                              height: "390px",
                              paddingTop: "20px",
                              paddingBottom: "20px",
                              background: "none",
                            }}
                            class="model"
                            src={product.mod_src}
                            alt={product.description + " glb"}
                            preload=""
                            background-color={modelBackgroundColor}
                            shadow-intensity="1"
                            auto-rotate=""
                            ios-src={product.mod_ios_src}
                            quick-look-browsers="safari chrome"
                            rotation-per-second={i % 2 === 0 ? "500%" : "-500%"}
                            field-of-view="70deg"
                            auto-rotate-delay="0"
                          >
                            <div slot="progress-bar" />
                          </model-viewer>
                        </div>
                        <div className="mt-4 p-4 flex justify-between">
                          <h3 className="text-2xl font-extrabold text-gray-700">
                            <a href="./">
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

              <h2 className="text-6xl drop-shadow-lg font-extrabold tracking-tight text-center mt-24 text-white">
                OUR STORY
              </h2>

              <h2 className="text-2xl drop-shadow-lg font-light tracking-tight text-center  my-8 text-white">
                We believe that your shopping should be as smart as you are.
                Experience an intelligent shopping platform that utilizes AR and
                machine-learning to find the product you need. Crypto friendly
                and NCR-services compatible.
              </h2>

              <h2 className="text-6xl drop-shadow-lg font-extrabold tracking-tight text-center mt-24 text-white">
                HACK GT
              </h2>

              <h2 className="text-2xl drop-shadow-lg font-light tracking-tight text-center my-8 text-white">
                Proudly sleep-deprived to bring you this platform.
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
