import React from 'react'
import NavBar from '../components/NavBar'
import {auth, database} from '../utils/firebase'
import * as handlePaymentCrypto from '../utils/handlePaymentCrypto'

  export default function ItemDetail(props) {
    const currItem = props.currItem
    const modelBackgroundColor = "#203864"

    const onPurchaseCryptoClick = (event) => {
        try {
            handlePaymentCrypto.openWeb3(event);
          }
          catch(err) {
            alert("Metamask Extension not installed")
          }
      };

    return (
    <div>
      <NavBar />
      <div className="bg-white min-h-full">
        <div className="mx-auto block m-24 text-center bg-gray-200 w-10/12 h-auto">
          <div className="flex">
            <div className="w-3/12 m-24">
              <img
                src={currItem.img_src}
                className=""
              />
            </div>
            <div className="w-3/12 m-24">
              <model-viewer class="model" src={currItem.mod_src} alt={currItem.description + ' glb'} preload="" background-color={modelBackgroundColor} shadow-intensity="1" camera-controls="" auto-rotate="" ios-src={currItem.mod_ios_src} quick-look-browsers="safari chrome"></model-viewer>
            </div>
            <div className="w-6/12">
              <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">HATSUNE</h2>

              <button
                className="inline-block bg-green-600 py-2 w-5/12 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-green-400"
              >
                Add to Cart
              </button>
              <button
                className="inline-block bg-green-600 py-2 w-5/12 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-green-400"
                onClick={onPurchaseCryptoClick}
              >
                Buy With Crypto
              </button>
            </div>      
          </div>
        </div>

        <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">DESCRIPTION</h2>
      </div>
    </div>
    )
  }
  