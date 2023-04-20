const uploadToFirestorage = async (bucket, fileBuffer, remotePath) => {
  try {
    const file = bucket.file(remotePath);

    file
      .createWriteStream()
      .on("error", (err) => {
        console.error("Error uploading file:", err);
      })
      .end(fileBuffer);

    const url = await file.getSignedUrl({
      version: "v2",
      action: "read",
      expires: Date.now() + 60 * 60 * 100000000,
    });

    return { url };
  } catch (err) {
    return err;
  }
};

module.exports = { uploadToFirestorage };
