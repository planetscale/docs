---
title: GopherCon Debrief: Sugu Sougoumarane
date: '2018-09-11T13:48:34+08:00'
description: >-
  Hear what the PlanetScale CTO has to say about his experience at GopherCon 2018.
comments: true
share: true
---
# Interviewer: Abhi Vaidyanatha, Software Engineer
# Interviewee: Sugu Sougoumarane, PlanetScale CTO

*Abhi: Hi Sugu, glad to have you here; today we're going to catch up on your experience at GopherCon 2018!*

Sugu: No problem, sounds good.

*Abhi: So how was your overall experience at GopherCon?*

Sugu: The overall experience was awesome - this was actually my first time attending. For some reason I missed the previous ones, but I will make it a point to attend all future GopherCons.

*Abhi: Great to hear. Which talk really stood out to you?*

Sugu: Definitely the keynote speech by Kavya Joshi. The Go scheduler is a very complex topic, but she simplified it to the point that someone who is not familiar with the go runtime could completely understand how it was designed. Papers that describe it are very complex and it's amazing that she was able to summarize it in just 20 minutes.

*Abhi: I'll make sure to go [watch it](https://www.youtube.com/watch?v=NjMGHrM2cc0)! So how did your talk go then?*

Sugu: My talk went surprisingly well. I did not expect a big audience because I thought writing a parser in Go is not something that would attract many people. However, many people attended and an unusually large number of people came and told me that they enjoyed my talk.

*Abhi: Where did you feel like you got the most traction with the audience? Did you enjoy it?*

Sugu: I can't pinpoint a specific part, but it was likely the fact that I simplied the topic to allow people with no formal compiler training to write one. And of course I enjoyed my talk, for myself. 

*Abhi: Makes sense. Moving on, what does the future of Go look like to you?*

Sugu: The future of go is looking bright. Its adoption has been growing over the years. At GopherCon, over two-thirds of the audience were brand new Go programmers.

*Abhi: Why do you think the language is picking up popularity?*

Sugu: There are a few reasons for why go is gaining this momentum. It mostly lies in concerns that it resolves that other languages don't really address. For example, it has a good balance between expressability and performance. Additionally, it has the ability to exploit modern hardware due to its concurrency patterns.

*Abhi: Interesting. But why is it specifically popular in the cloud software domain?*

Sugu: It actually got introduced right as the cloud industry was taking off, so a lot of the new software for the cloud was written in go. It is almost the de facto language for the cloud now.

*Abhi: What would you like to see Go implement in 2019?*

Sugu: The one area I've had trouble with is testing. When a system becomes very complex it is harder to write unit tests because of the deep dependencies that exist. Sometimes you are forced to introduce interfaces for mocking. If testing allowed you to mock without interfaces, the code would become more readable.

*Abhi: That gives me a good excuse for my unintelligible test files.*

Sugu: (No response)

*Abhi: So moving on, what are you working on right now?*

Sugu: As CTO of PlanetScale I have been making decisions for the PlanetScale Vitess deployment platform. But the majority of my time is spent supporting and growing the Vitess community.

*Abhi: How do you feel about dividing the time between the company and the open-source Vitess?*

Sugu: I wish I could multiply myself, but I try to balance the two to the extent possible. The higher priority is developing Vitess because Vitess growing automatically helps PlanetScale's growth.

*Abhi: Absolutely. So do we have anything to look forward to?*

Sugu: I am holding my breath on the PlanetScale SaaS product. It will allow peole to deploy a full cluster immediately! We're looking forward to releasing the beta soon. In terms of conferences, you will see me at AWS re:Invent 2018 and KubeCon Seattle.

*Abhi: Awesome! I'm definitely excited as well. Thanks for your time Sugu!*

Sugu: Of course, my pleasure.