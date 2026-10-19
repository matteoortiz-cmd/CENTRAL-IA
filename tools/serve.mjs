import http from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await realpath(fileURLToPath(new URL('../dist/', import.meta.url)));
const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT precisa ser uma porta válida entre 1 e 65535.');
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.apk': 'application/vnd.android.package-archive',
  '.zip': 'application/zip'
};

const server = http.createServer(async (request, response) => {
  const reply = (status, message) => {
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(request.method === 'HEAD' ? undefined : message);
  };
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.setHeader('Allow', 'GET, HEAD');
    reply(405, 'Método não permitido.');
    return;
  }

  try {
    const url = new URL(request.url, 'http://127.0.0.1');
    const relative = decodeURIComponent(url.pathname);
    if (relative.includes('\0')) {
      reply(400, 'Endereço inválido.');
      return;
    }
    let file = path.resolve(root, '.' + relative);
    const insideRoot = value => value === root || value.startsWith(root + path.sep);
    if (!insideRoot(file)) {
      reply(403, 'Acesso não permitido.');
      return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    file = await realpath(file);
    if (!insideRoot(file)) {
      reply(403, 'Acesso não permitido.');
      return;
    }
    const content = await readFile(file);
    response.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': content.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    if (error instanceof URIError || error.code === 'ERR_INVALID_URL') {
      reply(400, 'Endereço inválido.');
    } else if (['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code)) {
      reply(404, 'Arquivo não encontrado.');
    } else {
      reply(500, 'Não foi possível abrir esse arquivo.');
    }
  }
});

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `A porta ${port} já está em uso. Feche o outro servidor ou escolha outra porta em PORT.`
    : `Não foi possível iniciar o servidor: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Central IA disponível em http://127.0.0.1:${port}`);
  console.log('Use Ctrl+C para encerrar.');
});
