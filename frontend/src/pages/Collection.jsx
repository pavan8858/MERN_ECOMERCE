import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collection = () => {

  const {products , search, showSearch} = useContext(ShopContext);
  const[showFilter , setShowFilter] = useState(false);
  const[filterProduct , setfilterProducts] = useState([]);
  const[category , setCategory] = useState([]);
  const[subCategory , setSubCategory] = useState([]);
  const[sortType, setSortType] =useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // Remove the category if it already exists in the array
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      // Add the category if it doesn't exist
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // Remove the SubCategory if it already exists in the array
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      // Add the SetCategory if it doesn't exist
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilter = () =>{
    let productsCopy = products.slice();

    if(showSearch, search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length>0){
      productsCopy= productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    };
   
    
    
    setfilterProducts(productsCopy);
  }

  const sortProduct = () =>{
    let fpCopy = filterProduct.slice();
    switch(sortType){
      case 'low-high':
        setfilterProducts(fpCopy.sort((a,b) => (a.price - b.price)));
        break;

      case 'high-low':
        setfilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }


  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType]);

  return (
    <div className='flex felx-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options  */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 '>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' :'' }`}src= {assets.dropdown_icon} alt=''/>
        </p>
        {/* Ctegroy Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES </p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className="flex items-center gap-2">
            <input className="w-4 h-4"
            type="checkbox"
            id="men"
            value="Men"
            onChange={toggleCategory}

          />
          <label htmlFor="men" className="text-gray-700">Men</label>
          </p>

          <p className="flex items-center gap-2">
            <input className="w-4 h-4"
            type="checkbox"
            id="women"
            value="Women"
            onChange={toggleCategory}
            
          />
          <label htmlFor="women" className="text-gray-700">Women</label>
          </p>
          <p className="flex items-center gap-2">
            <input className="w-4 h-4"
            type="checkbox"
            id="kids"
            value="Kids"
            onChange={toggleCategory}
          />
          <label htmlFor="Kids" className="text-gray-700">Kids</label>
          </p>

          </div>

        </div>
        {/* SubCategory Filter*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SUBCATEGORIES </p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className="flex items-center gap-2">
            <input className="w-4 h-4"
            type="checkbox"
            id="Topwear"
            value="Topwear"
            onChange={toggleSubCategory}
            
          />
          <label htmlFor="Topwear" className="text-gray-700">TopWear</label>
          </p>

          <p className="flex items-center gap-2">
            <input className="w-4 h-4"
            type="checkbox"
            id=" BottomBear"
            value="Bottomwear"
            onChange={toggleSubCategory}
          />
          <label htmlFor="women" className="text-gray-700">BottomWear</label>
          </p>
          <p className="flex items-center gap-2">
            <input className="w-4 h-4"
            type="checkbox"
            id="WinterBear"
            value="Winterwear"
            onChange={toggleSubCategory}
          />
          <label htmlFor="women" className="text-gray-700">WinterWear</label>
          </p>

          </div>

        </div>
        

      </div>

      {/* Right Side*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 '>
          <Title text1={"ALL"} text2={"COLLECTION"}/>
          {/* Product Sort  */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border- 2 border-gray-300 text-sm px-2'>
            <option value="relevent">Sort by: relevent </option>
            <option value="low-high">Sort by: low to high </option>
            <option value="high-low">Sort by: high to low </option>
          </select>
        </div>
        {/* Map Product  */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProduct.map((item, index) => (
            <ProductItems
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Collection