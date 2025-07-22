import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const FooterStyle2 = ({ config, theme }) => {
    const socialIconMap = { Facebook: FaFacebook, Instagram: FaInstagram, Twitter: FaTwitter };
    return (
        <footer className="py-12 text-white" style={{ backgroundColor: theme.colors.text }}>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-2xl font-bold" style={{ color: theme.colors.primary }}>{config.branding.companyName}</h3>
                    <p className="mt-2 text-gray-300">{config.footer.settings.address}</p>
                </div>
                <div>
                    <h4 className="font-bold uppercase tracking-wider">Contact</h4>
                    <ul className="mt-4 space-y-2">
                        <li>{config.footer.settings.phone}</li>
                        <li>{config.footer.settings.email}</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold uppercase tracking-wider">Follow</h4>
                    <div className="flex mt-4 space-x-4">
                        {config.footer.settings.socialLinks?.map(link => {
                           const Icon = socialIconMap[link.platform];
                           return Icon ? <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-75"><Icon size={24}/></a> : null;
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs text-gray-400">
                {config.footer.settings.copyrightText.replace('[CompanyName]', config.branding.companyName)}
            </div>
        </footer>
    );
};

export default FooterStyle2;
