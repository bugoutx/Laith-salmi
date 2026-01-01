import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { prisma } from '../lib/db';

async function setupServicesTable() {
  console.log('Setting up services table...');
  
  try {
    // Check if services already exist
    const existing = await prisma.service.count();
    
    if (existing === 0) {
      console.log('Inserting default services...');
      
      const defaultServices = [
        {
          id: '1',
          title: 'مهارة التحليل الفني',
          subtitle: 'بناء المسار المهني',
          description: 'أقدّم لك مهارة التحليل الفني من أساسها الصحيح، لتصبح قادرًا على قراءة السوق والفرص بنفسك، وبناء قراراتك بوضوح، بعيدًا عن الإزعاج وتضارب الآراء الخارجية.',
          valueProposition: 'امتلاك أداة فكرية ومهارية يمكنك البناء عليها كمسار طويل المدى في الأسواق المالية.',
          icon: '📈',
          color: 'from-blue-500/20 to-cyan-500/20',
          accentColor: 'blue-500',
          displayOrder: 1
        },
        {
          id: '2',
          title: 'منهجية تأهيل تاجر المعادن',
          subtitle: 'نهج متكامل ومتخصص',
          description: 'أعمل على نقل خبرتي العملية في أسواق المعادن، وتحويلها إلى منهجية متكاملة لتأهيلك كتاجر معادن، من فهم حركة أسعار المعادن، وإدارة المخاطر، وصولًا إلى كيفية اتخاذ القرار بثبات وهدوء.',
          valueProposition: 'منهج واضح ومتكامل، لا يحتاج بعده إلى تعدد أساليب أو مصادر، بل يركّز على التطبيق الواعي والاستمرارية.',
          icon: '🥇',
          color: 'from-amber-500/20 to-yellow-500/20',
          accentColor: 'amber-500',
          displayOrder: 2
        },
        {
          id: '3',
          title: 'التوجيه والمتابعة المباشرة',
          subtitle: 'حتى الوصول للهدف',
          description: 'أقدّم حصص تقوية مباشرة تُبنى على احتياجك الفعلي، نُعالج فيها نقاط الضعف، ونُعزّز الجوانب التي تحتاجها في مرحلتك الحالية، مع إمكانية المتابعة المباشرة بعد الجلسات حتى الوصول إلى هدفك.',
          valueProposition: 'أنت لا تُترك بعد الجلسة، بل تُوجَّه حتى يتحقق الفهم والتطبيق العملي.',
          icon: '🎯',
          color: 'from-green-500/20 to-emerald-500/20',
          accentColor: 'green-500',
          displayOrder: 3
        },
        {
          id: '4',
          title: 'شراكة واعية مع المستثمر',
          subtitle: 'عقلية استثمارية مستدامة',
          description: 'للمستثمرين، أقدّم متابعة مباشرة مبنية على شرح مبسّط لما يقدّمه السوق من أدلة، وما يمكن أن يترتب عليها من سيناريوهات محتملة، بعيدًا عن ردّات الفعل والقرارات العشوائية.',
          valueProposition: 'تعامل احترافي مع السوق بعقلية استثمارية هادئة ومستدامة.',
          icon: '🤝',
          color: 'from-purple-500/20 to-indigo-500/20',
          accentColor: 'purple-500',
          displayOrder: 4
        }
      ];

      for (const service of defaultServices) {
        await prisma.service.create({
          data: service
        });
        console.log(`Inserted service: "${service.title}"`);
      }
      
      console.log('Default services inserted successfully!');
    } else {
      console.log(`Services table already has ${existing} entries. Skipping default insertion.`);
    }
  } catch (error) {
    console.error('Error setting up services table:', error);
    throw error;
  }
}

async function setupContentItems() {
  console.log('Setting up content items...');
  
  try {
    // Check if content items already exist
    const existing = await prisma.contentItem.count();
    
    if (existing === 0) {
      console.log('Inserting default content items...');
      
      const defaultContentItems = [
        {
          id: '1',
          type: 'video' as const,
          mediaUrl: '/placeholder-video.mp4',
          title: 'كيف أتعامل مع السوق؟',
          subtitle: null,
          description: 'أتعامل مع السوق بمنهجية واضحة تقوم على قراءة السلوك وليس التوقع. إدارة المخاطر تأتي قبل أي قرار، والانضباط هو الأساس الذي يبني عليه كل تحليل.',
          eyebrow: 'منهجية • فلسفة • انضباط',
          displayOrder: 1,
          isActive: true
        },
        {
          id: '2',
          type: 'image' as const,
          mediaUrl: '/laith2.png',
          title: 'التحليل الفني المتخصص',
          subtitle: 'خبرة عملية في أسواق المعادن',
          description: 'أقدّم لك خبرتي العملية في أسواق المعادن، من فهم حركة الأسعار إلى إدارة المخاطر واتخاذ القرارات بثبات.',
          eyebrow: 'تخصص • خبرة • نتائج',
          displayOrder: 2,
          isActive: true
        },
        {
          id: '3',
          type: 'image' as const,
          mediaUrl: '/laith2.png',
          title: 'منهجية وزن الأدلة',
          subtitle: 'قراءة شاملة للسوق',
          description: 'أعتمد على منهجية وزن الأدلة (Weight of Evidence) التي تجمع وترجّح مجموعة من الأدلة لفهم الصورة الكاملة للسوق، بدلاً من الاعتماد على إشارة واحدة.',
          eyebrow: 'منهجية • دقة • شمولية',
          displayOrder: 3,
          isActive: true
        },
        {
          id: '4',
          type: 'image' as const,
          mediaUrl: '/laith2.png',
          title: 'المرونة في التعامل',
          subtitle: 'التكيّف مع تغيّرات السوق',
          description: 'المرونة عنصر أساسي في منهجيتي. مع تغيّر معطيات السوق تتغيّر القرارات، دون عناد أو تمسّك برأي مسبق. المرونة هنا تعني الالتزام بالمنهج بدل الالتزام بالرأي الشخصي.',
          eyebrow: 'مرونة • تكيّف • انضباط',
          displayOrder: 4,
          isActive: true
        },
        {
          id: '5',
          type: 'image' as const,
          mediaUrl: '/laith2.png',
          title: 'التعامل مع الاحتمالات',
          subtitle: 'السوق مساحة احتمالات لا يقين',
          description: 'أتعامل مع السوق على أنه مساحة احتمالات لا يقين، حيث تُبنى القرارات على الترجيح وليس على التوقع أو الانطباع اللحظي. هذا النهج يمنحك رؤية واضحة وواقعية.',
          eyebrow: 'احتمالات • ترجيح • واقعية',
          displayOrder: 5,
          isActive: true
        }
      ];

      for (const item of defaultContentItems) {
        await prisma.contentItem.create({
          data: item
        });
        console.log(`Inserted content item: "${item.title || item.type}"`);
      }
      
      console.log('Default content items inserted successfully!');
    } else {
      console.log(`Content items table already has ${existing} entries. Skipping default insertion.`);
    }
  } catch (error) {
    console.error('Error setting up content items:', error);
    throw error;
  }
}

async function migrateData() {
  // First, ensure services table exists and has default data
  await setupServicesTable();
  
  // Setup content items
  await setupContentItems();
  
  // Then migrate blogs if they exist
  const jsonPath = join(process.cwd(), 'data', 'blogs.json');
  
  if (!existsSync(jsonPath)) {
    console.log('No blogs.json file found. Nothing to migrate.');
    return;
  }

  try {
    const jsonData = JSON.parse(readFileSync(jsonPath, 'utf8'));
    
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.log('No blogs found in JSON file.');
      return;
    }

    let migrated = 0;
    let skipped = 0;

    for (const blog of jsonData) {
      try {
        // Check if blog already exists
        const existing = await prisma.blog.findFirst({
          where: {
            OR: [
              { id: blog.id },
              { slug: blog.slug }
            ]
          }
        });

        if (existing) {
          console.log(`Skipping blog "${blog.title}" - already exists`);
          skipped++;
          continue;
        }

        // Insert blog
        await prisma.blog.create({
          data: {
            id: blog.id,
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author || 'ليث السالمي',
            date: new Date(blog.date),
            category: blog.category || 'تحليل فني',
            image: blog.image || '/placeholder-blog.jpg'
          }
        });

        console.log(`Migrated: "${blog.title}"`);
        migrated++;
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log(`Skipping duplicate: "${blog.title}"`);
          skipped++;
        } else {
          console.error(`Error migrating blog "${blog.title}":`, error.message);
        }
      }
    }

    console.log(`\nMigration complete!`);
    console.log(`Migrated: ${migrated} blogs`);
    console.log(`Skipped: ${skipped} blogs`);
  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  }
}

migrateData()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Migration finished');
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Migration failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
