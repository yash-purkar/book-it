/** @type {import('next').NextConfig} 
 * DB_LOCAL_URI - Default port for mongodb to run locally.
*/
const nextConfig = {
    env: {
        DB_LOCAL_URI : 'mongodb://127.0.0.1:27017/book-it',
        DB_URI : " "
    }
}
module.exports = nextConfig
