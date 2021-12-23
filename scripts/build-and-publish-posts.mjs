import { config } from 'dotenv';
config();
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import Joi from 'joi';
import fetch from "node-fetch";

const securityToken = process.env.SECURITY_TOKEN;
const apiUrl = process.env.API_URL;

const folders = [
  'blog'
];

const uploadList = []

const last = arr => arr[arr.length - 1];

const postMetadataSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  tags: Joi.array().items(Joi.string())
});

async function listAllMarkdownFromFolder(folder) {
  const dir = await readdir(folder);
  return dir.filter(file => ['md', 'markdown'].includes(last(file.split('.'))));
}

async function processFile(folder, file) {
  const fileContent = await readFile(path.join(folder, file));
  const { data, content: contentMD } = matter(fileContent.toString());
  const validation = postMetadataSchema.validate(data);
  if (validation.error) {
    console.warn(`Error while validating metadata of ${path.join(folder, file)}. Err: ${validation.error}. Skipping this file.`);
    return;
  }

  const compiled = remark().use(html).processSync(contentMD).toString();
  const post = { ...data, content: compiled };

  uploadList.push({
    key: `${folder}/${file}`, post
  });
}

async function processFolder(folder) {
  const fileList = await listAllMarkdownFromFolder(folder);
  await Promise.all(fileList.map(file => processFile(folder, file)));
}

async function uploadPosts() {
  for (const upload of uploadList) {
    const res = await fetch(apiUrl + '/blog/publish', {
      method: "POST",
      headers: { 'content-type': "application/json" },
      body: JSON.stringify({ ...upload, token: securityToken })
    });
    if (res.status >= 200 && res.status <= 299) {
      console.log(`✔ ${upload.key} uploaded successfully!`);
    } else {
      console.error(`❌ ${upload.key} failed. Status code: ${res.status} ${res.statusText}, body: ${ await res.text() }`);
    }
  }
}

async function main() {
  await processFolder(folders[0]);
  console.log(`Uploading ${uploadList.length} posts...`);
  await uploadPosts();
}

main();
