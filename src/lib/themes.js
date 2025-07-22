import { Roboto, Lato } from 'next/font/google';

// --- FONT SETUP ---
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

// --- THEME STYLES ---
// This file now only holds the FONT information for each theme style.
// The COLORS are now managed directly in the config object.
export const THEME_DEFAULTS = {
    modern: {
        fonts: { heading: roboto.style.fontFamily, body: lato.style.fontFamily },
        button: 'rounded-lg',
    },
    classic: {
        fonts: { heading: 'Georgia, serif', body: 'Times New Roman, serif' },
        button: 'rounded-sm',
    }
};
