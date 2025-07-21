'use client'; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // IMPORT: Next.js Image component for optimization
import { Roboto, Lato, Montserrat, Open_Sans } from 'next/font/google';
import { FaHardHat, FaCheckCircle, FaTools, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

// --- FONT & ICON MAPPING ---

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
const iconMap = {
    FaHardHat, FaCheckCircle, FaTools,
    Facebook: FaFacebook, Instagram: FaInstagram, Twitter: FaTwitter, Linkedin: FaLinkedin,
};

// --- HELPER TO GET STYLES ---
const getStyles = (config) => ({
    global: {
        ...config.globalStyles,
        headingFont: fontMap[config.globalStyles.headingFont] || 'sans-serif',
        bodyFont: fontMap[config.globalStyles.bodyFont] || 'sans-serif',
    }
});

// --- REUSABLE SITE-WIDE COMPONENTS ---

const Header = ({ config, activePageKey, setActivePageKey }) => {
    const styles = getStyles(config);
    const navItems = config.navigation || [];
    const lastItemIndex = navItems.length - 1;

    return (
        <header className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: styles.global.backgroundColor }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <a href="#home" onClick={(e) => { e.preventDefault(); window.location.hash = 'home'; setActivePageKey('home'); }} className="flex-shrink-0 relative h-12 w-48">
                        {config.branding?.logoUrl ? 
                            <Image src={config.branding.logoUrl} alt={`${config.branding.companyName} Logo`} fill style={{ objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} /> :
                            <h1 className="text-2xl font-bold" style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }}>{config.branding.companyName}</h1>
                        }
                    </a>
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems.map((item, index) => {
                            const isCta = index === lastItemIndex;
                            const linkStyle = isCta ? 
                                { backgroundColor: styles.global.primaryColor, color: '#FFFFFF' } : 
                                { color: styles.global.textColor };

                            return (
                                <a key={item.key} href={`#${item.key}`} 
                                   onClick={(e) => { e.preventDefault(); window.location.hash = item.key; setActivePageKey(item.key); }}
                                   className={`py-2 px-4 font-medium transition-colors duration-300 ${activePageKey === item.key && !isCta ? 'underline' : ''} ${config.globalStyles.buttonStyle || 'rounded-md'} hover:opacity-80`}
                                   style={{ fontFamily: styles.global.headingFont, ...linkStyle }}>
                                    {item.text}
                                </a>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
};

const Footer = ({ config }) => {
    const styles = getStyles(config);
    const footerData = config.footer || {};
    const currentYear = new Date().getFullYear();
    const copyright = (footerData.copyrightText || '')
        .replace(/\[CompanyName\]/g, config.branding.companyName)
        .replace(/2025/g, currentYear)
        .replace(/\[Year\]/g, currentYear);

    return (
        <footer className="text-white py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: styles.global.textColor }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-bold" style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }}>{config.branding.companyName}</h3>
                    <p className="mt-2 text-gray-300" style={{ fontFamily: styles.global.bodyFont }}>{footerData.tagline}</p>
                </div>
                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold tracking-wider uppercase" style={{ fontFamily: styles.global.headingFont }}>Contact</h3>
                    <div className="mt-4 space-y-2 text-gray-300" style={{ fontFamily: styles.global.bodyFont }}>
                        {footerData.phone && <p>{footerData.phone}</p>}
                        {footerData.email && <p><a href={`mailto:${footerData.email}`} className="hover:text-white">{footerData.email}</a></p>}
                        {footerData.address && <p>{footerData.address}</p>}
                    </div>
                </div>
                {/* Social */}
                <div>
                    <h3 className="text-lg font-semibold tracking-wider uppercase" style={{ fontFamily: styles.global.headingFont }}>Follow Us</h3>
                    <div className="flex mt-4 space-x-4">
                        {footerData.socialLinks?.map(link => {
                            const Icon = iconMap[link.platform];
                            return Icon ? <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white"><Icon size={24} /></a> : null;
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm" style={{ fontFamily: styles.global.bodyFont }}>
                <p>{copyright}</p>
            </div>
        </footer>
    );
};

// --- SECTION COMPONENTS (Updated and New) ---

const HeroSection = ({ section, styles }) => (
    <section className="relative text-white rounded-lg overflow-hidden shadow-xl" style={{ minHeight: '60vh' }}>
        <Image src={section.imageUrl || 'https://placehold.co/1920x1080/cccccc/ffffff?text=Image+Not+Found'} alt={section.heading || 'Hero background'} fill style={{objectFit: 'cover'}} priority />
        <div className="absolute h-full w-full bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-8" style={{ minHeight: '60vh' }}>
            <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: styles.global.headingFont }}>{section.heading}</h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl" style={{ fontFamily: styles.global.bodyFont }}>{section.subheading}</p>
            <a href={section.buttonLink || '#contact'} className={`mt-8 px-8 py-3 font-bold text-lg transition-transform hover:scale-105 ${styles.global.buttonStyle}`} style={{ backgroundColor: styles.global.secondaryColor, color: styles.global.textColor, fontFamily: styles.global.headingFont }}>
                {section.buttonText}
            </a>
        </div>
    </section>
);

const FeaturesSection = ({ section, styles }) => (
    <section className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: styles.global.headingFont, color: styles.global.textColor }}>{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {section.items?.map((item, index) => {
                 const Icon = iconMap[item.icon];
                 return (
                    <div key={index} className="text-center p-4">
                        {Icon && <Icon size={48} className="mx-auto mb-4" style={{ color: styles.global.primaryColor }} />}
                        <h3 className="text-xl font-bold" style={{ fontFamily: styles.global.headingFont, color: styles.global.textColor }}>{item.title}</h3>
                        <p className="mt-2 text-gray-600" style={{ fontFamily: styles.global.bodyFont }}>{item.description}</p>
                    </div>
                 );
            })}
        </div>
    </section>
);

const ContentSection = ({ section, styles }) => (
    <section className="py-16 bg-white rounded-lg">
         <div className="max-w-4xl mx-auto text-center">
            <h2 style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }} className="text-3xl md:text-4xl font-bold mb-4">{section.title}</h2>
            <p className="text-lg text-gray-700 whitespace-pre-line" style={{ fontFamily: styles.global.bodyFont, color: styles.global.textColor }}>{section.text}</p>
        </div>
    </section>
);

const TeamSection = ({ section, styles }) => (
    <section className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: styles.global.headingFont, color: styles.global.textColor }}>{section.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {section.items?.map((item, index) => (
                <div key={index} className="text-center">
                    <div className="relative w-40 h-40 rounded-full mx-auto shadow-lg mb-4 overflow-hidden">
                        <Image src={item.imageUrl || 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=Person'} alt={item.name} fill style={{objectFit: 'cover'}} />
                    </div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: styles.global.headingFont, color: styles.global.textColor }}>{item.name}</h3>
                    <p className="mt-1" style={{ fontFamily: styles.global.bodyFont, color: styles.global.primaryColor }}>{item.role}</p>
                </div>
            ))}
        </div>
    </section>
);

const ServicesSection = ({ section, styles }) => (
    <section className="py-16 bg-gray-50 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: styles.global.headingFont, color: styles.global.textColor }}>{section.title}</h2>
        <div className="max-w-4xl mx-auto space-y-8">
            {section.items?.map((item, index) => (
                <div key={index} className="p-6 bg-white rounded shadow">
                    <h3 className="text-2xl font-bold" style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }}>{item.name}</h3>
                    <p className="mt-2 text-gray-700" style={{ fontFamily: styles.global.bodyFont }}>{item.description}</p>
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
                <div key={index} className="aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <Image src={image.url || 'https://placehold.co/600x400/eee/ccc?text=Image'} alt={image.alt} fill style={{objectFit: 'cover'}}/>
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
                    <p className="text-xl italic" style={{ fontFamily: styles.global.bodyFont, color: styles.global.textColor }}>&ldquo;{item.quote}&rdquo;</p>
                    <cite className="block font-bold mt-4 not-italic" style={{ fontFamily: styles.global.headingFont, color: styles.global.primaryColor }}>- {item.author}</cite>
                </blockquote>
            ))}
        </div>
    </section>
);


const ContactFormSection = ({ section, styles, footerData }) => (
     <section id="contact" className="py-16 rounded-lg" style={{ backgroundColor: styles.global.primaryColor, color: 'white' }}>
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: styles.global.headingFont }}>{section.heading}</h2>
            <p className="text-lg mb-8 text-gray-200" style={{ fontFamily: styles.global.bodyFont }}>{section.subheading}</p>
            <div className="text-center space-y-2" style={{ fontFamily: styles.global.bodyFont }}>
                {footerData.phone && <p><strong>Phone:</strong> {footerData.phone}</p>}
                {footerData.email && <p><strong>Email:</strong> <a href={`mailto:${footerData.email}`} className="underline hover:text-gray-200">{footerData.email}</a></p>}
                {footerData.address && <p><strong>Address:</strong> {footerData.address}</p>}
            </div>
        </div>
    </section>
);

// --- DYNAMIC PAGE RENDERER ---
const sectionComponentMap = {
    hero: HeroSection,
    features: FeaturesSection,
    testimonials: TestimonialsSection,
    content: ContentSection,
    team: TeamSection,
    servicesList: ServicesSection,
    galleryGrid: GallerySection,
    contactForm: ContactFormSection,
};

export default function HomePage() {
    const [activePageKey, setActivePageKey] = useState('home');
    const [config, setConfig] = useState(null);

    useEffect(() => {
        const configRaw = process.env.NEXT_PUBLIC_WEBSITE_CONFIG || "{}";
        try {
            const parsedConfig = JSON.parse(configRaw);
            setConfig(parsedConfig);
            const initialKey = window.location.hash.replace('#', '') || (parsedConfig.navigation && parsedConfig.navigation[0].key) || 'home';
            setActivePageKey(initialKey);
        } catch (e) {
            console.error("Failed to parse website config:", e);
            setConfig({ error: "Invalid configuration." });
        }
        
        const handleHashChange = () => {
             const hash = window.location.hash.replace('#', '');
             if (hash) {
                 setActivePageKey(hash);
             }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    if (!config) return <div className="text-center p-8">Loading Website...</div>;
    if (config.error) return <div className="text-center text-red-500 p-8">Error: {config.error}</div>;
    if (!config.isEnabled) return <div className="text-center p-8">This website is currently not active.</div>;

    const styles = getStyles(config);
    const currentPage = config.pages?.[activePageKey];

    return (
        <>
            <style jsx global>{`
                body {
                    background-color: ${styles.global.backgroundColor};
                    color: ${styles.global.textColor};
                    font-family: ${styles.global.bodyFont};
                }
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
            
            <Header config={config} activePageKey={activePageKey} setActivePageKey={setActivePageKey} />

            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <main className="mt-8 space-y-12">
                    {currentPage ? Object.entries(currentPage.sections).map(([key, sectionData]) => {
                        const Component = sectionComponentMap[key];
                        if (!Component) return null;
                        
                        // CORRECTED: Moved the key prop directly onto the component for the iterator.
                        const props = {
                            section: sectionData,
                            styles: styles,
                        };
                        
                        if (key === 'contactForm') {
                            props.footerData = config.footer;
                        }

                        return <Component key={key} {...props} />;
                    }) : <div>Page content not found. Please select a page from the navigation.</div>}
                </main>
            </div>

            <Footer config={config} />
        </>
    );
}
