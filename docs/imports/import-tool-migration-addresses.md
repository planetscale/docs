---
title: 'Import tool public IP addresses'
subtitle: 'List of the IP addresses you must allow when importing a database using the Import tool'
date: '2023-05-26'
internal: 'IPs are pulled from https://github.com/planetscale/ps-turtle/blob/main/psturtle_data.go'
---

When importing a database using our [Import tool](/docs/imports/database-imports), you need to grant a set of IP addresses access to your MySQL database so that PlanetScale can make the connection.

The set of IP addresses that you should use depends on the region of the [PlanetScale branch](/docs/concepts/branching) that you're importing to. You can find this under the "Region" field in the "New database" section of the Import tool.

{% callout %}
This IP reference guide is meant to be used in combination with our
[Database Import guide](/docs/imports/database-imports) or one of our platform-specific guides under
"Migration guides" in the left nav.
{% /callout %}

![The New database section of the Import database tool.](/assets/docs/imports/import-tool-migration-addresses/region.png)

{% table %}

- Region
- IP Addresses

---

- **AWS ap-northeast-1 (Tokyo)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  3.115.153.48

  35.75.255.19

  52.68.124.171

---

- **AWS ap-south-1 (Mumbai)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  3.109.16.127

  3.6.202.71

  65.2.95.185

---

- **AWS ap-southeast-2 (Sydney)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  3.24.39.244

  54.252.39.42

  54.253.218.226

---

- **AWS eu-central-1 (Frankfurt)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  18.192.192.69

  3.125.180.68

  52.58.166.27

  18.184.151.60

  3.124.172.21

  3.68.245.99

---

- **AWS eu-west-1 (Dublin)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  34.254.7.65

  54.170.203.135

  63.34.147.137

  52.208.200.175

  54.220.84.112

  54.77.173.187

---

- **AWS eu-west-2 (London)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  18.132.105.164

  3.10.132.119

  3.11.110.64

---

- **AWS sa-east-1 (Sao Paulo)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  52.67.181.44

  54.94.201.50

  54.94.231.88

---

- **AWS us-east-1 (Northern Virginia)**
- 3.209.149.66

  3.215.97.46

  23.23.187.137

  34.193.111.15

  34.200.24.255

  35.173.174.19

  35.174.68.24

  35.174.79.154

  44.199.177.24

  44.212.228.57

  44.216.88.45

  50.17.188.76

  52.2.251.189

  52.5.253.172

  52.6.141.108

  52.70.2.89

  52.72.234.74

  54.156.81.4

---

- **AWS us-east-2 (Ohio)**
- 3.131.243.164

  3.131.252.213

  3.132.168.252

  3.132.182.173

  3.15.49.114

  3.209.149.66

  3.215.97.46

  18.117.23.127

  34.193.111.15

---

- **AWS us-west-2 (Oregon)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  35.81.228.185

  52.35.206.238

  54.70.167.41

---

- **GCP us-central1 (Council Bluffs, Iowa)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  34.171.148.176

  35.193.174.51

---

- **GCP us-east4 (Ashburn, Virginia)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  34.150.215.97

  35.221.28.36

---

- **GCP northamerica-northeast1 (Montréal, Québec)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  34.152.35.20

  34.95.20.47

---

- **GCP asia-northeast3 (Seoul, South Korea)**
- 3.209.149.66

  3.215.97.46

  34.193.111.15

  34.64.142.10

  34.64.61.54

{% /table %}
