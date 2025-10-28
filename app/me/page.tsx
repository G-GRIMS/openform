import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser } from '@/lib/data/user';
import { getAllForms } from '@/lib/data/forms';
import { Calendar, FileText } from 'lucide-react';

export default function ProfilePage() {
    const user = getCurrentUser();
    const forms = getAllForms();
    const totalSubmissions = forms.reduce(
        (sum, form) => sum + form.submissionCount,
        0,
    );

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Profile</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your account settings and preferences
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    src={user.avatar || '/placeholder.svg'}
                                    alt={user.name}
                                />
                                <AvatarFallback>
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="mt-4 text-xl font-semibold">
                                {user.name}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                {user.email}
                            </p>
                            <Badge variant="secondary" className="mt-2">
                                Free Plan
                            </Badge>
                        </div>
                        <div className="space-y-2 border-t pt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Member since
                                </span>
                                <span className="font-medium">
                                    {new Date(
                                        user.createdAt,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Account Statistics</CardTitle>
                        <CardDescription>
                            Your activity overview
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <FileText className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {forms.length}
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Total Forms
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <Calendar className="text-primary h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {totalSubmissions}
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Total Submissions
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4 border-t pt-6">
                            <h3 className="font-semibold">Recent Forms</h3>
                            <div className="space-y-2">
                                {forms.slice(0, 5).map((form) => (
                                    <div
                                        key={form.id}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {form.title}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {form.submissionCount}{' '}
                                                submissions
                                            </p>
                                        </div>
                                        <Badge variant="secondary">
                                            {form.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
