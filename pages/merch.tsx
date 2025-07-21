import React from 'react';
import Image from 'next/image';

export default function MerchPage() {
  const items = [
    { id: 1, name: 'Deep Crimson Tee', price: '$30', img: '/images/tee1.jpg' },
    { id: 2, name: 'SPL@T Jockstrap', price: '$25', img: '/images/jock1.jpg' },
    { id: 3, name: 'Jet Black Cap', price: '$20', img: '/images/cap1.jpg' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">SPL@T Merch</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <Image
              src={item.img}
              alt={item.name}
              width={500}
              height={500}
              className="w-full mb-2 rounded"
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.price}</p>
            <button className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-red-800 transition">
              Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
