const fs = require("fs");
const path = require("path");

const { extractJsonExtensions, extractExtensionSet } = require("./parser");
const { scanManualExtensions } = require("./scanner");
const { compareExtensions } = require("./comparator");
const { buildGraph } = require("./graph");

const BASE_DIR = __dirname;
const JSON_PATH = path.join(BASE_DIR, "..", "instr_dict.json");
const SRC_DIR = path.join(BASE_DIR, "..", "riscv-isa-manual", "src");

function main() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error("instr_dict.json not found");
    process.exit(1);
  }

  const jsonData = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

  // Tier 1
  const { extensionGroups, multiExtensionInstr } =
    extractJsonExtensions(jsonData);

  console.log("\n=== Extension Summary ===\n");

  for (const ext in extensionGroups) {
    const instrs = extensionGroups[ext];
    console.log(`${ext} | ${instrs.length} instructions | e.g. ${instrs[0]}`);
  }

  console.log("\n=== Multi-extension Instructions ===");
  multiExtensionInstr.forEach((i) => console.log(i));

  // Tier 2
  const jsonSet = extractExtensionSet(jsonData);
  const manualSet = scanManualExtensions(SRC_DIR);

  const result = compareExtensions(jsonSet, manualSet);

  console.log("\n=== CROSS REFERENCE REPORT ===\n");
  console.log(`${result.matched.length} matched`);
  console.log(`${result.jsonOnly.length} in JSON only`);
  console.log(`${result.manualOnly.length} in manual only`);

  // Graph
  const graph = buildGraph(jsonData);

  console.log("\n=== Extension Graph ===");
  for (const ext in graph) {
    console.log(ext + " -> " + [...graph[ext]].join(", "));
  }
}

main();
