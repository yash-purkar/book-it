// INFO: This file set up the cloudinary.

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAMED,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// This function will upload a new file
const upload_file = async (
  file: string,
  folder: string
): Promise<{ public_id: string; url: string }> => {
  return cloudinary.v2.uploader.upload(
    file,
    {
      resource_type: "auto",
      folder,
    },

    (error, result) => {
      return {
        public_id: result?.public_id,
        url: result?.url,
      };
    }
  );
};

// This function will delete the file
const delete_file = async (file: string): Promise<boolean> => {
  const res = await cloudinary.v2.uploader.destroy(file);
  if (res.result === "ok") {
    return true;
  }
  return false;
};

export {upload_file,delete_file};