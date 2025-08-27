set -e
branch=${1:-main}
git checkout $branch
git pull origin $branch
npm install
export NODE_OPTIONS=--max_old_space_size=4096 

# do the Laravel build and deploy
npm run build
rm -rf /var/www/americanwhitewater.org/public/prev-vue-release
mv /var/www/americanwhitewater.org/public/static /var/www/americanwhitewater.org/public/prev-vue-release
mv dist /var/www/americanwhitewater.org/public/static

# now build in s3 mode for the modern build that bypasses Laravel
if [[ "$JENKINS_ENV" = "beta" ]]; then
  bucket="nwi-standalone-assets-beta"
  npm run builds3beta
else
  bucket="nwi-standalone-assets"
  npm run builds3prod
fi

aws s3 mv dist s3://$bucket/ --recursive