import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // 1. Clean existing data
    await prisma.newsItem.deleteMany();
    await prisma.event.deleteMany();
    await prisma.rider.deleteMany();

    // 2. Add News Items
    await prisma.newsItem.createMany({
        data: [
            {
                title: 'The Art of Dressage: Precision and Grace',
                slug: 'art-of-dressage',
                summary: 'Explore the nuances of excellence through our dedicated masterclass series.',
                content: 'Dressage is the highest expression of horse training... [Detailed content about dressage techniques and the harmony between rider and horse.]',
                image: '/images/journal1.png',
                publishedAt: new Date('2026-01-10'),
            },
            {
                title: 'Equestrian Fashion: The 2026 Collection',
                slug: 'equestrian-fashion-2026',
                summary: 'Discover the latest trends in high-performance riding apparel.',
                content: 'Our 2026 collection combines timeless elegance with modern technical fabrics... [Detailed content about the new collection, materials, and design philosophy.]',
                image: '/images/journal2.png',
                publishedAt: new Date('2026-01-12'),
            },
            {
                title: 'Stable Harmony: Designing for Comfort',
                slug: 'stable-harmony',
                summary: 'How modern stable design improves the well-being of the horse.',
                content: 'A well-designed stable is more than just a shelter... [Detailed content about ventilation, flooring, and psychological comfort for horses.]',
                image: '/images/journal3.png',
                publishedAt: new Date('2026-01-14'),
            },
        ],
    });

    // 3. Add Events
    await prisma.event.createMany({
        data: [
            {
                title: 'Riga Grand Prix 2026',
                location: 'Kleisti Equestrian Center, Riga',
                date: new Date('2026-05-15T10:00:00Z'),
                description: 'The premier show jumping event in Latvia, attracting international talent.',
            },
            {
                title: 'Baltic Cup Qualifiers',
                location: 'Inčukalns',
                date: new Date('2026-06-20T09:00:00Z'),
                description: 'Qualifying rounds for the regional Baltic Cup championship.',
            },
            {
                title: 'Jurmala Beach Jumping',
                location: 'Majori Beach, Jurmala',
                date: new Date('2026-07-12T14:00:00Z'),
                description: 'A spectacular jumping event held on the sands of Jurmala.',
            },
            {
                title: 'National Championship 2026',
                location: 'Kleisti, Riga',
                date: new Date('2026-08-25T10:00:00Z'),
                description: 'The final showdown to determine the national champions of the year.',
            },
        ],
    });

    // 4. Add Riders
    await prisma.rider.createMany({
        data: [
            {
                name: 'Kristaps Neretnieks',
                horseName: 'Palladium KJV',
                bio: 'Latvian Olympic rider specializing in show jumping.',
                image: '/images/rider1.png',
                achievements: 'Olympic Finalist, multiple World Cup Qualifier winner.',
            },
            {
                name: 'Laura Penele',
                horseName: 'Dundante',
                bio: 'Rising star in the national show jumping scene.',
                image: '/images/rider2.png',
                achievements: 'National Champion 2024, GP Winner Riga.',
            },
            {
                name: 'Andis Vārna',
                horseName: 'High Quality',
                bio: 'Veteran rider and coach with decades of international experience.',
                image: '/images/rider3.png',
                achievements: 'Multiple-time winner of the Baltic League.',
            },
        ],
    });

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
