import React from 'react';

const ContactSection = ({ settings, theme, footerSettings }) => (
    <section id="contact" className="py-16" style={{ backgroundColor: theme.colors.primary }}>
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold">{settings.title}</h2>
            <p className="mt-4 text-xl">{settings.text}</p>
            
            <div className="mt-8 space-y-2 text-lg">
                {footerSettings?.phone && <p><strong>Phone:</strong> {footerSettings.phone}</p>}
                {footerSettings?.email && <p><strong>Email:</strong> <a href={`mailto:${footerSettings.email}`} className="underline hover:opacity-80">{footerSettings.email}</a></p>}
            </div>
        </div>
    </section>
);

export default ContactSection;
