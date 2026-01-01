-- CreateTable
CREATE TABLE "content_items" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "media_url" VARCHAR(500) NOT NULL,
    "title" VARCHAR(500),
    "subtitle" VARCHAR(500),
    "description" TEXT,
    "eyebrow" VARCHAR(255),
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "content_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "content_items_display_order_idx" ON "content_items"("display_order");

-- CreateIndex
CREATE INDEX "content_items_is_active_idx" ON "content_items"("is_active");

-- CreateIndex
CREATE INDEX "content_items_type_idx" ON "content_items"("type");
