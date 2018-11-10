#
# add-user.sh
# Add 2 users
#
if [ ! -n "$API_ID" ]; then
    echo "Missing API_ID."
    exit 1
fi

curl -H 'Content-Type: application/graphql' -X POST \
  'https://'${API_ID}'.execute-api.us-east-1.amazonaws.com/latest/graphql' \
  -d 'mutation {
        createUser (email: "4@example.com", password: "Mary Lamb") {
            id email password
        }
    }'

echo

curl -H 'Content-Type: application/graphql' -X POST \
  'https://'${API_ID}'.execute-api.us-east-1.amazonaws.com/latest/graphql' \
  -d 'mutation {
        createUser (email: "2@example.com", password: "John Doe") {
            id email password
        }
    }'
