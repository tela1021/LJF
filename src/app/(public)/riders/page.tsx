
import Image from 'next/image';
import { prisma } from "@/lib/prisma";

export default async function RidersPage() {
    const riders = await prisma.rider.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Content */}
            <section className="py-24 bg-[#F8F7F5] border-b border-gray-100">
                <div className="container px-4 text-center">
                    <span className="text-[#C5A065] uppercase tracking-[0.3em] text-xs mb-4 block animate-fade-in">The LJF Family</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-[#1B263B] mb-8 animate-fade-in">Our Riders</h1>
                    <div className="w-20 h-[1px] bg-[#C5A065] mx-auto mb-10"></div>
                    <p className="max-w-2xl mx-auto text-gray-500 font-light text-lg leading-relaxed italic animate-fade-in">
                        "Meet the elite athletes representing the heart and soul of Latvian show jumping. Excellence, dedication, and the unique bond between horse and rider."
                    </p>
                </div>
            </section>

            {/* Riders Grid */}
            <section className="py-24 container px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {riders.map((rider, index) => (
                        <div key={rider.id} className="group flex flex-col animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            {/* Image Container */}
                            <div className="aspect-[4/5] bg-gray-100 mb-8 overflow-hidden relative">
                                <Image
                                    src={rider.image || '/images/hero.png'}
                                    alt={rider.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col">
                                <span className="text-[#C5A065] text-xs uppercase tracking-widest block mb-2 font-semibold italic">Elite Athlete</span>
                                <h2 className="text-3xl font-serif text-[#1B263B] mb-4 group-hover:text-[#C5A065] transition-colors">
                                    {rider.name}
                                </h2>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-[1px] bg-[#C5A065]"></div>
                                    <span className="text-sm uppercase tracking-widest text-gray-400">
                                        Partner: <span className="text-[#1B263B] font-medium">{rider.horseName || 'N/A'}</span>
                                    </span>
                                </div>

                                <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm italic">
                                    "{rider.bio}"
                                </p>

                                <div className="mt-auto border-t border-gray-100 pt-6">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3 font-bold">Key Achievements</h4>
                                    <p className="text-xs text-[#1B263B] leading-relaxed font-light">
                                        {rider.achievements}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {riders.length === 0 && (
                    <div className="text-center py-20 text-gray-400 italic">
                        No riders currently listed. Check back soon for updates from our stable.
                    </div>
                )}
            </section>
        </div>
    );
}
