"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const CategoryProductsPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (category) fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/api/categories/${category}`
        );

        const data = await res.json();

        if (data.success) {
            setProducts(data.data);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">
                {category} Products
            </h1>

            <div className="grid md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="shadow rounded-xl p-4">
                        <img
                            src={product.images?.[0]}
                            className="h-48 w-full object-cover rounded-lg"
                        />

                        <h2 className="mt-4 font-bold">
                            {product.title}
                        </h2>

                        <p>৳ {product.price}</p>

                        <Link href={`/products/${product._id}`}>
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProductsPage;