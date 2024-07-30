// Example of a logout endpoint in TypeScript
export async function POST(request: Request) {
  // Set the cookie to expire immediately
  const headers = new Headers({
    'Set-Cookie': `token=; HttpOnly; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`
  });

  return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
    status: 200,
    headers
  });
}
