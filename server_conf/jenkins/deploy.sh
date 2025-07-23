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

# now build in modern non-Laravel mode for S3 hosting
export VUE_APP_LARAVEL_DEPLOY=
npm run build
# this is set in the Jenkins job when the script is run
if [ "$JENKINS_ENV" == "beta"]; then
  bucket="nwi-standalone-assets-beta"
else
  bucket="nwi-standalone-assets"
fi

aws s3 cp dist s3://$bucket/ --recursive