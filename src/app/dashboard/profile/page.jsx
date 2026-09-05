export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm font-medium text-danger">
                    Account
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Profile
                </h1>

                <p className="mt-2 text-sm text-default-500">
                    Manage your personal information.
                </p>
            </div>

            <div className="rounded-2xl border border-default-200 bg-background p-6 shadow-sm">
                <p className="text-sm text-default-500">
                    Profile settings will be added here.
                </p>
            </div>
        </div>
    );
}