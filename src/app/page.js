// src/app/page.js

'use client'; 

import React, { useState, useEffect } from 'react';

// --- Helper Component to dynamically load Google Fonts ---
const GoogleFontLoader = ({ fontNames }) => {
    useEffect(() => {
        if (!fontNames || fontNames.length === 0) return;
        const link = document.createElement('link');
        const fonts = fontNames.map(name => name.replace(/ /g, '+')).join('|');
        link.href = `https://fonts.googleapis.com/css?family=${fonts}:400,700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, [fontNames]);
    return null;
};


// --- Professional, Reusable Section Components ---

const HeroSection = ({ section, styles }) => (
    <section className="relative text-white rounded-lg overflow-hidden">
        <img src={section.imageUrl} alt="Hero background" className="absolute h-full w-full object-cover" />
        <div className="absolute h-full w-full bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center p-12 md:p-24">
            <h1 className="text-4xl md:text-6xl font-bold text-center" style={{ fontFamily: styles.global.headingFont }}>{section.heading}</h1>
            <p className="text-lg md:text-xl mt-4 text-center" style={{ fontFamily: styles.global.bodyFont }}>{section.subheading}</p>
            {/* FIX: Combined the two className attributes into one */}
            <a 
                href="#contact" 
                className={`mt-8 px-8 py-3 font-bold text-lg transition-transform hover:scale-105 ${styles.global.buttonStyle}`}
                style={{ backgroundColor: styles.global.secondaryColor, color: styles.global.textColor, fontFamily: styles.global.headingFont }}
            >
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
                    <p className="mt-2 text-gray-600" style={{ fontFamily: styles.global.bodyFont, color: styles.global.textColor }}>{item.description}</p>
                </div>
            ))}
        </div>
    </section>
);

const GallerySection = ({ section, styles }) => (
    <section className="py-16 bg-gray-50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: styles.global.headingFont, color: styles.global.textColor }}>{section.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {section.images?.map((image, index) => (
                <img key={index} src={image.url} alt={image.alt} className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"/>
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
                    <p className="text-xl italic" style={{ fontFamily: styles.global.bodyFont, color: styles.global.textColor }}>"{item.quote}"</p>
                    <cite className="block font-bold mt-4 not-italic" style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }}>- {item.author}</cite>
                </blockquote>
            ))}
        </div>
    </section>
);

const ContactSection = ({ section, styles }) => (
     <section id="contact" className="py-16 bg-gray-800 text-white rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: styles.global.headingFont }}>{section.title}</h2>
        <div className="text-center space-y-2" style={{ fontFamily: styles.global.bodyFont }}>
            {section.phone && <p><strong>Phone:</strong> {section.phone}</p>}
            {section.email && <p><strong>Email:</strong> <a href={`mailto:${section.email}`} className="underline">{section.email}</a></p>}
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
};

export default function HomePage() {
    const [activePageKey, setActivePageKey] = useState('home');

    useEffect(() => {
        const handleHashChange = () => setActivePageKey(window.location.hash.replace('#', '') || 'home');
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const configRaw = process.env.NEXT_PUBLIC_WEBSITE_CONFIG || "{}";
    let config = {};
    try {
        config = JSON.parse(configRaw);
    } catch (e) {
        return <div>Error: Website configuration is invalid.</div>;
    }

    const {
        companyName = "Company Name",
        logoUrl,
        globalStyles = {},
        pages = {}
    } = config;
    
    const styles = { global: globalStyles };
    const pageKeys = Object.keys(pages);
    const currentPage = pages[activePageKey] || pages.home;

    if (!currentPage) return <div>Page not found.</div>;

    return (
        <>
            <GoogleFontLoader fontNames={[globalStyles.headingFont, globalStyles.bodyFont].filter(Boolean)} />
            <div style={{ backgroundColor: globalStyles.backgroundColor, color: globalStyles.textColor, fontFamily: globalStyles.bodyFont }}>
                <div className="max-w-6xl mx-auto p-4 md:p-8">
                    <header className="p-4 flex items-center justify-between">
                        {logoUrl ? <img src={logoUrl} alt={`${companyName} Logo`} className="h-12" /> : <h1 className="text-2xl font-bold" style={{ fontFamily: globalStyles.headingFont, color: globalStyles.primaryColor }}>{companyName}</h1>}
                        <nav className="flex space-x-6">
                            {pageKeys.map(pageKey => (
                                <a key={pageKey} href={`#${pageKey}`} onClick={() => setActivePageKey(pageKey)} className={`text-lg font-medium transition ${activePageKey === pageKey ? 'underline' : 'hover:underline'}`} style={{ color: globalStyles.primaryColor, fontFamily: globalStyles.headingFont }}>
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
            </div>
        </>
    );
}
