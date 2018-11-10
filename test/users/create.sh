#
# add-user.sh
# Add 2 users
#
if [ ! -n "$API_ID" ]; then
    echo "Missing API_ID."
    exit 1
fi

curl -H 'Content-Type: application/graphql' -X POST \
  'https://'${API_ID}'.execute-api.us-west-2.amazonaws.com/latest/graphql' \
  -d 'mutation {
        createUser (email: "binglebong@example.com", password: "Mary Lamb") {
            id
            email
            token
        }
    }'

echo
