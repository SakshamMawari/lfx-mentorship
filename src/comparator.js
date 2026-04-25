function compareExtensions(jsonSet, manualSet) {
  const matched = [];
  const jsonOnly = [];
  const manualOnly = [];

  jsonSet.forEach((ext) => {
    if (manualSet.has(ext)) matched.push(ext);
    else jsonOnly.push(ext);
  });

  manualSet.forEach((ext) => {
    if (!jsonSet.has(ext)) manualOnly.push(ext);
  });

  return { matched, jsonOnly, manualOnly };
}

module.exports = { compareExtensions };
