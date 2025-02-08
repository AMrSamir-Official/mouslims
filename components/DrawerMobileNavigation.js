'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import {
    FaBars,
    FaBook,
    FaBookmark,
    FaChevronDown,
    FaChevronUp,
    FaCog,
    FaDatabase,
    FaHome,
    FaList,
    FaPhone,
    FaQuran,
    FaSearch,
    FaTimes,
    FaTools,
    FaVolumeUp
} from 'react-icons/fa';

export default function DrawerMobileNavigation({ darkMode, activeMenu, setActiveMenu }) {
    const [open, setOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const drawerRef = useRef();
    const t = useTranslations();

    const menuItems = [
        { name: t('home'), icon: <FaHome />, path: '/' },
        { name: t('editions'), icon: <FaBook />, path: '/editions' },
        { name: t('languages'), icon: <FaQuran />, path: '/languages' },
        { name: t('surahs'), icon: <FaList />, path: '/surahs' },
        { name: t('juz'), icon: <FaVolumeUp />, path: '/juz' },
        { name: t('ayah'), icon: <FaBookmark />, path: '/ayah' },
        { name: t('search'), icon: <FaSearch />, path: '/search' },
        { name: t('manzil'), icon: <FaDatabase />, path: '/manzil' },
        {
            name: t('services'),
            icon: <FaCog />,
            submenu: [
                { name: t('webDevelopment'), icon: <FaTools />, path: '/services/web-development' },
                { name: t('appDevelopment'), icon: <FaTools />, path: '/services/app-development' },
                { name: t('seo'), icon: <FaTools />, path: '/services/seo' },
            ],
        },
        { name: t('contact'), icon: <FaPhone />, path: '/contact' },
    ];

    const filteredItems = menuItems.filter(item => {
        const itemName = item.name.toLowerCase();
        const isMatch = itemName.includes(searchQuery.toLowerCase());
        if (item.submenu) {
            const hasMatchingSubItem = item.submenu.some(subItem =>
                subItem.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return isMatch || hasMatchingSubItem;
        }
        return isMatch;
    });

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setOpen(false);
                setOpenSubMenu(null);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [open]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
                setOpenSubMenu(null);
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEsc);
        } else {
            document.removeEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [open]);

    return (
        <IconContext.Provider value={{ size: '1.5em' }}>
            <button
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                    }`}
                onClick={() => setOpen(true)}
                aria-label="Open Menu"
            >
                <FaBars />
            </button>

            {open && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"></div>
            )}

            <div
                ref={drawerRef}
                className={`fixed top-0 left-0 z-50 h-full w-64 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('menu')}</h2>
                    <button
                        className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-black'
                            }`}
                        onClick={() => setOpen(false)}
                        aria-label="Close Menu"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="p-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('search') || 'Search...'}
                        className={`w-full p-2 rounded-md border focus:outline-none ${darkMode
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400'
                            : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                            }`}
                    />
                </div>

                <nav className="px-4 overflow-y-auto h-3/4">
                    <ul>
                        {filteredItems.map((item) => (
                            <li key={item.name} className="mb-2">
                                {item.submenu ? (
                                    <>
                                        <button
                                            className={`flex items-center w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${activeMenu === item.name
                                                ? 'bg-blue-500 text-white'
                                                : darkMode
                                                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                                }`}
                                            onClick={() => {
                                                setOpenSubMenu(openSubMenu === item.name ? null : item.name);
                                            }}
                                        >
                                            <span className="mr-3">{item.icon}</span>
                                            <span className="flex-1 text-left">{item.name}</span>
                                            <span>
                                                {openSubMenu === item.name ? <FaChevronUp /> : <FaChevronDown />}
                                            </span>
                                        </button>

                                        {openSubMenu === item.name && (
                                            <ul className="ml-6 mt-2 space-y-1">
                                                {item.submenu.map((subItem) => (
                                                    <li key={subItem.name}>
                                                        <Link href={subItem.path}>
                                                            <button
                                                                className={`flex items-center w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${activeMenu === subItem.name
                                                                    ? 'bg-blue-500 text-white'
                                                                    : darkMode
                                                                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                                                    }`}
                                                                onClick={() => {
                                                                    setActiveMenu(subItem.name);
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                <span className="mr-3">{subItem.icon}</span>
                                                                <span>{subItem.name}</span>
                                                            </button>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link href={item.path}>
                                        <button
                                            className={`flex items-center w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${activeMenu === item.name
                                                ? 'bg-blue-500 text-white'
                                                : darkMode
                                                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                                }`}
                                            onClick={() => {
                                                setActiveMenu(item.name);
                                                setOpen(false);
                                            }}
                                        >
                                            <span className="mr-3">{item.icon}</span>
                                            <span className="flex-1 text-left">{item.name}</span>
                                        </button>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t dark:border-gray-700">
                    <button
                        className={`w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-black'
                            }`}
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        {t('logout') || 'Logout'}
                    </button>
                </div>
            </div>
        </IconContext.Provider>
    );
}
