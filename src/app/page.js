// src/app/page.js

'use client'; // This is a Next.js directive to indicate a client-side component

import React from 'react';

// --- Helper Components to Render Sections ---

const HeroSection = ({ section }) => (
    <section className="text-center py-20 bg-gray-100 rounded-lg">
        <h1 className="text-5xl font-bold">{section.title}</h1>
        <p className="text-xl text-gray-600 mt-4">{section.subtitle}</p>
    </section>
);

const AboutSection = ({ section, styles }) => (
    <section id="about" className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 style={styles.h2} className="text-2xl font-bold pb-2 mb-4">{section.title}</h2>
        <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
    </section>
);

const ServicesSection = ({ section, styles }) => (
    <section id="services" className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 style={styles.h2} className="text-2xl font-bold pb-2 mb-4">{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.items && section.items.length > 0 ? section.items.map((service, index) => (
                <div key={index} style={styles.serviceCard} className="p-4 rounded-md">
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <p className="text-gray-600 mt-1">{service.description}</p>
                </div>
            )) : <p>No services listed.</p>}
        </div>
    </section>
);

const ContactSection = ({ section, styles }) => (
    <section id="contact" className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 style={styles.h2} className="text-2xl font-bold pb-2 mb-4">{section.title}</h2>
        {section.phone && <p><strong>Phone:</strong> {section.phone}</p>}
        {section.email && <p><strong>Email:</strong> {section.email}</p>}
        {section.address && <p><strong>Address:</strong> {section.address}</p>}
    </section>
);

// --- Main Page Component ---

// Helper function to apply dynamic styles
const getThemeStyles = (primaryColor, secondaryColor) => {
    // Simplified as the template structure is now data-driven.
    // You can expand this with more complex logic if needed.
    return {
        header: { backgroundColor: primaryColor, color: 'white' },
        h2: { color: primaryColor, borderBottom: `2px solid ${secondaryColor}` },
        serviceCard: { backgroundColor: '#F9F9F9', borderLeft: `4px solid ${primaryColor}` }
    };
};

export default function HomePage() {
    // 1. Read the single config variable
    const configRaw = process.env.NEXT_PUBLIC_WEBSITE_CONFIG || "{}";
    let config = {};
    try {
        config = JSON.parse(configRaw);
    } catch (e) {
        console.error("Failed to parse website config:", e);
        return <div>Error: Website configuration is invalid.</div>;
    }

    // 2. Destructure all properties from the config object
    const {
        companyName = "Company Name",
        logoUrl,
        primaryColor = '#1E3A8A',
        secondaryColor = '#FBBF24',
        templateId = 'single-page-standard',
        pages = {}
    } = config;

    const styles = getThemeStyles(primaryColor, secondaryColor);

    // 3. Dynamically select the page to render (for now, always 'home')
    //    This can be expanded later with Next.js routing for true multi-page sites.
    const currentPage = pages.home;

    if (!currentPage) {
        return <div>Error: Home page content not found in configuration.</div>;
    }

    return (
        <div className="font-sans max-w-4xl mx-auto p-4 md:p-8">
            <header style={styles.header} className="p-6 rounded-lg shadow-md flex items-center justify-between">
                {logoUrl ? (
                    <img src={logoUrl} alt={`${companyName} Logo`} className="h-16" />
                ) : (
                    <h1 className="text-3xl font-bold">{companyName}</h1>
                )}
            </header>

            <main className="mt-8">
                {/* 4. Render sections dynamically based on the data */}
                {Object.entries(currentPage.sections).map(([key, sectionData]) => {
                    switch (key) {
                        case 'hero':
                            return <HeroSection key={key} section={sectionData} />;
                        case 'about':
                        case 'summary': // Can map multiple keys to the same component
                            return <AboutSection key={key} section={sectionData} styles={styles} />;
                        case 'services':
                        case 'serviceList':
                            return <ServicesSection key={key} section={sectionData} styles={styles} />;
                        case 'contact':
                        case 'contactInfo':
                            return <ContactSection key={key} section={sectionData} styles={styles} />;
                        default:
                            return null;
                    }
                })}
            </main>
        </div>
    );
}
