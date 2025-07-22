import { Roboto, Lato } from 'next/font/google';

// --- FONT SETUP ---
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

// --- THEME STYLES ---
// CORRECTED: Exporting as THEMES to match the import in page.js
export const THEMES = {
    modern: {
        fonts: { heading: roboto.style.fontFamily, body: lato.style.fontFamily },
        button: 'rounded-lg',
    },
    classic: {
        fonts: { heading: 'Georgia, serif', body: 'Times New Roman, serif' },
        button: 'rounded-sm',
    }
};
