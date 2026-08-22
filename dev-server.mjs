import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const portAt = args.indexOf('--port');
const port = portAt >= 0 ? Number(args[portAt + 1]) : 4173;
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg'};

http.createServer(async (req,res) => {
  try {
    const requested = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.join(root, requested === '/' ? 'index.html' : requested);
    const info = await stat(file);
    if (info.isDirectory()) file = path.join(file,'index.html');
    const data = await readFile(file);
    res.writeHead(200, {'content-type': types[path.extname(file)] || 'application/octet-stream'});
    res.end(data);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
}).listen(port, '0.0.0.0');
