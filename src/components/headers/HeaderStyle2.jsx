import React from 'react';

const HeaderStyle2 = ({ config, theme, activePageSlug, setActivePageSlug }) => (
     <header className="py-4 sticky top-0 z-50" style={{ backgroundColor: theme.colors.background, borderBottom: `1px solid ${theme.colors.lightBg}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <a href="#home" onClick={() => setActivePageSlug('home')} className="text-4xl font-bold" style={{ color: theme.colors.primary }}>
                {config.branding.companyName}
            </a>
            <nav className="flex justify-center items-center space-x-6 mt-4">
                {config.pages.map(page => (
                    <a 
                        key={page.id} 
                        href={`#${page.slug}`} 
                        onClick={(e) => { e.preventDefault(); setActivePageSlug(page.slug); window.location.hash = page.slug; }} 
                        className={`font-medium tracking-wider transition hover:text-opacity-80 ${activePageSlug === page.slug ? 'underline' : ''}`}
                        style={{ color: theme.colors.primary }}
                    >
                        {page.title.toUpperCase()}
                    </a>
                ))}
            </nav>
        </div>
    </header>
);

export default HeaderStyle2;
