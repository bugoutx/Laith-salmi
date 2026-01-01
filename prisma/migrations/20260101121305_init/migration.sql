-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" VARCHAR(255) NOT NULL DEFAULT 'ليث السالمي',
    "date" DATE NOT NULL,
    "category" VARCHAR(255) NOT NULL DEFAULT 'تحليل فني',
    "image" VARCHAR(500) NOT NULL DEFAULT '/placeholder-blog.jpg',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "subtitle" VARCHAR(500),
    "description" TEXT NOT NULL,
    "value_proposition" TEXT,
    "icon" VARCHAR(100) NOT NULL DEFAULT '🎯',
    "color" VARCHAR(100) NOT NULL DEFAULT 'from-green-500/20 to-emerald-500/20',
    "accent_color" VARCHAR(100) NOT NULL DEFAULT 'green-500',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogs_slug_key" ON "blogs"("slug");

-- CreateIndex
CREATE INDEX "blogs_slug_idx" ON "blogs"("slug");

-- CreateIndex
CREATE INDEX "blogs_date_idx" ON "blogs"("date");

-- CreateIndex
CREATE INDEX "blogs_category_idx" ON "blogs"("category");

-- CreateIndex
CREATE INDEX "services_display_order_idx" ON "services"("display_order");

-- CreateIndex
CREATE INDEX "services_is_active_idx" ON "services"("is_active");
