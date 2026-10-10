
function DashboardPage({ user }) {

    console.log(user)

    return (
        <main className="bg-slate-50 p-4 sm:p-6 lg:p-8 my-6 rounded-3xl">
            <div className="mx-auto max-w-7xl">
                {/* Welcome */}
                <section className="rounded-2xl bg-red-600 p-6 text-white sm:p-8">
                    <p className="text-sm text-red-100">
                        Welcome back 👋
                    </p>

                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl capitalize">
                        Hello, {user.name}!
                    </h1>

                    <p className="mt-2 text-sm text-red-100">
                        Thank you for helping people in need of blood.
                    </p>
                </section>
            </div>
        </main>
    );
}
export default DashboardPage