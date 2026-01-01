import mysql from 'mysql2/promise';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { getPool } from '../lib/db';

async function setupServicesTable(pool: any) {
  console.log('Setting up services table...');
  
  try {
    // Create services table if it doesn't exist
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        subtitle VARCHAR(500),
        description TEXT NOT NULL,
        value_proposition TEXT,
        icon VARCHAR(100) DEFAULT '🎯',
        color VARCHAR(100) DEFAULT 'from-green-500/20 to-emerald-500/20',
        accent_color VARCHAR(100) DEFAULT 'green-500',
        display_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_display_order (display_order),
        INDEX idx_is_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Check if services already exist
    const [existing] = await pool.execute<any[]>('SELECT COUNT(*) as count FROM services');
    
    if (existing[0].count === 0) {
      console.log('Inserting default services...');
      
      const defaultServices = [
        {
          id: '1',
          title: 'مهارة التحليل الفني',
          subtitle: 'بناء المسار المهني',
          description: 'أقدّم لك مهارة التحليل الفني من أساسها الصحيح، لتصبح قادرًا على قراءة السوق والفرص بنفسك، وبناء قراراتك بوضوح، بعيدًا عن الإزعاج وتضارب الآراء الخارجية.',
          value_proposition: 'امتلاك أداة فكرية ومهارية يمكنك البناء عليها كمسار طويل المدى في الأسواق المالية.',
          icon: '📈',
          color: 'from-blue-500/20 to-cyan-500/20',
          accent_color: 'blue-500',
          display_order: 1
        },
        {
          id: '2',
          title: 'منهجية تأهيل تاجر المعادن',
          subtitle: 'نهج متكامل ومتخصص',
          description: 'أعمل على نقل خبرتي العملية في أسواق المعادن، وتحويلها إلى منهجية متكاملة لتأهيلك كتاجر معادن، من فهم حركة أسعار المعادن، وإدارة المخاطر، وصولًا إلى كيفية اتخاذ القرار بثبات وهدوء.',
          value_proposition: 'منهج واضح ومتكامل، لا يحتاج بعده إلى تعدد أساليب أو مصادر، بل يركّز على التطبيق الواعي والاستمرارية.',
          icon: '🥇',
          color: 'from-amber-500/20 to-yellow-500/20',
          accent_color: 'amber-500',
          display_order: 2
        },
        {
          id: '3',
          title: 'التوجيه والمتابعة المباشرة',
          subtitle: 'حتى الوصول للهدف',
          description: 'أقدّم حصص تقوية مباشرة تُبنى على احتياجك الفعلي، نُعالج فيها نقاط الضعف، ونُعزّز الجوانب التي تحتاجها في مرحلتك الحالية، مع إمكانية المتابعة المباشرة بعد الجلسات حتى الوصول إلى هدفك.',
          value_proposition: 'أنت لا تُترك بعد الجلسة، بل تُوجَّه حتى يتحقق الفهم والتطبيق العملي.',
          icon: '🎯',
          color: 'from-green-500/20 to-emerald-500/20',
          accent_color: 'green-500',
          display_order: 3
        },
        {
          id: '4',
          title: 'شراكة واعية مع المستثمر',
          subtitle: 'عقلية استثمارية مستدامة',
          description: 'للمستثمرين، أقدّم متابعة مباشرة مبنية على شرح مبسّط لما يقدّمه السوق من أدلة، وما يمكن أن يترتب عليها من سيناريوهات محتملة، بعيدًا عن ردّات الفعل والقرارات العشوائية.',
          value_proposition: 'تعامل احترافي مع السوق بعقلية استثمارية هادئة ومستدامة.',
          icon: '🤝',
          color: 'from-purple-500/20 to-indigo-500/20',
          accent_color: 'purple-500',
          display_order: 4
        }
      ];

      for (const service of defaultServices) {
        await pool.execute(
          `INSERT INTO services (id, title, subtitle, description, value_proposition, icon, color, accent_color, display_order, is_active) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            service.id,
            service.title,
            service.subtitle,
            service.description,
            service.value_proposition,
            service.icon,
            service.color,
            service.accent_color,
            service.display_order,
            true
          ]
        );
        console.log(`Inserted service: "${service.title}"`);
      }
      
      console.log('Default services inserted successfully!');
    } else {
      console.log(`Services table already has ${existing[0].count} entries. Skipping default insertion.`);
    }
  } catch (error) {
    console.error('Error setting up services table:', error);
    throw error;
  }
}

async function migrateJsonToMySQL() {
  const pool = getPool();
  
  // First, ensure services table exists and has default data
  await setupServicesTable(pool);
  
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
        const [existing] = await pool.execute<any[]>(
          'SELECT id FROM blogs WHERE id = ? OR slug = ?',
          [blog.id, blog.slug]
        );

        if (existing && existing.length > 0) {
          console.log(`Skipping blog "${blog.title}" - already exists`);
          skipped++;
          continue;
        }

        // Insert blog
        await pool.execute(
          `INSERT INTO blogs (id, slug, title, excerpt, content, author, date, category, image) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            blog.id,
            blog.slug,
            blog.title,
            blog.excerpt,
            blog.content,
            blog.author || 'ليث السالمي',
            blog.date,
            blog.category || 'تحليل فني',
            blog.image || '/placeholder-blog.jpg'
          ]
        );

        console.log(`Migrated: "${blog.title}"`);
        migrated++;
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
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

migrateJsonToMySQL()
  .then(() => {
    console.log('Migration finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });

