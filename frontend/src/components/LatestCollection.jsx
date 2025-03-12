import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';

const LatestCollection = () => {
    const { products } = useContext(ShopContext); // Fetch products from context
    const [latestProduct, setLatestProduct] = useState([]); // Initialize with an empty array

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProduct(products.slice(0, 10)); // Set the latest 10 products
        }
    }, [products]); // Add products to the dependency array

    return (
        <div className="my-10">
            {/* Title Section */}
            <div className="text-center py-8 text-3xl">
                <Title text1="Latest" text2="Collection" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    "Discover Deals | Premium Products at Unbeatable Prices"
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
                {latestProduct.map((item, index) => (
                    <ProductItems
                        key={item._id || index} // Use _id as the key if available
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
