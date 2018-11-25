#
# add-user.sh
# Add 2 users
#

curl -H 'Content-Type: application/graphql' -X POST \
  'https://api.onchange.fyi/graphql' \
  -d 'mutation {
        createUser (email: "testemail@example.com", password: "Mary Lamb") {
            id
            email
            token
        }
    }'

echo
