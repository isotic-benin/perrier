const fs = require('fs');
let content = fs.readFileSync('src/scripts/seed.ts', 'utf8');
content = content.replace(/marque:\s*('[^']*'|"[^"]*"|`[^`]*`),?/g, 'typeLivraison: "retrait",');
fs.writeFileSync('src/scripts/seed.ts', content);
console.log('Done replacing seed.ts');
