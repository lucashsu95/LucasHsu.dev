# ipaddress

輸入：192.168.10.65/255.255.255.224 
輸出：192.168.10.64 

```python
import ipaddress

ip_with_mask = input()
network = ipaddress.IPv4Network(ip_with_mask, strict=False)
print(network.network_address)
```