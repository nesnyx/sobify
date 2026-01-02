// src/components/layout/SidebarLayout.jsx
import { Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const getPageTitle = (pathname) => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/transactions': 'Transaksi',
    '/menu': 'Menu',
    '/reports': 'Laporan',
    '/settings': 'Pengaturan',
  };
  return titles[pathname]
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    // { name: 'Transaksi', href: '/transactions' },
    { name: 'Menu', href: '/menu' },
    // { name: 'Laporan', href: '/reports' },
    // { name: 'Pengaturan', href: '/settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">

            <span className="text-xl font-bold text-gray-800">
              Sobify<span className="text-indigo-600">App</span>
            </span>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ${location.pathname === item.href
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <span className="ml-3 text-sm">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Area: Hanya bagian ini yang mengisi sisa layar */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-gray-200">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-4 text-gray-600 focus:outline-none lg:hidden"
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-800">{pageTitle}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-1 text-gray-600 hover:text-gray-900 cursor-pointer focus:outline-none">
              <Bell />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                3
              </span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-800">Kasir</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
                K
              </div>
            </div>
          </div>
        </header>

        {/* ✅ ONLY THIS PART IS SCROLLABLE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}