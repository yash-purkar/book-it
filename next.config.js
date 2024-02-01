/** @type {import('next').NextConfig}
 * DB_LOCAL_URI - Default port for mongodb to run locally.
 */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/book-it",
    DB_URI: " ",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "Heyy, I wanna join flipkart without dsa",
  },
  images: {
    remotePatterns: [{
      hostname:"res.cloudinary.com",
    }],
  },
};
module.exports = nextConfig;
