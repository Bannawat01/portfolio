/**
 * Route-level fallback shown while the first render is in flight.
 *
 * It traces the real two-column layout — sticky identity rail, scrolling
 * content — so the swap when the page arrives barely moves anything. Pure
 * server markup, no client JS; the shimmer is CSS (`.skeleton` in globals.css)
 * and drops to a flat fill under `prefers-reduced-motion`.
 */
export default function Loading() {
    return (
        <>
            <div aria-hidden="true" className="ambient" />
            <div aria-hidden="true" className="grain" />

            <div
                aria-busy="true"
                aria-label="Loading"
                className="relative z-[1] mx-auto max-w-6xl px-5 py-12 md:px-8 lg:grid lg:grid-cols-[minmax(0,20.5rem)_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-0"
            >
                {/* Identity rail */}
                <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:border-r lg:border-border lg:py-16 lg:pr-12">
                    <div>
                        <div className="flex items-center gap-4">
                            <div className="skeleton h-14 w-14 rounded-2xl" />
                            <div className="skeleton h-7 w-40 rounded-full" />
                        </div>

                        <div className="skeleton mt-7 h-11 w-4/5 rounded-lg" />
                        <div className="skeleton mt-3 h-3 w-32 rounded" />

                        <div className="mt-5 space-y-2">
                            <div className="skeleton h-3 w-full rounded" />
                            <div className="skeleton h-3 w-2/3 rounded" />
                        </div>

                        <div className="skeleton mt-6 h-9 w-32 rounded-lg" />

                        <div className="mt-10 hidden space-y-3 lg:block">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="skeleton h-3 w-24 rounded" />
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 hidden items-center gap-2 lg:flex">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="skeleton h-9 w-9 rounded-full" />
                        ))}
                    </div>
                </div>

                {/* Scrolling content */}
                <div className="mt-16 space-y-24 lg:mt-0 lg:py-24">
                    <div className="space-y-10">
                        <div className="space-y-2.5">
                            <div className="skeleton h-4 w-full max-w-2xl rounded" />
                            <div className="skeleton h-4 w-11/12 max-w-2xl rounded" />
                            <div className="skeleton h-4 w-3/4 max-w-2xl rounded" />
                        </div>

                        {/* Status strip */}
                        <div className="card overflow-hidden">
                            <div className="flex items-center justify-between border-b border-border px-6 py-4">
                                <div className="skeleton h-3 w-40 rounded" />
                                <div className="skeleton h-3 w-16 rounded" />
                            </div>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 border-b border-border px-6 py-4 last:border-0"
                                >
                                    <div className="skeleton h-4 w-36 rounded" />
                                    <div className="skeleton h-3 flex-1 rounded" />
                                    <div className="skeleton h-3 w-16 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sections */}
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="skeleton h-3 w-28 rounded" />
                                <div className="skeleton h-px flex-1 rounded-none" />
                                <div className="skeleton h-3 w-16 rounded" />
                            </div>
                            <div className="space-y-2.5">
                                <div className="skeleton h-3.5 w-full max-w-2xl rounded" />
                                <div className="skeleton h-3.5 w-5/6 max-w-2xl rounded" />
                                <div className="skeleton h-3.5 w-2/3 max-w-2xl rounded" />
                            </div>
                            <div className="skeleton h-40 w-full rounded-[20px]" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
