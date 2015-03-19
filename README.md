# tcpbin(1): TCP Request & Response Service
Created and maintained by [Mashape](https://www.mashape.com)

# FEATURES

Feature  | Description
------------- | -------------
echo  | Echoes any request sent to **54.175.103.105:4444**
info  | Content Cell Get request info at **54.175.103.105:5555**

# DESCRIPTION

This project has been started to help testing TCP requests in a very easy way. It is very useful for seeing what your clients are sending to TCP servers and debug problems. It can also be used for mock integration tests.

# EXAMPLES

## $ echo "Text to send" | ncat 54.175.103.105 4444

```
Text to send
```

## $ echo "Get some info" | ncat 54.175.103.105 5555

```json
{
  "client-ip": "127.0.0.1",
  "data": [71,101,116,32,115,111,109,101,32,105,110,102,111,10],
  "text-data": "Get some info\n",
  "size": 14
}
```

# AUTHOR

A [Mashape](https://www.mashape.com) project.

# SEE ALSO

[Mockbin.com](https://www.mockbin.com/) - Mock, Test & Track HTTP calls

[Apiembed.com](https://www.apiembed.com/) - Embeddable API Code snippets

[Mashape.com](https://www.mashape.com/) - Largest API Marketplace And Powerful Tools For Private And Public APIs
