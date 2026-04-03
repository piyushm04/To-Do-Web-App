function findBestMatch(goalInput) {
  let bestMatch = null;
  let maxScore = 0;

  dataset.forEach(item => {
    item.keywords.forEach(keyword => {
      let score = similarity(goalInput, keyword);
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    });
  });

  return maxScore > 0.4 ? bestMatch : null;
}

// Simple similarity function
function similarity(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  let matches = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) matches++;
  }

  return matches / Math.max(a.length, b.length);
}
