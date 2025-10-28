import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { cn } from '@/lib/utils';
import { manrope } from '@/lib/fonts';
import { ConvexClientProvider } from '@/components/providers/convex-client-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

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
        <ConvexAuthNextjsServerProvider>
            <html lang="en">
                <body
                    className={cn(`font-sans antialiased`, manrope.className)}
                >
                    <ConvexClientProvider>{children}</ConvexClientProvider>
                    <Analytics />
                    <Toaster />
                </body>
            </html>
        </ConvexAuthNextjsServerProvider>
    );
}
