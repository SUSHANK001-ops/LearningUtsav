import React from "react";
import products from "../../assest";
import { useCart } from "../context/CartContext";

const Products = () => {
    const { addToCart } = useCart();
    return (
        <section className="flex justify-center">
            <div className="p-9 m-6 rounded-2xl border bg-gradient-to-br from-rose-100 to-rose-300 w-full max-w-7xl">
                <h1 className="font-bold text-2xl mb-2">Our Products</h1>
                <p className="mb-6">We offer the best products to our customer</p>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="product-card border-2 p-4 rounded-xl border-rose-400 bg-white shadow hover:shadow-lg transition-all flex flex-col items-center"
                        >
                            <span className="px-3 py-1 mb-2 rounded-full bg-rose-500 text-white text-sm font-semibold self-start">
                                ${product.price}
                            </span>
                            <img
                                height={200}
                                width={300}
                                className="rounded-xl mb-3 object-cover"
                                src={product.image}
                                alt={product.name}
                            />
                            <h1 className="font-bold text-xl mb-1">{product.name}</h1>
                            <p className="mb-3 text-gray-600 text-sm">{product.desc}</p>
                            <button
                                onClick={() => addToCart(product)}
                                className="outline outline-rose-400 p-2 rounded-2xl cursor-pointer hover:bg-rose-100 transition"
                            >
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
