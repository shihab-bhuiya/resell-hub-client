import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
            <div className="max-w-lg text-center">
                <h1 className="text-8xl font-extrabold text-black">404</h1>

                <h2 className="mt-4 text-3xl font-bold text-gray-800">
                    Page Not Found
                </h2>

                <p className="mt-4 text-gray-600">
                    Sorry, the page {"you're"} looking for {"doesn't"} exist or may have
                    been moved.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href="/"
                        className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="rounded-lg border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-200"
                    >
                        Go Back
                    </button>
                </div>

                <p className="mt-8 text-sm text-gray-400">
                    Error Code: 404 | The requested page could not be found.
                </p>
            </div>
        </div>
    );
}