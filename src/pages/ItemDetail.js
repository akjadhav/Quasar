import React from 'react'
import NavBar from '../components/NavBar'

  export default function ItemDetail() {
    return (
    <div>
      <NavBar />
      <div className="bg-white min-h-full">
        <div className="mx-auto block m-24 text-center bg-gray-200 w-10/12 h-auto">
          <div className="flex">
            <div className="w-3/12 m-24">
              <img
                src="https://resize.cdn.otakumode.com/exq/65/820.1093/shop/product/fd764746a7054f1096a3f52dab6953f3.jpg"
                className=""
              />
            </div>
            <div className="w-3/12 m-24">
              <model-viewer class="model" src="https://storage.echo3d.co/fragrant-sky-5504/37e7e2b4-6b02-41bc-b55b-4829856a8979.glb" alt="Miku Hatsune.glb" preload="" background-color="#203864" shadow-intensity="1" camera-controls="" auto-rotate="" ios-src="https://storage.echo3d.co/fragrant-sky-5504/9155b780-84a2-4303-8116-01d212faaa98.usdz" quick-look-browsers="safari chrome"></model-viewer>
            </div>
            <div className="w-6/12">
              <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">HATSUNE</h2>

              <button
                className="inline-block bg-green-600 py-2 w-5/12 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-green-400"
              >
                Cart
              </button>
            </div>      
          </div>
        </div>

        <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">DESCRIPTION</h2>
      </div>
    </div>
    )
  }
  