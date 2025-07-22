import { Roboto, Lato } from 'next/font/google';

// --- FONT SETUP ---
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

// --- THEME STYLES ---
export const THEMES = {
    modern: {
        fonts: { heading: roboto.style.fontFamily, body: lato.style.fontFamily },
        colors: { primary: '#007BFF', text: '#333', background: '#FFFFFF', lightBg: '#F8F9FA' },
        button: 'rounded-lg',
    },
    classic: {
        fonts: { heading: 'Georgia, serif', body: 'Times New Roman, serif' },
        colors: { primary: '#6B4F4B', text: '#4A4A4A', background: '#FDFBF5', lightBg: '#F5F2E9' },
        button: 'rounded-sm',
    }
};
