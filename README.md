# tcpbin(1): TCP/UDP Request & Response Service [![Build Status](https://travis-ci.org/Kong/tcpbin.svg)](https://travis-ci.org/Kong/tcpbin)

Created and maintained by [Kong](https://konghq.com)

# FEATURES

Feature  | Description
------------- | -------------
TCP echo  | Echoes any request sent to **54.175.103.105:30000**
TCP info  | Get request info at **54.175.103.105:30001**
UDP echo  | Echoes any request sent to **54.175.103.105:40000**
UDP info  | Get request info at **54.175.103.105:40001**

# DESCRIPTION

This project has been started to help testing TCP and UDP requests in a very easy way. It is very useful for seeing what your clients are sending to TCP/UDP servers and debug problems. It can also be used for mock integration tests.

# EXAMPLES

### $ echo "Text to send to TCP" | ncat 54.175.103.105 30000

```
Text to send to TCP
```

### $ echo "Get some TCP info" | ncat 54.175.103.105 30001

```json
{
  "client-ip": "::ffff:41.130.36.121",
  "data": [71,101,116,32,115,111,109,101,32,84,67,80,32,105,110,102,111,10],
  "text-data": "Get some TCP info\n",
  "size": 18
}
```

### $ echo -n "Text to send to UDP" | nc -4u -w1 54.175.103.105 40000

```
Text to send to UDP
```

### $ echo -n "Get some UDP info" | nc -4u -w1 54.175.103.105 40001

```json
{
  "client-ip": "::ffff:41.130.36.121",
  "data": [71,101,116,32,115,111,109,101,32,85,68,80,32,105,110,102,111],
  "text-data": "Get some UDP info",
  "size": 17
}
```

# AUTHOR

A [Kong](https://konghq.com) project.

# SEE ALSO

[Mockbin.com](https://www.mockbin.com/) - Mock, Test & Track HTTP calls

[Apiembed.com](https://www.apiembed.com/) - Embeddable API Code snippets

[Konghq.com](https://konghq.com/) - The Cloud-Native API Gateway & Service Mesh
