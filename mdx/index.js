import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const rootDirectory = path.join(process.cwd(), "data/blog");

export const getPostBySlug = async (slug) => {
  let filePath;
  const realSlug = slug.replace(/\.md$/, "");

  filePath = path.join(rootDirectory, `${realSlug}.md`);

  if (!fs.existsSync(filePath)) {
    return null; 
  }

  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  const { data: frontmatter, content: source } = matter(fileContent);

  const { content } = await compileMDX({ source });

  return { meta: { ...frontmatter, slug: realSlug }, content };
};

export const getAllPostsMeta = async () => {
  const files = fs.readdirSync(rootDirectory);

  let posts = [];

  for (const file of files) {
    const post = await getPostBySlug(file);
    if (post) {
      posts.push(post.meta);
    }
  }

  return posts;
};
