---
title: KubeCon Shanghai Trip Update
date: '2018-12-05T15:28:34-07:00'
description: >-
  November was a whirlwind month for us, the most exciting stop was our visit to KubeCon in Shanghai.
comments: true
share: true
author: 'Adrianna Tan'
---

November involved a ton of travel for us here at PlanetScale, including an exciting stop in Shanghai for China’s KubeCon 2018. Our CEO, Jiten Vaidya, shared the stage with Mr Xin Lv, Senior Architect of the Technical Infrastructure Group at JD.com, in a talk that offered an introduction to Vitess and an overview of how JD.com has leveraged Vitess to scale their databases.

[JD.com](https://www.jd.com), for those of you who are not familiar, is China’s largest online and offline retailer (think Amazon) with more than 300 million active users. JD.com has the largest e-commerce logistics infrastructure in China, which makes the story of how they have used Vitess to scale their databases especially compelling. In fact, it represents the largest and most complex implementation of Vitess on Kubernetes to date.

To get a sense for the scale of this project, consider the fact that JD.com has 100s of terabytes of data stored in over 250 billion rows. As you can imagine, this could be a scalability nightmare. However, using Vitess, JD.com has organized its data into thousands of keyspaces across 8 datacenters with a total of almost 5000 shards. This organization of their data has allowed them to continue to grow at an expected rate of 10TB or 20 billion rows per week, without a loss in performance. (If you’re interested in more details, [the slides from the talk can be found here](https://schd.ws/hosted_files/kccncchina2018english/97/Shanghai%20Kubecon%20%281%29.pdf).)

![Jiten presenting at KubeCon Shanghai 2018](/img/201812-blog-kubeconshanghai.jpg)

We're also very proud to see that [JD.com was awarded the Top End User Award](https://www.cncf.io/announcement/2018/11/14/jd-wins-top-end-user-award/) by the Cloud Native Computing Foundation, at the same event. Their contributions to Vitess and other open source projects have been substantial.

It was great to have the opportunity to introduce Vitess, which is beginning to gain interest in China, with such a large-scale example. The talk generated many interesting topics and questions, and we were able to connect with lots of people at our booth throughout the conference.

Plus, we got to try out these tasty Shanghai specialties, including Dan's favorite, [_sheng jian bao_](http://www.smartshanghai.com/articles/activities/the-shanghai-shengjian-bao-informative-graph). Among others:

* Shanghai-style soup dumplings, _xiao long bao_ (小笼包: go eat at [our fave XLB restaurant](http://www.thatsmags.com/shanghai/directory/3838/lin-long-fang-special-dumplings) here!)
* Noodles tossed with scallions and oil, _cong you ban mian_ (葱油拌面), breakfast of champions in Shanghai
* Xinjiang-style _yang rou chuanr_
* Yunnan cuisine from the south of China

We also hosted the first ever Vitess meetup in China in Shanghai, with many thanks to our friends at [WeWork Shanghai](https://www.wework.com/l/shanghai--31) and [Qiniu.com](https://qiniu.com/en) for their help. We'll post another update on Vitess meetups shortly, as we've done quite a few of late.

We hope to see further adoption of Vitess in China and look forward to next year’s KubeCon China. If you're interested in joining the Vitess China WeChat group (in Mandarin), ping us on Twitter at [@vitessio](https://twitter.com/vitessio) or join our #vitess-in-china channel on [Vitess Slack](https://vitess.slack.com), and we'll dm you the QR code to join.
