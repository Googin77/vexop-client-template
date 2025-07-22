import React from 'react';

const FooterStyle1 = ({ config, theme }) => (
    <footer className="py-8" style={{ backgroundColor: theme.colors.lightBg }}>
        <div className="max-w-7xl mx-auto px-4 text-center" style={{ color: theme.colors.text }}>
            <p className="font-bold">{config.branding.companyName}</p>
            <p className="text-sm mt-1">{config.footer.settings.email} | {config.footer.settings.phone}</p>
            <p className="text-xs mt-4 opacity-70">{config.footer.settings.copyrightText.replace('[CompanyName]', config.branding.companyName)}</p>
        </div>
    </footer>
);

export default FooterStyle1;
