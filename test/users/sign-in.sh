#
# sign-in.sh
# Sign in a dummy user
#

curl -H 'Content-Type: application/graphql' -X POST \
  'https://api.onchange.fyi/graphql' \
  -d 'mutation {
        signIn (email: "stringlestrongle@example.com", password: "Mary Lamb") {
            id
            email
            token
        }
    }'

echo
