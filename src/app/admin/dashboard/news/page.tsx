
import { prisma } from "@/lib/prisma";
import Link from 'next/link';
import { deleteNews } from "@/app/actions/news";

export default async function NewsListPage() {
    const news = await prisma.newsItem.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-serif text-[#1B263B]">Content Management</h1>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Editorial Journal</p>
                </div>
                <Link href="/admin/dashboard/news/create" className="btn-primary">
                    New Article
                </Link>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5]">Story Title</th>
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5]">Date Published</th>
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {news.map((item) => (
                            <tr key={item.id} className="hover:bg-[#F8F7F5]/50 transition-colors">
                                <td className="p-6">
                                    <div className="text-[#1B263B] font-medium serif text-lg">{item.title}</div>
                                    <div className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Slug: {item.slug}</div>
                                </td>
                                <td className="p-6 text-gray-500 text-sm font-light">
                                    {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="p-6 text-right flex items-center justify-end gap-6">
                                    <Link href={`/admin/dashboard/news/${item.id}/edit`} className="text-[10px] uppercase tracking-widest text-[#1B263B] hover:text-[#C5A065] font-bold transition-colors">
                                        Edit
                                    </Link>
                                    <form action={deleteNews.bind(null, item.id)} className="inline">
                                        <button className="text-[10px] uppercase tracking-widest text-red-800 hover:text-red-500 font-bold transition-colors">
                                            Remove
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {news.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-12 text-center text-gray-400 italic font-light">
                                    No editorial pieces found. Start crafting your first story.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
