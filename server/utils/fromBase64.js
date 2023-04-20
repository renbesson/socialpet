////////////////////////////////////////////////////////////////////////////////
//  Receives a Base64 file and converts it to a Node.js Buffer
////////////////////////////////////////////////////////////////////////////////

const fromBase64 = (file, id) =>
  new Promise((resolve, reject) => {
    try {
      // Raw base64 File
      const fileBase64 = file;

      // Just the bytes without the metadata (needed to upload to firebase storage)
      const fileBytes = fileBase64.split(",")[1];

      // Creates a buffer with the fileBytes
      const fileBuffer = Buffer.from(fileBytes, "base64");

      // Gets only the file extension
      const fileExtension = fileBase64.split(";")[0].split("/")[1];

      // Sets the path for the file on the remote server
      const remotePath = `images/${id}.${fileExtension}`;

      resolve({ fileBuffer, remotePath });
    } catch (err) {
      reject(err);
    }
  });

module.exports = { fromBase64 };
