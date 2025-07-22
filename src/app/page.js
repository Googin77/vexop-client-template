'use client'; 

import React, { useState, useEffect } from 'react';
import { THEMES } from '../lib/themes'; // This import will now work correctly
import { HeaderComponents, FooterComponents, SectionComponents } from '../lib/componentMap';

export default function HomePage() {
    const [config, setConfig] = useState(null);
    const [activePageSlug, setActivePageSlug] = useState('home');

    useEffect(() => {
        const configRaw = process.env.NEXT_PUBLIC_WEBSITE_CONFIG || "{}";
        try {
            const parsedConfig = JSON.parse(configRaw);
            setConfig(parsedConfig);
            const initialSlug = window.location.hash.replace('#', '') || (parsedConfig.pages && parsedConfig.pages[0].slug) || 'home';
            setActivePageSlug(initialSlug);
        } catch (e) {
            console.error("Failed to parse website config:", e);
            setConfig({ error: "Invalid configuration." });
        }
        
        const handleHashChange = () => {
            const newSlug = window.location.hash.replace('#', '') || (config?.pages?.[0]?.slug || 'home');
            setActivePageSlug(newSlug);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [config?.pages]);

    if (!config) return <div className="text-center p-8">Loading Website...</div>;
    if (config.error) return <div className="text-center text-red-500 p-8">Error: {config.error}</div>;
    if (!config.isEnabled) return <div className="text-center p-8">This website is currently inactive.</div>;

    // This logic will now work correctly as `THEMES` will be defined.
    const themeStyle = config.theme?.style || 'modern';
    const customColors = config.theme?.colors || {};
    const theme = {
        ...THEMES[themeStyle],
        colors: customColors
    };

    const Header = HeaderComponents[config.header.component];
    const Footer = FooterComponents[config.footer.component];
    const currentPageData = config.pages.find(p => p.slug === activePageSlug);

    return (
        <div style={{ backgroundColor: theme.colors.background }}>
            <style jsx global>{`
                body {
                    font-family: ${theme.fonts.body};
                    color: ${theme.colors.text};
                }
                h1, h2, h3, h4, h5, h6 {
                    font-family: ${theme.fonts.heading};
                }
            `}</style>

            {Header && <Header config={config} theme={theme} activePageSlug={activePageSlug} setActivePageSlug={setActivePageSlug} />}
            
            <main>
                {currentPageData ? currentPageData.layout.map(block => {
                    const Section = SectionComponents[block.component];
                    if (!Section) return null;
                    
                    const props = {
                        settings: block.settings,
                        theme: theme,
                        ...(block.component === 'Contact' && { footerSettings: config.footer.settings })
                    };

                    return <Section key={block.id} {...props} />;
                }) : <div className="text-center p-16">Page not found.</div>}
            </main>

            {Footer && <Footer config={config} theme={theme} />}
        </div>
    );
}
