import 'dotenv/config';
import prisma from './configs/prisma.js';

console.log('Starting backfill...');

const res = await fetch('https://api.clerk.com/v1/users?limit=100', {
    headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` }
});
const users = await res.json();
console.log(`Found ${users.length} users in Clerk`);

for (const u of users) {
    const email = u.email_addresses[0]?.email_address ?? '';
    const name = `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim();
    try {
        await prisma.user.upsert({
            where: { id: u.id },
            update: {},
            create: { id: u.id, email, name, image: u.image_url }
        });
        console.log('synced:', u.id, email);
    } catch (err) {
        if (err.code === 'P2002') {
            // Same email exists under an old Clerk ID — update that row to the new ID
            try {
                await prisma.user.update({
                    where: { email },
                    data: { id: u.id, name, image: u.image_url }
                });
                console.log('re-linked:', u.id, email);
            } catch (err2) {
                console.log('FAILED re-link for', email, '-', err2.message);
            }
        } else {
            console.log('FAILED for', u.id, '-', err.message);
        }
    }
}

console.log('Done!');
process.exit(0);