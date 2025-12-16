export async function onRequestPost(context: any) {
  // Read incoming form data
  const formData = await context.request.formData();

  // Extract fields
  const submission = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    timestamp: new Date().toISOString(),
    ip: context.request.headers.get("CF-Connecting-IP"),
    userAgent: context.request.headers.get("User-Agent")
  };

  // Log to Cloudflare (viewable in dashboard)
  console.log("📩 New form submission:", submission);

  // Respond to client
  return new Response(
    JSON.stringify({
      success: true,
      received: submission
    }),
    {
      headers: {
        "Content-Type": "application/json"
      },
      status: 200
    }
  );
}
