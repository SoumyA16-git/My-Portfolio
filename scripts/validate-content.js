import fs from 'fs';
import path from 'path';

const siteJsonPath = path.resolve('src/content/site.json');
const projectsJsonPath = path.resolve('src/content/projects.json');

console.log('🔍 Validating content schema and references...\n');

let hasErrors = false;
let hasWarnings = false;

// 1. Validate site.json
if (!fs.existsSync(siteJsonPath)) {
  console.error('❌ Error: src/content/site.json not found!');
  process.exit(1);
}

const siteData = JSON.parse(fs.readFileSync(siteJsonPath, 'utf8'));

if (!siteData.name || !siteData.hero || !siteData.capabilities || !siteData.process) {
  console.error('❌ Error: site.json missing required top-level keys.');
  hasErrors = true;
}

// 2. Validate projects.json
if (!fs.existsSync(projectsJsonPath)) {
  console.error('❌ Error: src/content/projects.json not found!');
  process.exit(1);
}

const projects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'));

if (!Array.isArray(projects) || projects.length === 0) {
  console.error('❌ Error: projects.json must be a non-empty array.');
  hasErrors = true;
}

const definedTags = new Set();
siteData.capabilities.forEach((discipline) => {
  discipline.items.forEach((item) => definedTags.add(item.tag));
});

const seenSlugs = new Set();
const seenOrders = new Set();

projects.forEach((proj, idx) => {
  if (!proj.id || !proj.slug || !proj.title) {
    console.error(`❌ Error in project #${idx}: Missing id, slug, or title.`);
    hasErrors = true;
  }

  if (seenSlugs.has(proj.slug)) {
    console.error(`❌ Error: Duplicate project slug "${proj.slug}".`);
    hasErrors = true;
  }
  seenSlugs.add(proj.slug);

  if (seenOrders.has(proj.order)) {
    console.error(`❌ Error: Duplicate project order "${proj.order}".`);
    hasErrors = true;
  }
  seenOrders.add(proj.order);

  // Check capability tags
  if (Array.isArray(proj.capabilities)) {
    proj.capabilities.forEach((tag) => {
      if (!definedTags.has(tag)) {
        console.warn(`⚠️ Warning: Project "${proj.slug}" references tag "${tag}" which is not defined in site.json.`);
        hasWarnings = true;
      }
    });
  }

  // Check required images
  if (!proj.images?.thumbnail?.src || !proj.images?.hero?.src) {
    console.error(`❌ Error in project "${proj.slug}": Missing thumbnail or hero image.`);
    hasErrors = true;
  }
});

if (hasErrors) {
  console.error('\n❌ Content validation failed with errors.');
  process.exit(1);
} else {
  console.log('✅ Content validation passed successfully.');
  if (hasWarnings) {
    console.log('ℹ️ Warnings were reported above.');
  }
}
