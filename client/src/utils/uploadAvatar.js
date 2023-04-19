import toBase64 from "./toBase64";

export default async function uploadAvatar(image, token) {
  try {
    // Converts the file to base64
    const fileAsString = await toBase64(image);

    const res = await fetch(`/api/pet/avatar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, fileAsString }),
    });
    const { url, message } = await res.json();

    if (!res.ok) return message;
    if (res.status === 201) return url;
  } catch (err) {
    return err;
  }
}
