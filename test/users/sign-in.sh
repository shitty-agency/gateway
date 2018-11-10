#
# sign-in.sh
# Sign in a dummy user
#
if [ ! -n "$API_ID" ]; then
    echo "Missing API_ID."
    exit 1
fi

curl -H 'Content-Type: application/graphql' -X POST \
  'https://'${API_ID}'.execute-api.us-west-2.amazonaws.com/latest/graphql' \
  -d 'mutation {
        signIn (email: "stringlestrongle@example.com", password: "Mary Lamb") {
            id
            email
            token
        }
    }'

echo
