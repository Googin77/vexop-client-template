import React from 'react';
import Image from 'next/image';

const HeroSection = ({ settings, theme }) => (
    <section className="relative text-white h-96 flex items-center justify-center text-center rounded-lg overflow-hidden">
        <Image src={settings.imageUrl} alt={settings.heading} fill style={{objectFit: 'cover'}} priority />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 p-4">
            <h1 className="text-5xl font-bold">{settings.heading}</h1>
            <p className="text-xl mt-2">{settings.subheading}</p>
            <a href="#contact" className={`mt-6 inline-block px-8 py-3 font-bold text-lg ${theme.button}`} style={{ backgroundColor: theme.colors.primary, color: 'white' }}>
                {settings.buttonText}
            </a>
        </div>
    </section>
);

export default HeroSection;
