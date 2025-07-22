import React from 'react';
import Image from 'next/image';

const HeaderStyle2 = ({ config, theme, activePageSlug, setActivePageSlug }) => (
     <header className="py-4 sticky top-0 z-50" style={{ backgroundColor: theme.colors.background, borderBottom: `1px solid ${theme.colors.lightBg}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <a href="#home" onClick={() => setActivePageSlug('home')} className="inline-flex flex-col items-center">
                {config.branding.logoUrl && (
                    <div className="relative h-16 w-16 mb-2">
                        <Image src={config.branding.logoUrl} alt={`${config.branding.companyName} Logo`} fill style={{ objectFit: 'contain' }}/>
                    </div>
                )}
                <span className="text-4xl font-bold" style={{ color: theme.colors.primary }}>
                    {config.branding.companyName}
                </span>
            </a>
            <nav className="flex justify-center items-center space-x-6 mt-4">
                {config.pages.map(page => (
                    <a 
                        key={page.id} 
                        href={`#${page.slug}`} 
                        onClick={(e) => { e.preventDefault(); setActivePageSlug(page.slug); window.location.hash = page.slug; }} 
                        className={`font-medium tracking-wider transition hover:text-opacity-80 ${activePageSlug === page.slug ? 'underline' : ''}`}
                        style={{ color: theme.colors.primary, textUnderlineOffset: '4px' }}
                    >
                        {page.title.toUpperCase()}
                    </a>
                ))}
            </nav>
        </div>
    </header>
);

export default HeaderStyle2;
