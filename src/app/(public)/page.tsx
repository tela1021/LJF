
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[90vh] w-full bg-[#1B263B] overflow-hidden">
                <div className="absolute inset-0 opacity-90 scale-105 animate-[slowZoom_20s_ease-in-out_infinite]">
                    <Image
                        src="/images/hero.png"
                        alt="Equestrian Excellence"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/45" />

                <div className="relative z-10 container h-full flex items-center justify-center text-center">
                    <div className="max-w-3xl text-white animate-fade-in">
                        <h5 className="uppercase tracking-[0.4em] mb-6 text-sm font-medium text-[#C5A065] !text-[#C5A065]">National Equestrian Federation</h5>
                        <h1 className="text-6xl md:text-8xl font-serif mb-10 leading-tight text-white !text-white drop-shadow-2xl">
                            Timeless <span className="italic">Elegance</span>
                        </h1>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <Link href="/news" className="btn-primary min-w-[220px]">
                                The Journal
                            </Link>
                            <Link href="/events" className="btn-outline min-w-[220px]">
                                Competitions
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-32 bg-white text-center">
                <div className="container px-4">
                    <span className="text-[#C5A065] uppercase tracking-[0.3em] text-xs mb-4 block">Our Philosophy</span>
                    <h2 className="text-4xl md:text-5xl font-serif mb-10 text-[#1B263B]">Designed for Performance</h2>
                    <div className="w-20 h-[1px] bg-[#C5A065] mx-auto mb-10"></div>
                    <p className="max-w-3xl mx-auto text-gray-500 font-light text-xl leading-relaxed italic">
                        "To inspire riders worldwide by combining traditional craftsmanship with modern innovation. We believe in the harmony between rider and horse."
                    </p>
                </div>
            </section>

            {/* Featured Collection Style Grid */}
            <section className="pb-32 container px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Action Item 1 */}
                    <div className="group relative overflow-hidden h-[700px]">
                        <Image
                            src="/images/featured.png"
                            alt="World Class Competitions"
                            fill
                            className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                            <h3 className="text-4xl font-serif mb-4">Elite Jumping</h3>
                            <p className="max-w-md mb-8 text-gray-200 font-light">Explore the calendar for the upcoming 2026 World Cup Qualifiers.</p>
                            <Link href="/events" className="uppercase tracking-widest text-xs border-b border-white pb-1 w-fit hover:text-[#C5A065] hover:border-[#C5A065] transition-all">
                                Discover Events
                            </Link>
                        </div>
                    </div>

                    {/* Content Stack Item 2 */}
                    <div className="flex flex-col justify-center p-16 bg-[#F8F7F5] border border-[#eee]">
                        <span className="text-[#C5A065] uppercase tracking-[0.3em] text-xs mb-6 block">Member Spotlight</span>
                        <h3 className="text-4xl font-serif text-[#1B263B] mb-8 leading-snug">Empowering the Next Generation of Riders</h3>
                        <p className="text-gray-600 font-light mb-10 leading-relaxed text-lg">
                            Our youth development programs are designed to nurture talent from the ground up, providing access to world-class coaching and facilities.
                        </p>
                        <div className="space-y-6 mb-12">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-[1px] bg-[#C5A065]"></div>
                                <span className="text-sm uppercase tracking-widest text-[#1B263B]">Development Clinics</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-[1px] bg-[#C5A065]"></div>
                                <span className="text-sm uppercase tracking-widest text-[#1B263B]">Rider Scholarships</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-[1px] bg-[#C5A065]"></div>
                                <span className="text-sm uppercase tracking-widest text-[#1B263B]">Stable Management</span>
                            </div>
                        </div>
                        <Link href="/riders" className="btn-primary w-fit">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Carousel Style Section (Journal) */}
            <section className="py-24 bg-[#F8F7F5] border-t border-gray-100">
                <div className="container px-4">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
                        <h2 className="text-3xl text-[#1B263B] font-serif tracking-wide uppercase">The LJF Journal</h2>
                        <Link href="/news" className="text-[#C5A065] uppercase tracking-widest text-xs border-b border-[#C5A065] pb-1 hover:text-[#1B263B] hover:border-[#1B263B] transition-colors">Read All Articles</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-[#1B263B]">
                        {[
                            { id: 1, title: 'The Art of Dressage: Precision and Grace', img: '/images/journal1.png', slug: 'art-of-dressage' },
                            { id: 2, title: 'Equestrian Fashion: The 2026 Collection', img: '/images/journal2.png', slug: 'equestrian-fashion-2026' },
                            { id: 3, title: 'Stable Harmony: Designing for Comfort', img: '/images/journal3.png', slug: 'stable-harmony' }
                        ].map(news => (
                            <Link href={`/news`} key={news.id} className="group cursor-pointer block">
                                <div className="aspect-[4/5] bg-gray-200 mb-6 overflow-hidden relative">
                                    <Image
                                        src={news.img}
                                        alt={news.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>
                                <span className="text-[#C5A065] text-xs uppercase tracking-widest block mb-3 font-semibold">Journal • Jan 2026</span>
                                <h4 className="text-xl font-serif mb-4 group-hover:text-[#C5A065] transition-colors uppercase tracking-wider leading-snug">
                                    {news.title}
                                </h4>
                                <p className="text-gray-500 text-sm font-light leading-relaxed">
                                    Discover the nuances of excellence through our dedicated masterclass and style series.
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 bg-white text-center border-t border-gray-100">
                <div className="container px-4">
                    <h2 className="text-4xl font-serif text-[#1B263B] mb-8">Join the Federation</h2>
                    <p className="max-w-xl mx-auto text-gray-500 font-light mb-12">
                        Become a part of our exclusive community. Access rankings, event registration, and more.
                    </p>
                    <Link href="/admin/login" className="btn-primary">
                        Create Member Account
                    </Link>
                </div>
            </section>
        </div>
    );
}
