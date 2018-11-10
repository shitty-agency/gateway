#!/bin/bash
#
# all.sh
# Run all GraphQL GRUD tests.
#
cd $(dirname $0)

API_ID=$(node -e 'console.log(require("../claudia.json").api.id)')
export API_ID

echo; echo "-------- add 1 user"
./create.sh

echo; echo "-------- get a user with userid ID"
./get.sh

# echo; echo "-------- delete a user with userid ID"
# ./delete.sh

# echo; echo "-------- get user info when passed valid token"
# ./check-token.sh

# echo; echo "-------- sign out any user"
# ./sign-out.sh

# echo; echo "-------- sign in a user with valid details"
# ./sign-in.sh

# echo; echo
