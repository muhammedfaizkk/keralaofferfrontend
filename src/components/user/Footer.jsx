import { ShoppingBag, Home, Share2 } from 'lucide-react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Footer() {
    const location = useLocation();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: document.title,
            text: 'Check out these amazing offers!',
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error('Sharing failed', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const navItems = [
        {
            icon: <Home size={24} />,
            label: 'Home',
            path: '/',
            key: 'home',
            type: 'nav'
        },
        {
            icon: <Share2 size={24} />,
            label: 'Share',
            key: 'share',
            type: 'share'
        },
        {
            icon: <ShoppingBag size={24} />,
            label: 'Offers',
            path: '/offer?section=more',
            key: 'offers',
            type: 'nav'
        }
    ];
    return (
        <div>
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 flex justify-around items-center py-3 px-4 md:hidden border-t border-gray-100">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const isShare = item.type === 'share';

                    return (
                        <button
                            key={item.key}
                            onClick={() => isShare ? handleShare() : navigate(item.path)}
                            className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-500'
                                }`}
                            aria-label={item.label}
                        >
                            <div className={`p-2 rounded-full ${isActive ? 'bg-purple-100' : ''
                                }`}>
                                {React.cloneElement(item.icon, {
                                    className: isActive ? 'fill-current' : '',
                                    strokeWidth: isActive ? 2 : 1.5
                                })}
                            </div>
                            <span className="text-xs mt-1 font-medium">{item.label}</span>
                            {copied && item.key === 'share' && (
                                <span className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                    Copied!
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Desktop Footer */}
            <footer className="hidden md:flex flex-col items-center w-full py-4 bg-gray-50 text-gray-600 text-sm border-t border-gray-200">

                <p className="text-center">
                 © Copyright {new Date().getFullYear()} keralaoffers. Powered by Willowy Infotech Pvt Ltd.
                </p>
            </footer>
        </div>
    )
}

export default Footer
