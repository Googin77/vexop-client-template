import React from 'react';

const ContentSection = ({ settings, theme }) => (
     <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center" style={{ color: theme.colors.text }}>{settings.title}</h2>
            <p className="mt-6 text-lg whitespace-pre-line text-justify" style={{ color: theme.colors.text }}>{settings.text}</p>
        </div>
    </section>
);

export default ContentSection;
