#!/usr/bin/env node

/** Validate marketplace, plugin, agent and documentation consistency. */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const names = new Map();
const skillDocuments = [];
let totalAgents = 0;
let totalSkills = 0;

function check(condition, message) {
  if (!condition) errors.push(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`Invalid JSON ${path.relative(ROOT, file)}: ${error.message}`);
    return null;
  }
}

function frontmatter(file) {
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    errors.push(`Missing frontmatter: ${path.relative(ROOT, file)}`);
    return { fields: new Map(), content };
  }

  const fields = new Map();
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z][A-Za-z0-9]*)\s*:\s*(.*)$/);
    if (field) fields.set(field[1], field[2].trim());
  }
  return { fields, content };
}

const marketplacePath = path.join(ROOT, 'marketplace.json');
const marketplace = readJson(marketplacePath);
const mainReadmePath = path.join(ROOT, 'README.md');
const mainReadme = fs.readFileSync(mainReadmePath, 'utf8');

if (!marketplace || !Array.isArray(marketplace.plugins)) {
  errors.push('marketplace.json must contain a plugins array');
} else {
  const expectedCategories = fs.readdirSync(path.join(ROOT, 'categories'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  check(marketplace.plugins.length === expectedCategories.length, 'Marketplace plugin count must match category count');

  for (const entry of marketplace.plugins) {
    const pluginRoot = path.resolve(ROOT, entry.source || '');
    const relativeRoot = path.relative(ROOT, pluginRoot);
    check(relativeRoot && !relativeRoot.startsWith('..') && !path.isAbsolute(relativeRoot), `Plugin source escapes repository: ${entry.name}`);

    const manifestPath = path.join(pluginRoot, '.zcode-plugin', 'plugin.json');
    const manifest = readJson(manifestPath);
    if (!manifest) continue;

    check(manifest.name === entry.name, `Plugin name mismatch: ${entry.name}`);
    check(manifest.version === entry.version, `Plugin version mismatch: ${entry.name}`);
    check(manifest.agents === 'agents', `${entry.name} must declare agents as the agents directory`);

    const skillNames = new Set();
    const usedSkills = new Set();
    if (manifest.skills !== undefined) {
      check(manifest.skills === 'skills', `${entry.name} must declare skills as the skills directory`);
      const skillsDir = path.join(pluginRoot, 'skills');
      check(fs.existsSync(skillsDir) && fs.statSync(skillsDir).isDirectory(), `Missing skills directory: ${entry.name}`);
      if (fs.existsSync(skillsDir)) {
        for (const item of fs.readdirSync(skillsDir, { withFileTypes: true })) {
          if (!item.isDirectory()) continue;
          const skillPath = path.join(skillsDir, item.name, 'SKILL.md');
          check(fs.existsSync(skillPath), `Missing SKILL.md: ${entry.name}/${item.name}`);
          if (!fs.existsSync(skillPath)) continue;
          totalSkills += 1;
          skillDocuments.push(skillPath);
          const { fields } = frontmatter(skillPath);
          const skillName = fields.get('name');
          check(skillName === item.name, `Skill name must match directory: ${entry.name}/${item.name}`);
          check(Boolean(fields.get('description')), `Missing skill description: ${entry.name}/${item.name}`);
          check(!skillNames.has(skillName), `Duplicate skill ${skillName} in ${entry.name}`);
          if (skillName) skillNames.add(skillName);
        }
      }
    }

    const agentsDir = path.join(pluginRoot, 'agents');
    check(fs.existsSync(agentsDir) && fs.statSync(agentsDir).isDirectory(), `Missing agents directory: ${entry.name}`);
    if (!fs.existsSync(agentsDir)) continue;

    const files = fs.readdirSync(agentsDir, { withFileTypes: true })
      .filter((item) => item.isFile() && item.name.endsWith('.md'))
      .map((item) => item.name)
      .sort();
    check(files.length > 0, `Plugin has no agents: ${entry.name}`);

    const category = path.basename(pluginRoot);
    const categoryReadmePath = path.join(pluginRoot, 'README.md');
    const categoryReadme = fs.readFileSync(categoryReadmePath, 'utf8');
    const legacyAgents = fs.readdirSync(pluginRoot, { withFileTypes: true })
      .filter((item) => item.isFile() && item.name.endsWith('.md') && !['readme.md', 'notice.md'].includes(item.name.toLowerCase()));
    check(legacyAgents.length === 0, `Legacy root-level agents remain in ${category}`);

    for (const file of files) {
      totalAgents += 1;
      const agentPath = path.join(agentsDir, file);
      const relative = path.relative(ROOT, agentPath).replace(/\\/g, '/');
      const { fields } = frontmatter(agentPath);
      const expectedName = file.slice(0, -3);
      const name = fields.get('name');

      check(name === expectedName, `Agent name must match filename: ${relative}`);
      check(Boolean(fields.get('description')), `Missing description: ${relative}`);
      check(fields.get('mode') === 'subagent', `mode must be subagent: ${relative}`);
      check(Boolean(fields.get('tools')), `Missing tools: ${relative}`);
      check(!['sonnet', 'opus', 'haiku', 'fable'].includes(fields.get('model')), `Claude model alias remains in ${relative}`);

      const declaredSkills = fields.get('skills');
      if (declaredSkills) {
        const skillRefs = declaredSkills.replace(/^\[/, '').replace(/\]$/, '').split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
        for (const skillRef of skillRefs) {
          check(skillNames.has(skillRef), `Agent ${relative} references unavailable skill ${skillRef}`);
          usedSkills.add(skillRef);
        }
      }

      if (name) {
        check(!names.has(name), `Duplicate agent name ${name}: ${relative} and ${names.get(name)}`);
        names.set(name, relative);
      }

      const mainLink = `categories/${category}/agents/${file}`;
      const mainLinkCount = mainReadme.split(`](${mainLink})`).length - 1;
      check(mainLinkCount === 1, `Main README must link ${mainLink} exactly once`);
      check(categoryReadme.includes(`](agents/${file})`), `Category README missing agents/${file} for ${category}`);
    }

    for (const skillName of skillNames) {
      check(usedSkills.has(skillName), `Skill ${skillName} is not referenced by any agent in ${entry.name}`);
    }
  }
}

const documents = [mainReadmePath, ...skillDocuments, ...(marketplace?.plugins || []).map((entry) => path.join(ROOT, entry.source, 'README.md'))];
for (const document of documents) {
  const content = fs.readFileSync(document, 'utf8');
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const link = match[1].split('#')[0];
    if (!link.endsWith('.md') || /^[a-z]+:\/\//i.test(link)) continue;
    const target = path.resolve(path.dirname(document), link);
    check(fs.existsSync(target), `Broken Markdown link in ${path.relative(ROOT, document)}: ${link}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR ${error}`);
  console.error(`\nValidation failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`Validated ${totalAgents} agents and ${totalSkills} skills across ${marketplace.plugins.length} plugins; manifests, frontmatter, names, skill references and Markdown links are consistent.`);
