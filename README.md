# @onchange.fyi/gateway

### What is it?
<details>
  <summary>
    tl;dr: Service that handles all frontend interactions
  </summary>
  <br />

  End goal will hopefully be something like the following:
  1. Receive `/put` with `{ targetId }`
  2. Fetch all users watching this `{ targetId }`
  3. Fetch url for diff snapshot of this change
  4. Compose and send email to every user in the list

</details>
<br/>

### How to use it?
<details>
  <summary>
    tl;dr: <code>unexposed to the outside world</code>
  </summary>
  <br />

### INSTANTIATE THE USERS TABLE
```
aws dynamodb create-table --table-name users \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --query TableDescription.TableArn --output json
```

</details>
<br/>

### TODO:
<details>
<summary>tl;dr: <strong>Some</strong></summary>
<br />

### Users:
3. Investigate how to pass token through header context
4. Put deleteUser behind `token-powered context wall™`
5. Add update method behind `token-powered context wall™`

### Targets:
1. Instantiate target DB
2. Create endpoint for creating a target behind the `token-powered context wall™`
3. Reduce availability # by 1 when creating target
4. Block target creation when user availability # is 0
5. Assign targetId to user targetIDs on creation as well

### Generic:
1. Better tests, commenting and uncommenting in a real-world DB isn't testing
2. Better docs

</details>
<br/>
