// Vercel Edge Middleware: Dynamic Subdomain-to-Folder Router
export default function middleware(req) {
  const url = new URL(req.url);
  const hostname = req.headers.get('host') || '';

  // Remove main domains to extract the subdomain slug
  const subdomain = hostname
    .replace('.luaws.pl', '')
    .replace('.smagiel.pl', '')
    .replace('.vercel.app', '')
    .replace('www.', '')
    .trim();

  // If there is a valid subdomain, rewrite the request path to point into the slug subfolder
  if (subdomain && subdomain !== 'localhost:3000' && subdomain !== 'localhost:5000') {
    url.pathname = `/${subdomain}${url.pathname}`;
    return Response.redirect(url); // Or use Vercel's rewrite headers
  }
}
