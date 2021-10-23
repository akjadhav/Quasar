import React, {useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import * as searchItem from '../utils/searchItem'
import { useHistory } from 'react-router'
import { auth, database } from '../utils/firebase'

export default function Search() {
  const [isAuth, setIsAuth] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setIsAuth(true)
        } else {
          history.replace('/')
        }
        return unsubscribe;
      });
  },[])

  const onChangeHandler = (event) => {
    searchItem.handleSearch(event);
  };

  if (!isAuth) {
    return(<div></div>);
  } else {
    return (
    <div>
      <NavBar />
      <div className="bg-white">

        <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">SEARCH</h2>

        <div className="flex mx-auto w-10/12 mx-24">
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
          <div className="text-center">
            <h2 className="text-6xl font-extrabold tracking-tight text-center m-24 pl-80 text-gray-900">SEARCH</h2>
            <label for="upload-ar">
              <img
                src="https://i.pinimg.com/originals/a1/26/f3/a126f399104b7e828caca547957c46b3.jpg"
                className="w-auto h-80 mx-auto pl-80 cursor-pointer"
              />
            </label>
            <input
              type="file"
              name="file"
              id="upload-ar"
              className="hidden" 
              onChange={onChangeHandler}
            />
          </div>
          <div className="mt-40">
            <h2 className="text-3xl font-bold tracking-tight text-center m-24 text-gray-900 pr-80">Item Name</h2>
            <h3 className="text-2xl font-light tracking-tight m-24 text-gray-900 pr-80">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h3>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
