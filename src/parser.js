function extractJsonExtensions(jsonData) {
  const extensionGroups = {};
  const multiExtensionInstr = [];

  for (const instr in jsonData) {
    let exts = jsonData[instr].extension || [];
    if (!Array.isArray(exts)) exts = [exts];

    exts.forEach((ext) => {
      ext = ext.toLowerCase();
      if (!extensionGroups[ext]) extensionGroups[ext] = [];
      extensionGroups[ext].push(instr);
    });

    if (exts.length > 1) {
      multiExtensionInstr.push(instr);
    }
  }

  return { extensionGroups, multiExtensionInstr };
}

function extractExtensionSet(jsonData) {
  const set = new Set();

  for (const instr in jsonData) {
    let exts = jsonData[instr].extension || [];
    if (!Array.isArray(exts)) exts = [exts];

    exts.forEach((e) => set.add(e.toLowerCase()));
  }

  return set;
}

module.exports = { extractJsonExtensions, extractExtensionSet };
