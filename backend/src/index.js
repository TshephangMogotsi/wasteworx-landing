export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (request.method === 'GET' && pathname === '/api/health') {
      return Response.json({ status: 'ok', service: 'wasteworx-api' }, {
        headers: { 'Cache-Control': 'no-store' }
      });
    }
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
};
