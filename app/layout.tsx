import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/next';
import './globals.css';

import { cn } from '@/lib/utils';
import { manrope } from '@/lib/fonts';

export const metadata: Metadata = {
    title: "G'GRIMS OpenForm",
    description:
        'An open-source form builder with a focus on simplicity and flexibility',
    generator: 'G-GRIMS OpenForm',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(`font-sans antialiased`, manrope.className)}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
