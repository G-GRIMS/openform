import { Manrope, Roboto_Mono, Lora } from 'next/font/google';

export const manrope = Manrope({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const lora = Lora({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});
