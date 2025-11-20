import { RequestHandler } from "express";

const DB_JSON_URL =
  "https://raw.githubusercontent.com/ismdfaru-coder/newrepo2/main/data/db.json";

interface SiteConfig {
  about: {
    title: string;
    content: string;
    updatedAt: string;
  };
  termsOfService: {
    title: string;
    content: string;
    updatedAt: string;
  };
}

interface DbData {
  articles: any[];
  categories: any[];
  siteConfig?: SiteConfig;
}

// In-memory storage for site config (in production, this would be a database)
let siteConfig: SiteConfig = {
  about: {
    title: "About Readme Hub",
    content: `Readme Hub is a thoughtfully curated collection of stories, essays, and ideas about culture, technology, and human experience.

We believe in the power of narrative to illuminate complex ideas and connect people across the world. Our editorial team carefully selects and commissions work that challenges, inspires, and entertains.

Founded in 2024, Readme Hub is committed to publishing deep, meaningful journalism that explores the intersection of ideas, science, and society.`,
    updatedAt: new Date().toISOString(),
  },
  termsOfService: {
    title: "Terms of Service",
    content: `Last Updated: November 2024

1. ACCEPTANCE OF TERMS
By accessing and using Readme Hub, you accept and agree to be bound by the terms and provision of this agreement.

2. USE LICENSE
Permission is granted to temporarily download one copy of the materials (information or software) on Readme Hub for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
- Modifying or copying the materials
- Using the materials for any commercial purpose or for any public display
- Attempting to decompile or reverse engineer any software contained on Readme Hub
- Removing any copyright or other proprietary notations from the materials
- Transferring the materials to another person or "mirroring" the materials on any other server

3. DISCLAIMER
The materials on Readme Hub are provided "as is". Readme Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. LIMITATIONS
In no event shall Readme Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Readme Hub.

5. ACCURACY OF MATERIALS
The materials appearing on Readme Hub could include technical, typographical, or photographic errors. Readme Hub does not warrant that any of the materials on its website are accurate, complete, or current.

6. MODIFICATIONS
Readme Hub may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.

7. GOVERNING LAW
These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Readme Hub is located, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`,
    updatedAt: new Date().toISOString(),
  },
};

let cachedData: DbData | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const handleGetArticles: RequestHandler = async (req, res) => {
  try {
    // Check cache
    const now = Date.now();
    if (cachedData && now - cacheTime < CACHE_DURATION) {
      return res.json(cachedData);
    }

    // Fetch from GitHub (public repo, no auth needed)
    const response = await fetch(DB_JSON_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch db.json: ${response.status}`);
    }

    const data: DbData = await response.json();

    // Transform articles to match our schema
    const transformedData: DbData = {
      categories: data.categories || [],
      siteConfig: siteConfig,
      articles: (data.articles || []).map((article: any) => ({
        id: String(article.id),
        title: article.title,
        excerpt: article.excerpt,
        content: article.content || "",
        slug: article.slug,
        imageUrl: article.imageUrl,
        imageHint: article.imageHint,
        videoUrl: article.videoUrl,
        category: {
          id: String(article.category.id),
          name: article.category.name,
          slug: article.category.slug,
        },
        author: {
          id: article.author?.id || "unknown",
          name: article.author?.name || "Unknown Author",
        },
        publishedAt: article.publishedAt,
        featured: article.featured || false,
        createdAt: article.createdAt || new Date().toISOString(),
        updatedAt: article.updatedAt || new Date().toISOString(),
      })),
    };

    // Cache the data
    cachedData = transformedData;
    cacheTime = now;

    res.json(transformedData);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

export const handleUpdateSiteConfig: RequestHandler = (req, res) => {
  try {
    const { section, title, content } = req.body;

    if (!section || !["about", "termsOfService"].includes(section)) {
      return res.status(400).json({ error: "Invalid section" });
    }

    const key = section as keyof SiteConfig;
    siteConfig[key] = {
      ...siteConfig[key],
      title: title || siteConfig[key].title,
      content: content || siteConfig[key].content,
      updatedAt: new Date().toISOString(),
    };

    // In production, you would persist this to a database
    res.json({
      message: "Site config updated successfully",
      data: siteConfig[key],
    });
  } catch (error) {
    console.error("Error updating site config:", error);
    res.status(500).json({ error: "Failed to update site config" });
  }
};

export const handleGetSiteConfig: RequestHandler = (req, res) => {
  res.json(siteConfig);
};
