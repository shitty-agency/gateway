#
# del_user.sh
#

curl -H 'Content-Type: application/graphql' -X POST \
  'https://api.onchange.fyi/graphql' \
  -d 'mutation {
        deleteUser (id:"ID") {
            id
        }
    }'
