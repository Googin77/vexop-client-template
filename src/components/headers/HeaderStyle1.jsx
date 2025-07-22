import React from 'react';
import Image from 'next/image';

const HeaderStyle1 = ({ config, theme, activePageSlug, setActivePageSlug }) => (
    <header className="shadow-md sticky top-0 z-50" style={{ backgroundColor: theme.colors.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <a href="#home" onClick={() => setActivePageSlug('home')} className="flex items-center">
                {config.branding.logoUrl && (
                    <div className="relative h-12 w-12 mr-3">
                        <Image src={config.branding.logoUrl} alt={`${config.branding.companyName} Logo`} fill style={{ objectFit: 'contain' }}/>
                    </div>
                )}
                <span className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                    {config.branding.companyName}
                </span>
            </a>
            <nav className="flex items-center space-x-1">
                {config.pages.map((page) => (
                    <a 
                        key={page.id} 
                        href={`#${page.slug}`} 
                        onClick={(e) => { e.preventDefault(); setActivePageSlug(page.slug); window.location.hash = page.slug; }} 
                        className={`px-3 py-2 font-semibold transition ${theme.button}`}
                        style={{ 
                         backgroundColor: activePageSlug === page.slug ? theme.colors.primary : 'transparent',
                         color: activePageSlug === page.slug ? 'white' : theme.colors.text
                        }}
                    >
                        {page.title}
                    </a>
                ))}
            </nav>
        </div>
    </header>
);

export default HeaderStyle1;
