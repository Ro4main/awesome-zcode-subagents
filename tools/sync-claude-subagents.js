#!/usr/bin/env node

/**
 * Report or import new agents from awesome-claude-code-subagents.
 * Existing ZCode agents are never overwritten and obsolete agents are never deleted.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const sourceIndex = args.indexOf('--source');
const SOURCE = sourceIndex >= 0 && args[sourceIndex + 1]
  ? path.resolve(args[sourceIndex + 1])
  : path.resolve(ROOT, '..', 'awesome-claude-code-subagents');

if (!fs.existsSync(SOURCE)) {
  console.error(`Upstream repository not found: ${SOURCE}`);
  process.exit(1);
}

function agentFiles(directory, nested) {
  const agentsDir = nested ? path.join(directory, 'agents') : directory;
  if (!fs.existsSync(agentsDir)) return [];
  return fs.readdirSync(agentsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md')
    .map((entry) => entry.name)
    .sort();
}

function adaptAgent(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error('Agent Markdown must start with YAML frontmatter');

  const lines = match[1].split(/\r?\n/);
  const output = [];
  let hasMode = lines.some((line) => /^mode\s*:/.test(line));

  for (const line of lines) {
    const model = line.match(/^model\s*:\s*(.*?)\s*$/);
    if (model && !['inherit', 'main'].includes(model[1])) continue;

    if (/^tools\s*:/.test(line) && !hasMode) {
      output.push('mode: subagent');
      hasMode = true;
    }
    output.push(line);
  }

  if (!hasMode) output.push('mode: subagent');
  return `---\n${output.join('\n')}\n---${content.slice(match[0].length)}`;
}

const summary = { added: 0, changed: 0, unchanged: 0, removed: 0, localCategories: 0 };
const categories = fs.readdirSync(path.join(ROOT, 'categories'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
  .map((entry) => entry.name)
  .sort();

for (const category of categories) {
  const upstreamDir = path.join(SOURCE, 'categories', category);
  const targetDir = path.join(ROOT, 'categories', category);
  if (!fs.existsSync(upstreamDir)) {
    summary.localCategories += 1;
    console.log(`LOCAL CATEGORY ${category} (preserved)`);
    continue;
  }

  const upstreamAgents = agentFiles(upstreamDir, false);
  const targetAgents = agentFiles(targetDir, true);
  const targetSet = new Set(targetAgents);

  for (const file of upstreamAgents) {
    const sourcePath = path.join(upstreamDir, file);
    const targetPath = path.join(targetDir, 'agents', file);
    const adapted = adaptAgent(fs.readFileSync(sourcePath, 'utf8'));

    if (!targetSet.has(file)) {
      summary.added += 1;
      console.log(`NEW       ${category}/${file}`);
      if (apply) fs.writeFileSync(targetPath, adapted, 'utf8');
      continue;
    }

    const current = fs.readFileSync(targetPath, 'utf8').replace(/\r\n/g, '\n');
    if (current === adapted.replace(/\r\n/g, '\n')) {
      summary.unchanged += 1;
    } else {
      summary.changed += 1;
      console.log(`CHANGED   ${category}/${file} (preserved)`);
    }
  }

  const upstreamSet = new Set(upstreamAgents);
  for (const file of targetAgents) {
    if (!upstreamSet.has(file)) {
      summary.removed += 1;
      console.log(`LOCAL ONLY ${category}/${file} (preserved)`);
    }
  }
}

console.log(`\n${apply ? 'Import' : 'Dry run'} complete: ${summary.added} new, ${summary.changed} changed, ${summary.unchanged} unchanged, ${summary.removed} local-only, ${summary.localCategories} local categories.`);
if (!apply && summary.added > 0) {
  console.log('Run with --apply to import only the new agents. Review README entries and plugin versions afterwards.');
}
