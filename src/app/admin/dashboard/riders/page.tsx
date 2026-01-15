import { prisma } from "@/lib/prisma";
import Link from 'next/link';
import { deleteRider } from "@/app/actions/riders";

export default async function RidersAdminPage() {
    const riders = await prisma.rider.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div>
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-serif text-[#1B263B]">Riders Roster</h1>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Athlete Profiles</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5]">National Athlete</th>
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5]">Prime Horse</th>
                            <th className="p-6 text-[#1B263B] text-[10px] uppercase tracking-widest font-bold bg-[#F8F7F5] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {riders.map((rider) => (
                            <tr key={rider.id} className="hover:bg-[#F8F7F5]/50 transition-colors">
                                <td className="p-6">
                                    <div className="text-[#1B263B] font-medium serif text-lg">{rider.name}</div>
                                </td>
                                <td className="p-6 text-gray-500 text-sm font-light">
                                    {rider.horseName || 'Unassigned'}
                                </td>
                                <td className="p-6 text-right flex items-center justify-end gap-6">
                                    <Link href={`/admin/dashboard/riders/${rider.id}/edit`} className="text-[10px] uppercase tracking-widest text-[#1B263B] hover:text-[#C5A065] font-bold transition-colors">
                                        Edit
                                    </Link>
                                    <form action={deleteRider.bind(null, rider.id)} className="inline">
                                        <button className="text-[10px] uppercase tracking-widest text-red-800 hover:text-red-500 font-bold transition-colors">
                                            Remove
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {riders.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-12 text-center text-gray-400 italic font-light">
                                    No riders listed in the federation records.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
