
import { prisma } from "@/lib/prisma";
import Image from 'next/image';
import Link from 'next/link';

export default async function NewsPage() {
    const news = await prisma.newsItem.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="bg-white min-h-screen pb-24">
            <header className="py-24 bg-[#F8F7F5] border-b border-gray-100 mb-12">
                <div className="container px-4 text-center">
                    <span className="text-[#C5A065] uppercase tracking-[0.4em] text-xs mb-4 block">The Federation</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-[#1B263B]">Journal</h1>
                </div>
            </header>

            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {news.map((item) => (
                        <Link href={`/news/${item.slug}`} key={item.id} className="group flex flex-col">
                            <div className="aspect-[4/5] bg-gray-100 relative mb-6 overflow-hidden">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-[#1B263B]/5 flex items-center justify-center">
                                        <span className="text-[#C5A065] text-4xl font-serif">LJF</span>
                                    </div>
                                )}
                            </div>
                            <span className="text-xs uppercase tracking-widest text-[#C5A065] mb-3">
                                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                            <h3 className="text-2xl font-serif text-[#1B263B] mb-4 group-hover:text-[#C5A065] transition-colors leading-tight uppercase">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 font-light line-clamp-2 mb-6">
                                {item.summary || item.content.substring(0, 100) + '...'}
                            </p>
                            <span className="mt-auto text-xs uppercase tracking-widest text-[#1B263B] border-b border-[#1B263B] pb-1 w-fit group-hover:border-[#C5A065] group-hover:text-[#C5A065] transition-all">
                                Read Story
                            </span>
                        </Link>
                    ))}

                    {news.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-400 font-light italic">
                            The Journal is currently empty. Please check back later for our latest stories.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
