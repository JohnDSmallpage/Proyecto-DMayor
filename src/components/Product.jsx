import React from 'react'

export function Product({info}) {
  return (
    <>
    <div class="lg:w-1/4 md:w-1/2 p-4 ">
        <a class="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260"/>
        </a>
        <div class="mt-4">
          <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{info.category}</h3>
          <h2 class="text-gray-900 title-font text-lg font-medium">{info.name_product}</h2>
          <p class="mt-1">{info.price}</p>
        </div>
      </div>
    </>
  )
}
