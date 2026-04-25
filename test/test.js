const assert = require("assert");
const {
  extractJsonExtensions,
  extractExtensionSet,
  compareExtensions,
  buildGraph,
} = require("../src/parser");

// ---------- MOCK DATA ----------
const sample = {
  ADD: { extension: ["I"] },
  MUL: { extension: ["M"] },
  TEST: { extension: ["I", "M"] },
};

// ---------- Tier 1 Tests ----------
const { extensionGroups, multiExtensionInstr } = extractJsonExtensions(sample);

assert(extensionGroups["i"].includes("ADD"));
assert(extensionGroups["m"].includes("MUL"));
assert(multiExtensionInstr.includes("TEST"));

// ---------- Set Extraction ----------
const jsonSet = extractExtensionSet(sample);
assert(jsonSet.has("i"));
assert(jsonSet.has("m"));

// ---------- Tier 2 Comparison ----------
const manualSet = new Set(["i", "f"]);

const result = compareExtensions(jsonSet, manualSet);

assert(result.matched.includes("i"));
assert(result.jsonOnly.includes("m"));
assert(result.manualOnly.includes("f"));

// ---------- Graph Test ----------
const graph = buildGraph(sample);

assert(graph["i"].has("m"));
assert(graph["m"].has("i"));

console.log("All tests passed");
