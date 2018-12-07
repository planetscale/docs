---
title: '1.67 Million QPS '
date: '2018-12-07T00:00:00-08:00'
description: 'Update from AWS re:Invent, 1.67 Million QPS demo''d live'
comments: true
share: true
---
While most Americans spent last week recovering from turkey comas and the inevitable post-Thanksgiving letdown, we headed to Las Vegas for AWS re:Invent. 

We attended many amazing talks at this conference, but we were especially excited for “Running a High-Performance Kubernetes Cluster with Amazon EKS”. And we weren’t the only ones—this talk drew so many attendees that the conference added five additional viewing rooms so everyone could watch it. 

Yekesa Kosuru, Managing Director at State Street Bank, demonstrated the power of using Vitess to scale a large transactional database. Kosuru gave an overview of State Street’s process for tackling the challenges of scaling their transactional database, which ultimately resulted in leveraging Vitess with RocksDB and Amazon EKS. 

Then with some help from the crowd who submitted real-time jobs, Kosuru set out to demonstrate that the system could now run 1 million queries per second without latency, but as the crowd watched, the QPS hit first 1.59 million QPS and then tipped over to **1.67 million QPS**. This is the highest QPS we’ve seen using Vitess and demonstrates how Vitess can scale to meet any QPS requirement given the appropriate resources. 

This example shows how Vitess can offer practical applications for handling complex financial and security databases without performance loss. 

You can watch the [full talk](https://www.youtube.com/watch?v=YQWt6wdAZMU&app=desktop) or review [the slides](https://www.slideshare.net/AmazonWebServices/running-a-highperformance-kubernetes-cluster-with-amazon-eks-con318r1-aws-reinvent-2018); we recommend it. As always, if you have any questions about scaling with Vitess, let us know.
