function buildGraph(jsonData) {
  const graph = {};

  for (const instr in jsonData) {
    let exts = jsonData[instr].extension || [];
    if (!Array.isArray(exts)) exts = [exts];

    for (let i = 0; i < exts.length; i++) {
      for (let j = i + 1; j < exts.length; j++) {
        const a = exts[i].toLowerCase();
        const b = exts[j].toLowerCase();

        graph[a] = graph[a] || new Set();
        graph[b] = graph[b] || new Set();

        graph[a].add(b);
        graph[b].add(a);
      }
    }
  }

  return graph;
}

module.exports = { buildGraph };
