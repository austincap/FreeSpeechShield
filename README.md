# Free Speech Shield
Like the Newsguard web extension but for Free Speech

# Intro

This extension is meant to provide users with comprehensive at-a-glance data on the limits online communities put on speech. It's often pointed out that the first amendment only refers to state-enforced limitations on free speech. Corporations are allowed to do whatever they want with their website and there's nothing you can do about it except make your own. This is reasonable. After all, unlike "the public square" there is literally infinite server space for your shitposts. Unfortunately, as we saw with Parler this tends to result in a community that merely censors different things.

But what if instead of using poor reasoning or legal coercion to hold these companies accountable, we simply gave them a Better Business Bureau -esque rating? We use these metrics to audit free speech and assign each a point value that's summed and normalized to get the overall score:

* the free speech index of the country whose laws the server is beholden to [0-5]
* internal procedure transparency (open source recommendation algorithms, investor disclousure, etc) [0-5]
* the number of explicitly banned words or concepts (typically found in the rules section, "community guidelines", or equivalent) [0-?]
* the number of user generated free speech violation reports [0-?]
* whether moderators are aggressive [0,4]
* whether moderators permaban users expressing legal speech [0,8]
* whether moderators delete legal speech [0-2]
* whether moderators shadowban [0-2]
* whether you can post anonymously [0-3]
* whether the rules regarding speech are vague [0,6]
* ideological flavor of moderation, what speech is likely to get you censored
* suspected motive for censorship
* whether it's predominantly a content aggregator, media platform, forum, chat client, or search engine
* number and list of alternative similar services [0-10]


We also specify how frequently which category of information the moderators censor utilizing the following categories:

* vulgar information
* advanced porn
* criminal information
* quasicriminal information
* political information
* scientific information

It's important to note that we do NOT make a distinction between which ideological flavor or the veracity of the censored information. All we care about is whether or not otherwise legal information is censored. The rationale is that a site shouldn't get an average score if they heavily censor only one type of political view. It's not really free speech if only a subset of speakers are free. 

For each category, a score representing the likelihood a post containing that category of information is censored is assigned and these scores make the shape of the radar chart. Let's look at each of these categories in more detail.

# Censorship categories

## vulgar information
This encompasses curse words and basic porn i.e. the less taboo NSFW content such as solo, gangbang, gay, trans, bdsm, incest, hentai, vanilla, forced, or miscegenation porn. Very suggestive clothed pictures, such as what men fap to on facebook or instagram are also included here. Note that, despite the legislation in repressed nations like Canada and Australia, loli hentai and small tit porn is NOT counted as pedophilia for our purposes. It's not like those shitholes even have free speech anyway.

## advanced porn
This is the stuff that's even banned from most porn sites such as pedophilia, bestiality, scat, mutilation, necrophilia, or snuff. While plenty of people genuinely enjoy this stuff, it's found online for the purpose of harassing other users far more often than basic porn. Most sites that allow basic porn do not allow advanced porn, so it's justified having this separate category. 

## criminal
Many things are not protected by the first amendment to begin with, such as obscenity, fraud, child pornography, speech integral to illegal conduct, speech that incites imminent lawless action, speech that violates intellectual property law, true threats, and commercial speech such as advertising. To clarify the distinction between "criminal" and "advanced porn" regarding pedophilia, shota erotica or loli hentai would be advanced porn whereas explicit pictures or videos of naked children would be criminal information. Remember, hate speech is incontrovertibly NOT illegal. However, planning an insurrection on facebook or a riot on twitter would both be regarded as allowing criminal information. Lazy moderation is a factor with every category and its weighted slightly more with regards to criminal information.

## quasicriminal
This includes technically legal, albeit malicious, information like what is posted during doxxing, spamming, whistleblowing, or targeted harassment. Because "harassment" is often misleadingly cited by the perpetrator as the reason for censoring the victim, there will be an additional section of the report describing the harassment claims in detail any time this is an issue. Censoring a single low effort racist shitpost would count as the censorship of scientific or political information, while censorship of someone spamming that same shitpost again and again would count as censorship of quasicriminal information because its more about preventing spam than preventing wrongthink.

## scientific
This is censorship of information regarding the nature of the natural universe. To reiterate, we do not make any judgement to the veracity of claim, so censorship of flat Earth theory, anti-vaccination, global warming theory, free energy technology, the existence of god, the existence of aliens, etc would all count. This includes any scientific claim about a political issue such as transexual biology, whereas transexual *rights* would be considered "political". Auditing science journals or organizations is outside of our scope because we only care about how free speech is restricted in online communities.

## political
This is censorship of information about the political world and is mainly done to propagate some narrative. This includes any claim about the political process, opinions on hot-button political issues, rumors about politicians, facts about politicians, conspiracy theories, or leaked documents like the Panama Papers. Everything a politician says is not necessarily political. If an online community is censoring based on your political *identity*, we only count that as a violation if you first stated your political beliefs (which constitute your political identity). Being "fact-checked" on twitter would lower their score because they put an additional step between you and the information. Being fact-checked on youtube would NOT lower their score because they don't make you wait before consuming the fact-checked content. Supressing information about historical events falls under this category.


# Censorship motives

Not all censorship is created equal. Censoring a political scandal to help get a politician elected is more sinister than censoring a politician cause he said discord mods are gay. Whatever justification the perpetrator explicitly provides for censoring will be noted, but ultimately it will be up to the auditors to make this call. Censorship categories describe what is likely censored, censorship motives are our best guess as to why. Unlike censorship categories, these are all binary.

## Financial

As far as our auditors can tell, the censorship is occuring mainly to keep advertisers. This will require ample financial proof because this is often used as an excuse for ideological censorship.

## Ideological

The censorship is costing users, creating bad press, and more, yet it persists. This will require evidence that the moderators or CEOs have strong ideological views. This is usually available in news stories or tweets. Twitter's "misgendering" policy would fall under this, but so would their banning of bible verses. 

## Personal

The moderators are simply on a power trip and banning people who question them. This will require evidence the moderators don't focus on ideology much and are fairly indiscriminate in what they censor.

This begs the question: is there ever a case where political or scientific information being censored ISN'T ideologically motivated? Probably not, however criminal or quasicriminal information is often not censored for ideological reasons.



# Rubric

Criteria 	Excellent (3 points) 	Good (2 points) 	Poor (1 point)

Number of sources
	

Historical accuracy
	

Organization
	

Can easily tell from which sources information was drawn
	

Can tell with difficulty from where information came
	

Cannot tell from which source information came

Bibliography
	

All relevant bibliographic information is included
	

Bibliography contains most relevant information
	

Bibliography contains very little information


# User submissions

Users can submit a report to increase the violation count a given online community has as well as suggest we audit a new site. The latter option puts a new url in the queue for us to audit which will take anywhere from 1 to 6 months. While users don't make accounts, you can type in your email before you suggest a site to be notified when the audit is complete. This system is also used to request new audits on sites already in our database. Users are asked to provide details on the post itself, relevant context, and the official reason given by the censor if applicable.

These will be available for anyone to view along with our classification of the specific infraction. Over time user reports can significantly impact the rating we give to the website as a whole.


# Binary information

In the interest of objectivity we try to utilize as many useful binary metrics as possible. For example, this means that even if only one user was shadowbanned, the perpetrator will be recorded as a site that shadowbans. 

# FAQ

## Why do we not care about the veracity of censored information?

It's too easy to use semantics to make anything technically true or false. Snopes and Politfact do a great job of demonstrating this. Most importantly its not relevant to free speech.The speech of poorly informed people is protected by the first amendment. If the victim in question later learns theyre mistaken, they typically have the ability to remove or edit their post. Doing it without their consent is censorship.

## Why do we not care about the dangers certain information could pose if not censored?

"Reducing harm" is the most common excuse given for censorship. Unfortunately, this is too subjective to be useful for anything other than an excuse. To people with mental disorders, referring to them by certain pronouns is harmful. To powerful politicians, bringing up their past is harmful. To me, any sort of censorship is harmful. We fully understand that the pen is mightier than the gun and we already have limitations on those. Still, all we're doing here is assigning websites the equivalent of the Gifford's State Gun Law Scorecard or the NRA's Senator Ratings, allowing the users of these websites to make more informed decisions.

## Why do you care about censorship but not blatant discrimination?

There is a right to freedom of association but really thats a separate issue from censorship anyway. Being banned from a female safespace because you are trans isn't something we care about, but being banned in a female safespace for *stating your belief* that the holocaust didn't happen would be counted as a free speech violation. A "niggers only" site would have a high free speech score if the users were allowed to discuss whatever they want, but not if they censored controversial racial statistics. Part of the rationale behind defocusing on discrimination is the fact that it's just so easy to lie. If you want to join a discord server that has the rule "manlets fuck off" and you're 3'2" all you have to do is never bring up your height. On the internet, nobody knows you're a dog.

