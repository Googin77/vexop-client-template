// src/app/page.js

'use client'; // This is a Next.js directive to indicate a client-side component

import React, { useState, useEffect } from 'react';

// --- Reusable Section Components (Unchanged) ---
const HeroSection = ({ section, styles }) => (
    <section style={styles.hero} className="text-center py-20 bg-gray-100 rounded-lg">
        <h1 className="text-5xl font-bold" style={{ color: styles.header.color }}>{section.title}</h1>
        <p className="text-xl mt-4" style={{ color: styles.header.color, opacity: 0.8 }}>{section.subtitle}</p>
    </section>
);
const ContentSection = ({ section, styles }) => (
    <section className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 style={styles.h2} className="text-2xl font-bold pb-2 mb-4">{section.title}</h2>
        <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
    </section>
);
const ServicesSection = ({ section, styles }) => (
    <section className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 style={styles.h2} className="text-2xl font-bold pb-2 mb-4">{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.items && section.items.length > 0 ? section.items.map((service, index) => (
                <div key={index} style={styles.serviceCard} className="p-4 rounded-md">
                    <h3 className="font-bold text-lg" style={{ color: styles.h2.color }}>{service.title}</h3>
                    <p className="text-gray-600 mt-1">{service.description}</p>
                </div>
            )) : <p>No services listed.</p>}
        </div>
    </section>
);
const ContactSection = ({ section, styles }) => (
    <section className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 style={styles.h2} className="text-2xl font-bold pb-2 mb-4">{section.title}</h2>
        {section.phone && <p><strong>Phone:</strong> {section.phone}</p>}
        {section.email && <p><strong>Email:</strong> {section.email}</p>}
        {section.address && <p><strong>Address:</strong> {section.address}</p>}
    </section>
);

// --- Dynamic Page Renderer ---
const sectionComponentMap = {
    hero: HeroSection,
    about: ContentSection,
    summary: ContentSection,
    history: ContentSection,
    services: ServicesSection,
    serviceList: ServicesSection,
    contact: ContactSection,
    contactInfo: ContactSection,
};

// Helper to generate styles based on colors
const getThemeStyles = (primaryColor, secondaryColor) => ({
    header: { backgroundColor: primaryColor, color: 'white' },
    hero: { backgroundColor: primaryColor },
    h2: { color: primaryColor, borderBottom: `2px solid ${secondaryColor}` },
    serviceCard: { backgroundColor: '#F9F9F9', borderLeft: `4px solid ${primaryColor}` }
});


// --- Main Page Component ---
export default function HomePage() {
    // State to manage the currently visible page
    const [activePageKey, setActivePageKey] = useState('home');

    // Effect to handle URL hash changes for navigation
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            // Default to 'home' if hash is empty or doesn't match a page
            setActivePageKey(hash || 'home');
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Set initial page on load

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // 1. Read and parse the website configuration
    const configRaw = process.env.NEXT_PUBLIC_WEBSITE_CONFIG || "{}";
    let config = {};
    try {
        config = JSON.parse(configRaw);
    } catch (e) {
        console.error("Failed to parse website config:", e);
        return <div className="text-center text-red-500 p-8">Error: Website configuration is invalid.</div>;
    }

    // 2. Destructure properties with defaults
    const {
        companyName = "Company Name",
        logoUrl,
        primaryColor = '#1E3A8A',
        secondaryColor = '#FBBF24',
        pages = {}
    } = config;

    const styles = getThemeStyles(primaryColor, secondaryColor);
    const pageKeys = Object.keys(pages);
    const currentPage = pages[activePageKey] || pages.home; // Fallback to home page

    if (!currentPage || !currentPage.sections) {
        return <div className="text-center text-red-500 p-8">Error: Page content not found. Please configure in the admin panel.</div>;
    }

    return (
        <div className="font-sans max-w-4xl mx-auto p-4 md:p-8">
            <header style={styles.header} className="p-6 rounded-lg shadow-md flex items-center justify-between">
                {logoUrl ? (
                    <img src={logoUrl} alt={`${companyName} Logo`} className="h-16" />
                ) : (
                    <h1 className="text-3xl font-bold">{companyName}</h1>
                )}
                {/* **NEW**: Navigation Menu */}
                <nav className="flex space-x-6">
                    {pageKeys.map(pageKey => (
                        <a 
                            key={pageKey} 
                            href={`#${pageKey}`}
                            onClick={() => setActivePageKey(pageKey)}
                            className={`text-lg font-medium ${activePageKey === pageKey ? 'underline' : ''}`}
                            style={{ color: styles.header.color }}
                        >
                            {pages[pageKey].title}
                        </a>
                    ))}
                </nav>
            </header>

            <main>
                {/* Render sections of the currently active page */}
                {Object.entries(currentPage.sections).map(([key, sectionData]) => {
                    const Component = sectionComponentMap[key];
                    return Component ? <Component key={key} section={sectionData} styles={styles} /> : null;
                })}
            </main>
        </div>
    );
}
