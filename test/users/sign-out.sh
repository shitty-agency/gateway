#
# sign-out.sh
# sign out any user
#

curl -H 'Content-Type: application/graphql' -X POST \
  'https://api.onchange.fyi/graphql' \
  -d 'mutation {
        signOut {
            id
        }
    }'

echo
