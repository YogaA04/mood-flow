import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

async function main() {
    // Create a test user
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            email: 'test@example.com',
            name: 'Test User'
        }
    })

    // Create activities for each mood
    const activities = [
        // PRODUCTIVE activities
        { name: 'Ngoding project pribadi', type: 'CODING', mood: 'PRODUCTIVE', duration: 60 },
        { name: 'Mengerjakan IoT', type: 'IOT', mood: 'PRODUCTIVE', duration: 90 },
        { name: 'Mencoba algoritma trading', type: 'TRADING', mood: 'PRODUCTIVE', duration: 45 },

        // LEARNING activities
        { name: 'Nonton YouTube edukasi', type: 'WATCHING', mood: 'LEARNING', duration: 30 },
        { name: 'Baca buku/ebook 10 halaman', type: 'READING', mood: 'LEARNING', duration: 45 },

        // RELAXED_ACTIVE activities
        { name: 'Nulis jurnal', type: 'JOURNALING', mood: 'RELAXED_ACTIVE', duration: 20 },
        { name: 'Ngoprek Linux/Android', type: 'TINKERING', mood: 'RELAXED_ACTIVE', duration: 60 },
        { name: 'Bikin catatan ide random', type: 'NOTE_TAKING', mood: 'RELAXED_ACTIVE', duration: 15 },

        // TIRED activities
        { name: 'Dengar podcast', type: 'PODCAST', mood: 'TIRED', duration: 30 },
        { name: 'Jalan ringan 10 menit', type: 'WALKING', mood: 'TIRED', duration: 10 },
        { name: 'Tiduran sambil belajar ringan', type: 'RESTING', mood: 'TIRED', duration: 20 }
    ]

    for (const activity of activities) {
        await prisma.activity.create({
            data: {
                userId: user.id,
                ...activity
            }
        })
    }

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
