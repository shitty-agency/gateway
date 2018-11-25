#
# get-a-user.sh
#

curl -H 'Content-Type: application/graphql' -X POST \
  'https://api.onchange.fyi/graphql' \
  -d '{
  checkToken (token: "TOKEN") {
     id
     email
  }
}'
