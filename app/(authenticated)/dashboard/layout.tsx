import type React from 'react';
import { DashboardNav } from '@/components/navigation/dashboard-nav';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background min-h-screen">
            <DashboardNav />
            {children}
        </div>
    );
}
