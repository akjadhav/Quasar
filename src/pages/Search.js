import React from 'react'
import NavBar from '../components/NavBar'

  export default function Search() {
    return (
    <div>
      <NavBar />
      <div className="bg-white">

        <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">SEARCH</h2>

        <div className="flex mx-auto w-10/12 px-24">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            name="search"
            id="search"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Pencils"
          />
        </div>

        <div className="grid grid-cols-2 mb-24">
          <div>
            <h2 className="text-6xl font-extrabold tracking-tight text-center m-24 text-gray-900">SEARCH</h2>
            <div class="w-40 h-40 mx-auto bg-gray-200">

            </div>
          </div>
          <div>
            <h2 className="text-6xl font-extrabold tracking-tight text-center m-24 text-gray-900">SEARCH</h2>
          </div>
        </div>
      </div>
    </div>
    )
  }
  