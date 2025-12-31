import { CirclePlus } from 'lucide-react';

export default function Menu() {
    const products = [
        {
            name: "Barobbo",
            category: "Food",
            price: 12.00,
            items: 64,
            sold: 8,
        },
        {
            name: "Burger",
            category: "Food",
            price: 8.00,
            items: 84,
            sold: 20,
        },
        {
            name: "Batagor",
            category: "Food",
            price: 6.00,
            items: 34,
            sold: 3,
        },
        {
            name: "Cireng",
            category: "Food",
            price: 12.00,
            items: 64,
            sold: 8,
        },
        {
            name: "Chicken",
            category: "Food",
            price: 16.00,
            items: 210,
            sold: 20,
        },
        {
            name: "Katsu",
            category: "Food",
            price: 2.00,
            items: 34,
            sold: 33,
        },
        {
            name: "Fish & Chips",
            category: "Food",
            price: 12.00,
            items: 64,
            sold: 8,
        },
        {
            name: "Gyoza",
            category: "Food",
            price: 29.00,
            items: 17,
            sold: 10,
        },
        {
            name: "Vegetable",
            category: "Food",
            price: 3.00,
            items: 102,
            sold: 54,
        },
        {
            name: "Kopi",
            category: "Drinks",
            price: 12.00,
            items: 54,
            sold: 43,
        },
        {
            name: "Cappucino",
            category: "Drink",
            price: 12.00,
            items: 120,
            sold: 50,
        },
        {
            name: "Creamy",
            category: "Drink",
            price: 30.00,
            items: 400,
            sold: 240,
        },
        {
            name: "Latte",
            category: "Drink",
            price: 34.00,
            items: 432,
            sold: 300,
        },
        {
            name: "Cola",
            category: "Drink",
            price: 6.00,
            items: 500,
            sold: 320,
        },
        {
            name: "Sprite",
            category: "Drink",
            price: 6.00,
            items: 500,
            sold: 320,
        },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {/* Contoh satu card produk */}
            {products.map((product, index) => (
                <div key={index} className="flex flex-col rounded-xl bg-white shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full mt-1">
                                {product.category}
                            </span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer">
                           <CirclePlus />
                        </button>
                    </div>

                    <div className="text-2xl font-bold text-indigo-600 mb-2">${product.price}</div>

                    <div className="mt-auto pt-2 border-t border-gray-200">
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Items {product.items}</span>
                            <button className='text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer'>detail</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}