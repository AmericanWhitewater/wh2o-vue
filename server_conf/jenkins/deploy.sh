set -e
branch=${1:-main}
git checkout $branch
git pull origin $branch
npm install
export NODE_OPTIONS=--max_old_space_size=4096 
npm run build
rm -rf /var/www/americanwhitewater.org/public/prev-vue-release
mv /var/www/americanwhitewater.org/public/static /var/www/americanwhitewater.org/public/prev-vue-release
mv dist /var/www/americanwhitewater.org/public/static
