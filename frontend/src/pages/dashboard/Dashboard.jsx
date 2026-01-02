import { DollarSign, TrendingUp, Package, ShoppingCart, BarChart3, Clock, Users } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
    const [transactions, setTransactions] = useState([
        {
            id: 'TRX-001',
            items: [
                { name: 'Burger', quantity: 2, price: 8.00 },
                { name: 'Cola', quantity: 1, price: 6.00 }
            ],
            total: 22.00,
            itemCount: 3,
            date: '2024-01-02',
            time: '10:30:00'
        },
        {
            id: 'TRX-002',
            items: [
                { name: 'Latte', quantity: 3, price: 34.00 },
                { name: 'Cappucino', quantity: 2, price: 12.00 }
            ],
            total: 126.00,
            itemCount: 5,
            date: '2024-01-02',
            time: '11:15:00'
        },
        {
            id: 'TRX-003',
            items: [
                { name: 'Chicken', quantity: 1, price: 16.00 },
                { name: 'Sprite', quantity: 2, price: 6.00 }
            ],
            total: 28.00,
            itemCount: 3,
            date: '2024-01-02',
            time: '12:45:00'
        }
    ]);

    const products = [
        { id: 1, name: "Barobbo", category: "Food", price: 12.00, items: 64 },
        { id: 2, name: "Burger", category: "Food", price: 8.00, items: 84 },
        { id: 3, name: "Batagor", category: "Food", price: 6.00, items: 34 },
        { id: 4, name: "Cireng", category: "Food", price: 12.00, items: 64 },
        { id: 5, name: "Chicken", category: "Food", price: 16.00, items: 210 },
        { id: 6, name: "Katsu", category: "Food", price: 2.00, items: 34 },
        { id: 7, name: "Fish & Chips", category: "Food", price: 12.00, items: 64 },
        { id: 8, name: "Gyoza", category: "Food", price: 29.00, items: 17 },
        { id: 9, name: "Vegetable", category: "Food", price: 3.00, items: 102 },
        { id: 10, name: "Kopi", category: "Drinks", price: 12.00, items: 54 },
        { id: 11, name: "Cappucino", category: "Drink", price: 12.00, items: 120 },
        { id: 12, name: "Creamy", category: "Drink", price: 30.00, items: 400 },
        { id: 13, name: "Latte", category: "Drink", price: 34.00, items: 432 },
        { id: 14, name: "Cola", category: "Drink", price: 6.00, items: 500 },
        { id: 15, name: "Sprite", category: "Drink", price: 6.00, items: 500 },
    ];

    const totalRevenue = transactions.reduce((sum, trx) => sum + trx.total, 0);
    const totalTransactions = transactions.length;
    const totalItemsSold = transactions.reduce((sum, trx) => sum + trx.itemCount, 0);
    const avgPerTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    // Calculate top selling products
    const productSales = {};
    transactions.forEach(trx => {
        trx.items.forEach(item => {
            if (!productSales[item.name]) {
                productSales[item.name] = { quantity: 0, revenue: 0 };
            }
            productSales[item.name].quantity += item.quantity;
            productSales[item.name].revenue += item.quantity * item.price;
        });
    });

    const topProducts = Object.entries(productSales)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    return (
        <div className="min-h-screen bg-gray-100 p-8">


            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                            <p className="text-4xl font-bold text-gray-800 mt-3">${totalRevenue.toFixed(2)}</p>
                            <p className="text-xs text-green-600 mt-2">↑ Hari ini</p>
                        </div>
                        <DollarSign size={48} className="text-blue-500 opacity-20" />
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Transaksi</p>
                            <p className="text-4xl font-bold text-gray-800 mt-3">{totalTransactions}</p>
                            <p className="text-xs text-green-600 mt-2">Penjualan berhasil</p>
                        </div>
                        <ShoppingCart size={48} className="text-green-500 opacity-20" />
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Item Terjual</p>
                            <p className="text-4xl font-bold text-gray-800 mt-3">{totalItemsSold}</p>
                            <p className="text-xs text-green-600 mt-2">Unit produk</p>
                        </div>
                        <Package size={48} className="text-orange-500 opacity-20" />
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Rata-rata/Transaksi</p>
                            <p className="text-4xl font-bold text-gray-800 mt-3">${avgPerTransaction.toFixed(2)}</p>
                            <p className="text-xs text-green-600 mt-2">Per transaksi</p>
                        </div>
                        <TrendingUp size={48} className="text-purple-500 opacity-20" />
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Selling Products */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <BarChart3 size={24} className="text-indigo-600" />
                        Produk Top Penjualan
                    </h2>

                    {topProducts.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">Belum ada data penjualan</p>
                    ) : (
                        <div className="space-y-4">
                            {topProducts.map((product, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-gray-100 hover:to-gray-150 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{product.name}</p>
                                            <p className="text-sm text-gray-500">{product.quantity} unit terjual</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-indigo-600 text-lg">${product.revenue.toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">revenue</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stock Status */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Package size={24} className="text-orange-600" />
                        Status Stok
                    </h2>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {products.sort((a, b) => a.items - b.items).slice(0, 8).map(product => (
                            <div key={product.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${product.items < 50 ? 'bg-red-100 text-red-700' :
                                        product.items < 100 ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                        {product.items}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-300 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all ${product.items < 50 ? 'bg-red-500' :
                                            product.items < 100 ? 'bg-yellow-500' :
                                                'bg-green-500'
                                            }`}
                                        style={{ width: `${Math.min((product.items / 500) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Clock size={24} className="text-indigo-600" />
                    Transaksi Terbaru
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID Transaksi</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Waktu</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Item</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((trx) => (
                                <tr key={trx.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-gray-800">{trx.id}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{trx.time}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{trx.itemCount} items</td>
                                    <td className="py-4 px-4 text-right font-bold text-indigo-600">${trx.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}