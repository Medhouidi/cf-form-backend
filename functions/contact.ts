export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

export async function onRequestPost(context: any) {
  const formData = await context.request.formData();

  const submission = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    timestamp: new Date().toISOString(),
    ip: context.request.headers.get("CF-Connecting-IP"),
    userAgent: context.request.headers.get("User-Agent")
  };

  if (!submission.email || !submission.message) {
    return new Response("Invalid submission", { status: 400 });
  }

  console.log("New form submission:", submission);

  return new Response(
    JSON.stringify({ success: true }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}
