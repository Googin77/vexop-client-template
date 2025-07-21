// src/app/page.js

'use client'; 

import React, { useState, useEffect } from 'react';
import { Roboto, Lato, Montserrat, Open_Sans } from 'next/font/google';

// --- Initialize Fonts ---
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });

const fontMap = {
    Roboto: roboto.style.fontFamily,
    Lato: lato.style.fontFamily,
    Montserrat: montserrat.style.fontFamily,
    'Open Sans': openSans.style.fontFamily,
};

// --- Professional, Reusable Section Components ---

const HeroSection = ({ section, styles }) => (
    <section className="relative text-white rounded-lg overflow-hidden shadow-lg">
        <img src={section.imageUrl} alt={section.heading || 'Hero background'} className="absolute h-full w-full object-cover" onError={(e) => e.target.style.display='none'} />
        <div className="absolute h-full w-full bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center p-12 md:p-24 text-center">
            <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: styles.global.headingFont }}>{section.heading}</h1>
            <p className="text-lg md:text-xl mt-4 max-w-2xl" style={{ fontFamily: styles.global.bodyFont }}>{section.subheading}</p>
            <a href="#contact" className={`mt-8 px-8 py-3 font-bold text-lg transition-transform hover:scale-105 ${styles.global.buttonStyle}`} style={{ backgroundColor: styles.global.secondaryColor, color: styles.global.textColor, fontFamily: styles.global.headingFont }}>
                {section.buttonText}
            </a>
        </div>
    </section>
);

const FeaturesSection = ({ section, styles }) => (
    <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: styles.global.headingFont, color: styles.global.textColor }}>{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {section.items?.map((item, index) => (
                <div key={index} className="text-center p-4">
                    <h3 className="text-xl font-bold" style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }}>{item.title}</h3>
                    <p className="mt-2" style={{ fontFamily: styles.global.bodyFont, color: styles.global.textColor }}>{item.description}</p>
                </div>
            ))}
        </div>
    </section>
);

const ContentSection = ({ section, styles }) => (
    <section className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }} className="text-2xl font-bold pb-2 mb-4">{section.title}</h2>
        <p className="text-gray-700 whitespace-pre-line" style={{ fontFamily: styles.global.bodyFont, color: styles.global.textColor }}>{section.content}</p>
    </section>
);

const GallerySection = ({ section, styles }) => (
    <section className="py-16 bg-gray-50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: styles.global.headingFont, color: styles.global.textColor }}>{section.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {section.images?.map((image, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1">
                    <img src={image.url} alt={image.alt} className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow" onError={(e) => e.target.src='https://placehold.co/600x400/eee/ccc?text=Image'}/>
                </div>
            ))}
        </div>
    </section>
);

const TestimonialsSection = ({ section, styles }) => (
     <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: styles.global.headingFont, color: styles.global.textColor }}>{section.title}</h2>
        <div className="space-y-8">
            {section.items?.map((item, index) => (
                <blockquote key={index} className="text-center max-w-2xl mx-auto">
                    {/* FIX: Replaced raw quotes with HTML entities to fix build error */}
                    <p className="text-xl italic" style={{ fontFamily: styles.global.bodyFont, color: styles.global.textColor }}>&ldquo;{item.quote}&rdquo;</p>
                    <cite className="block font-bold mt-4 not-italic" style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }}>- {item.author}</cite>
                </blockquote>
            ))}
        </div>
    </section>
);

const ContactSection = ({ section, styles }) => (
     <section id="contact" className="py-16 rounded-lg" style={{ backgroundColor: styles.global.primaryColor, color: 'white' }}>
        <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: styles.global.headingFont }}>{section.title}</h2>
        <div className="text-center space-y-2" style={{ fontFamily: styles.global.bodyFont }}>
            {section.phone && <p><strong>Phone:</strong> {section.phone}</p>}
            {section.email && <p><strong>Email:</strong> <a href={`mailto:${section.email}`} className="underline hover:text-gray-200">{section.email}</a></p>}
            {section.address && <p><strong>Address:</strong> {section.address}</p>}
        </div>
    </section>
);

// --- Dynamic Page Renderer ---
const sectionComponentMap = {
    hero: HeroSection,
    features: FeaturesSection,
    gallery: GallerySection,
    testimonials: TestimonialsSection,
    contactInfo: ContactSection,
    about: ContentSection,
    summary: ContentSection,
    history: ContentSection,
    services: FeaturesSection, // Re-use features for services
};

export default function HomePage() {
    const [activePageKey, setActivePageKey] = useState('home');
    const [config, setConfig] = useState(null);

    useEffect(() => {
        const configRaw = process.env.NEXT_PUBLIC_WEBSITE_CONFIG || "{}";
        try {
            setConfig(JSON.parse(configRaw));
        } catch (e) {
            console.error("Failed to parse website config:", e);
            setConfig({ error: "Invalid configuration." });
        }

        const handleHashChange = () => setActivePageKey(window.location.hash.replace('#', '') || 'home');
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    if (!config) return <div className="text-center p-8">Loading Website...</div>;
    if (config.error) return <div className="text-center text-red-500 p-8">Error: {config.error}</div>;

    const {
        companyName = "Company Name",
        logoUrl,
        globalStyles = {},
        pages = {}
    } = config;
    
    const styles = { 
        global: {
            ...globalStyles,
            headingFont: fontMap[globalStyles.headingFont] || 'sans-serif',
            bodyFont: fontMap[globalStyles.bodyFont] || 'sans-serif',
        }
    };
    
    const pageKeys = Object.keys(pages);
    const currentPage = pages[activePageKey] || pages.home;

    if (!currentPage) return <div>Page not found.</div>;

    return (
        <>
            <style jsx global>{`
                body {
                    background-color: ${styles.global.backgroundColor};
                    color: ${styles.global.textColor};
                    font-family: ${styles.global.bodyFont};
                }
            `}</style>
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                <header className="p-4 flex items-center justify-between">
                    {logoUrl ? <img src={logoUrl} alt={`${companyName} Logo`} className="h-12" /> : <h1 className="text-2xl font-bold" style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }}>{companyName}</h1>}
                    <nav className="flex space-x-6">
                        {pageKeys.map(pageKey => (
                            <a key={pageKey} href={`#${pageKey}`} onClick={(e) => { e.preventDefault(); setActivePageKey(pageKey); window.location.hash = pageKey; }} className={`text-lg font-medium transition ${activePageKey === pageKey ? 'underline' : 'hover:underline'}`} style={{ color: styles.global.primaryColor, fontFamily: styles.global.headingFont }}>
                                {pages[pageKey].title}
                            </a>
                        ))}
                    </nav>
                </header>

                <main className="mt-8 space-y-12">
                    {Object.entries(currentPage.sections).map(([key, sectionData]) => {
                        const Component = sectionComponentMap[key];
                        return Component ? <Component key={key} section={sectionData} styles={styles} /> : null;
                    })}
                </main>
            </div>
        </>
    );
}
