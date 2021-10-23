import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import * as test from '../utils/NCR_API.js'

import { Redirect } from 'react-router'
import getSiteById from '../utils/getSiteById'

import { useHistory } from 'react-router'
import { auth } from '../utils/firebase'
import { Button } from '@mui/material'

test.init_API();

const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
        id: 2,
        name: 'Chair',
        href: '#',
        imageSrc: 'https://m.media-amazon.com/images/I/41tCIsGV8UL.jpg',
        imageAlt: "A brown chair",
        price: '$75',
        color: 'Brown',
      },
      {
        id: 3,
        name: 'Hatsune Miku',
        href: '/itemdetail',
        imageSrc: 'https://resize.cdn.otakumode.com/exq/65/820.1093/shop/product/fd764746a7054f1096a3f52dab6953f3.jpg',
        imageAlt: "Waifu",
        price: '$200',
        color: 'Brown',
      },
  ]

  export default function Home() {
    const [isAuth, setAuth] = useState(false)
    const history = useHistory()
    const id = 1

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setAuth(true)
            } else {
                history.replace("/")
            }
        })
        return unsubscribe
    }, [])

    const handleSignOut = () => {
        if (isAuth){
            auth
            .signOut()
            .then(() => {
                history.replace('/')
            })
            .catch(error => alert(error.message))
        }   
    }
    return (
    <div>
      <NavBar id={id} />

      {isAuth && <div>
                <Button onClick={handleSignOut}>Sign Out</Button>
                <h1>THIS IS THE HOMEPAGE</h1>
          </div>}

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Departments</h2>
          <img
            src="https://images-prod.healthline.com/hlcmsresource/images/AN_images/benefits-of-oranges-1296x728-feature.jpg"
            className="w-full h-full"
          />


          <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">NCR AR STORE</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 mx-24 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-96 lg:aspect-none">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">OUR STORY</h2>

          <h2 className="text-6xl font-extrabold tracking-tight text-center my-24 text-gray-900">HACK GT</h2>
        </div>
      </div>
    </div>
    )
  }
  