import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import * as test from "../utils/NCR_API.js";
import { test2 } from "../utils/echo3D";
import { Redirect } from "react-router";
import getSiteById from "../utils/getSiteById";
import { useHistory } from "react-router";
import { auth, database } from "../utils/firebase";
import { Button, Paper } from "@mui/material";
import { putItem } from "../utils/database_api";
import Image from "material-ui-image";

test.init_API();

export default function Home(props) {
  //putItem("Hatsune Miku", "2", 'https://resize.cdn.otakumode.com/exq/65/820.1093/shop/product/fd764746a7054f1096a3f52dab6953f3.jpg', 'https://storage.echo3d.co/fragrant-sky-5504/37e7e2b4-6b02-41bc-b55b-4829856a8979.glb', 'https://storage.echo3d.co/fragrant-sky-5504/9155b780-84a2-4303-8116-01d212faaa98.usdz','$200', 'Hatsune Miku Figure');
  const [products, setProducts] = useState(null);
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  const id = 1;

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

  const handleAddScan = () => {
    const updates = {};
    const unsubscribe = database
      .ref("users/" + auth.currentUser.uid + "/scans/")
      .child("numScans")
      .transaction(function (numScans) {
        return (numScans || 0) + 1;
      });
    return unsubscribe;
  };

  const handleSignOut = () => {
    if (isAuth) {
      auth
        .signOut()
        .then(() => {
          history.replace("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  const handleImageClick = (product) => {
    history.replace("/itemdetail");
    props.setCurrItem(product);
  };

  if (!isAuth) {
    return <div></div>;
  } else {
    return (
      <div>
        <NavBar id={id} />

        {isAuth && (
          <div>
            <Button onClick={handleSignOut}>Sign Out</Button>
            <h1>THIS IS THE HOMEPAGE</h1>
          </div>
        )}

        <Button onClick={handleAddScan}>Add Scan</Button>

        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Departments
            </h2>
            <img
              src="https://images-prod.healthline.com/hlcmsresource/images/AN_images/benefits-of-oranges-1296x728-feature.jpg"
              className="w-full h-full"
            />

            <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">
              NCR AR STORE
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 mx-24 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
              {console.log(products)}
              {products &&
                products.map((product, i) => (
                  <Paper key={i} onClick={() => handleImageClick(product)}>
                    <div key={i} className="group relative">
                      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-96 lg:aspect-none">
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

            <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">
              OUR STORY
            </h2>

            <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">
              HACK GT
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
