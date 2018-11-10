#
# del_user.sh
#
if [ ! -n "$API_ID" ]; then
    echo "Missing API_ID."
    exit 1
fi

curl -H 'Content-Type: application/graphql' -X POST \
  'https://'${API_ID}'.execute-api.us-west-2.amazonaws.com/latest/graphql' \
  -d 'mutation {
        deleteUser (id:"3c8e49eb-e13f-411f-b7b4-1d10072aad8e") {
            id
        }
    }'
