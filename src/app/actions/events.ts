'use server';
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteEvent(id: string) {
    try {
        await prisma.event.delete({ where: { id } });
        revalidatePath('/admin/dashboard/events');
        revalidatePath('/events');
    } catch (e) {
        console.error("Failed to delete event:", e);
    }
}

export async function updateEvent(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const location = formData.get('location') as string;
    const dateStr = formData.get('date') as string;
    const description = formData.get('description') as string;

    if (!title || !dateStr) {
        redirect(`/admin/dashboard/events/${id}/edit?error=Missing Fields`);
    }

    try {
        await prisma.event.update({
            where: { id },
            data: {
                title,
                location,
                date: new Date(dateStr),
                description,
            }
        });

        revalidatePath('/admin/dashboard/events');
        revalidatePath('/events');
    } catch (e) {
        console.error("Failed to update event:", e);
        redirect(`/admin/dashboard/events/${id}/edit?error=Database Error`);
    }

    redirect('/admin/dashboard/events');
}
