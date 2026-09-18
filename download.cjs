const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const srcDir = path.join(__dirname, 'src');
const destDir = path.join(__dirname, 'public', 'images', 'old_site');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { rejectUnauthorized: false, timeout: 5000 }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => reject(new Error(`Server responded with ${response.statusCode}: ${response.statusMessage}`)));
      }
    });

    req.on('error', (err) => {
      file.close();
      fs.unlink(dest, () => reject(err));
    });

    req.on('timeout', () => {
      req.destroy();
      file.close();
      fs.unlink(dest, () => reject(new Error('Timeout')));
    });
  });
}

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.json')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
}

async function run() {
  const files = walkSync(srcDir);
  const urlRegex = /https?:\/\/virendra\.achtunglabs\.co[^"'\s\)]+/g;
  
  // Track downloaded files to avoid re-downloading
  const downloaded = new Set();

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const matches = content.match(urlRegex);
    if (matches) {
      let modified = false;
      for (const url of [...new Set(matches)]) {
        const filename = path.basename(url);
        const localPath = `/images/old_site/${filename}`;
        const absoluteDest = path.join(destDir, filename);
        
        if (!downloaded.has(url)) {
          console.log(`Downloading ${url}...`);
          try {
            await download(url, absoluteDest);
            console.log(`Saved ${filename}`);
            downloaded.add(url);
          } catch (e) {
            console.error(`Failed to download ${url}: ${e.message}`);
          }
        }
        
        // Only replace if successfully downloaded or already downloaded
        if (downloaded.has(url)) {
          content = content.split(url).join(localPath);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

run().then(() => console.log('Done')).catch(console.error);
