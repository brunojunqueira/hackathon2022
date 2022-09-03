-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "keywords" TEXT[],

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Searchs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "keywords" TEXT[],

    CONSTRAINT "Searchs_pkey" PRIMARY KEY ("id")
);
