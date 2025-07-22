import React from 'react';

const FeaturesSection = ({ settings, theme }) => (
    <section className="py-16" style={{ backgroundColor: theme.colors.lightBg }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold" style={{ color: theme.colors.text }}>{settings.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {settings.items?.map((item, index) => (
                    <div key={index} className="p-6 bg-white rounded shadow-lg">
                        <h3 className="text-2xl font-bold" style={{ color: theme.colors.primary }}>{item.title}</h3>
                        <p className="mt-2" style={{ color: theme.colors.text }}>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default FeaturesSection;
