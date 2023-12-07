---
title: 'Import tool public IP addresses'
subtitle: 'List of the IP addresses you must allow when importing a database using the Import tool'
date: '2023-12-05'
internal: 'IPs are pulled from https://github.com/planetscale/ps-turtle/blob/main/psturtle_data.go'
---

When importing a database using our [Import tool](/docs/imports/database-imports), you need to grant a set of IP addresses access to your MySQL database so that PlanetScale can make the connection.

The set of IP addresses that you should use depends on the region of the [PlanetScale branch](/docs/concepts/branching) that you're importing to. You can find this under the "Region" field in the "New database" section of the Import tool.

{% callout %}
This IP reference guide is meant to be used in combination with our
[Database Import guide](/docs/imports/database-imports) or one of our platform-specific guides under
"Migration guides" in the left nav.
{% /callout %}

![The New database section of the Import database tool. {priority}](/assets/docs/imports/import-tool-migration-addresses/region.png)

{% publicIpsTable / %}
