import React from 'react'
import NavBar from '../components/NavBar'
import chair from '../assets/chair.glb'
import "@google/model-viewer/dist/model-viewer";
  export default function ItemDetail() {
    return (
    <div>
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      <NavBar />
      <div className="bg-white min-h-full">
        <div className="mx-auto block m-24 text-center bg-gray-200 w-10/12 h-auto">
          <div className="flex">
            <div className="w-3/12 m-24">
              <img
                src="https://m.media-amazon.com/images/I/41tCIsGV8UL.jpg"
                className=""
              />
            </div>
            <div className="w-3/12 m-24">
            <model-viewer class="model" id="3ea639aa-c468-4307-a1a8-dfaadc3c8baa" src="https://storage.echo3d.co/fragrant-sky-5504/6c647c7e-83e9-48fc-87a2-5d87ea9a785a.glb" alt="Herman Miller Aeron Chair.glb" preload="" background-color="#203864" poster="../../../../assets/images/cloud_background.png" shadow-intensity="1" camera-controls="" auto-rotate="" ios-src="https://storage.echo3d.co/fragrant-sky-5504/aead0d72-6a86-4c9f-9c09-e28fa96e4394.usdz" quick-look-browsers="safari chrome"></model-viewer>
            </div>
            <div className="w-6/12">
              <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">CHAIR</h2>

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
  