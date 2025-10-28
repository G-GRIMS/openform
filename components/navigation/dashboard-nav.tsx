'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardNav() {
    const pathname = usePathname();

    const navItems = [
        {
            title: 'Forms',
            href: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Profile',
            href: '/me',
            icon: User,
        },
    ];

    return (
        <nav className="bg-background flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-8">
                <Link href="/dashboard" className="text-xl font-bold">
                    G'GRIMS OpenForm
                </Link>
                <div className="flex items-center gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            pathname === item.href ||
                            pathname.startsWith(item.href + '/');
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? 'secondary' : 'ghost'}
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.title}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <Link href="/dashboard/new">
                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Form
                </Button>
            </Link>
        </nav>
    );
}
