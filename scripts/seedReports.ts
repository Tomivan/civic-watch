import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(resolve(__dirname, 'serviceAccountKey.json'), 'utf-8')
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const TARGET_EMAIL = 'bukunmiodugbesans@gmail.com';
const TARGET_UID = 'seed-bukunmi-uid';

const categories = ['infrastructure', 'environment', 'sanitation', 'safety'];
const areas = ['Ikeja', 'Oshodi', 'Surulere', 'Eti-Osa', 'Lagos Island', 'Yaba', 'Apapa', 'Mushin'];
const statuses = ['open', 'open', 'open', 'in-progress', 'resolved'];
const priorities = ['low', 'medium', 'high'];

const templates = [
  { title: 'Blocked drainage causing flooding', description: 'Drainage is blocked with debris, water has been standing for 3 days and is now entering nearby shops.' },
  { title: 'Broken streetlight on main road', description: 'The streetlight has been out for over a week. The area is very dark at night and residents feel unsafe.' },
  { title: 'Illegal dumping on vacant lot', description: 'People have been dumping refuse on the empty plot next to the school. It is attracting rodents.' },
  { title: 'Pothole damaging vehicles', description: 'A large pothole has formed after the rains. Two cars have already been damaged this week.' },
  { title: 'Overflowing public bin', description: 'The public waste bin has not been emptied in 5 days. Refuse is spilling onto the sidewalk.' },
  { title: 'Open manhole on pedestrian path', description: 'The cover is missing and the hole is not marked. Children walk past this spot daily.' },
  { title: 'Blocked canal causing backflow', description: 'The canal is clogged with plastic waste, and water is backing up into residential streets.' },
  { title: 'Damaged road sign at junction', description: 'The directional sign at the intersection has been knocked down and is lying on the road.' },
  { title: 'Sewage leak near market', description: 'A sewage pipe is leaking onto the walkway. The smell is strong and traders are complaining.' },
  { title: 'Fallen tree blocking access road', description: 'A tree fell during last night\'s storm and is blocking one lane. Traffic is backed up.' },
  { title: 'Abandoned vehicle on residential street', description: 'A vehicle has been parked in the same spot for over a month without movement.' },
  { title: 'Water main leak wasting water', description: 'Water has been gushing from a broken main since yesterday morning. No one has come to fix it.' },
  { title: 'Uncollected refuse on street corner', description: 'Refuse has not been collected for 10 days. Residents are worried about disease.' },
  { title: 'Damaged pedestrian crossing', description: 'The zebra crossing markings are completely worn off. Drivers are not slowing down.' },
  { title: 'Street hawkers blocking traffic', description: 'Hawkers have taken over the road, making it difficult for vehicles to pass safely.' },
  { title: 'Broken traffic light at busy intersection', description: 'The traffic light has been non-functional since Monday. Accidents nearly happening daily.' },
  { title: 'Flooded underpass after rain', description: 'The underpass floods whenever it rains. Pedestrians are forced onto the road.' },
  { title: 'Illegal structure on setback', description: 'A makeshift structure has been erected on the road setback, blocking the drain.' },
  { title: 'Noise pollution from generator', description: 'A commercial generator runs all night, disturbing residents in the area.' },
  { title: 'Stray dogs around school', description: 'Several stray dogs have been seen around the school premises. Parents are concerned.' },
];

const randomFrom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const hoursAgo = (h: number) => Timestamp.fromMillis(Date.now() - h * 60 * 60 * 1000);

const seed = async () => {
  const batch = db.batch();

  for (let i = 0; i < 20; i++) {
    const tpl = templates[i];
    const category = randomFrom(categories);
    const isBukunmi = i < 4;

    const report = {
      category,
      title: tpl.title,
      description: tpl.description,
      address: `${Math.floor(Math.random() * 200) + 1} ${randomFrom(['Allen Avenue', 'Awolowo Road', 'Broad Street', 'Marina', 'Opebi Road', 'Bode Thomas'])}, ${randomFrom(areas)}`,
      area: randomFrom(areas),
      landmark: randomFrom(['City Mall', 'Local Market', 'Primary School', 'Bus Stop', 'General Hospital', '']),
      anonymous: category === 'safety',
      restricted: category === 'safety',
      userId: isBukunmi ? TARGET_UID : `seed-user-${i}`,
      userEmail: isBukunmi ? TARGET_EMAIL : `user${i}@example.com`,
      status: randomFrom(statuses),
      priority: category === 'safety' ? 'high' : randomFrom(priorities),
      mediaUrls: [],
      createdAt: hoursAgo(Math.floor(Math.random() * 24 * 14)),
      updatedAt: hoursAgo(Math.floor(Math.random() * 24 * 3)),
    };

    const ref = db.collection('reports').doc();
    batch.set(ref, report);
  }

  await batch.commit();
  console.log('✅ Seeded 20 reports.');
  process.exit(0);
};

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});