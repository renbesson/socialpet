export default async function uploadAvatar(fileAsString, token) {
  try {
    const res = await fetch(`/api/pet/avatar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, fileAsString }),
    });
    const { url, message } = await res.json();

    if (!res.ok) return { message };
    if (res.status === 201) return { url, message };
  } catch (err) {
    return err;
  }
}
