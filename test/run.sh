#!/bin/bash
#
# all.sh
# Run all GraphQL GRUD tests.
#
cd $(dirname $0)

API_ID=$(node -e 'console.log(require("../claudia.json").api.id)')
export API_ID

echo; echo "-------- add 1 user"
./create-user.sh

echo; echo "-------- get a user with userid 3c8e49eb-e13f-411f-b7b4-1d10072aad8e"
./get-a-user.sh

# echo; echo "-------- delete a user with userid 3c8e49eb-e13f-411f-b7b4-1d10072aad8e"
# ./del-user.sh

# echo; echo
