
# Endpoints

The following is a collection of available endpoints.


## Accident



### 1. Create


Create an accident report.


***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-accident
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |
| accidentdate |  |  |
| victimname |  |  |
| reachid |  |  |
| countryabbr |  |  |
| state |  |  |
| river |  |  |
| section |  |  |
| location |  |  |
| waterlevel |  |  |
| rellevel |  |  |
| difficulty |  |  |
| age |  |  |
| experience |  |  |
| privcomm |  |  |
| boattype |  |  |
| groupinfo |  |  |
| numvictims |  |  |
| othervictimnames |  |  |
| description |  |  |
| type |  |  |
| cause |  |  |
| contactname |  |  |
| contactphone |  |  |
| contactemail |  |  |
| status |  |  |



### 2. Delete


Delete an accident report.


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-accident
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 11139 |  |



### 3. Get By Key


Get single accident by id.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/accident
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 2 |  |



***More example Requests/Responses:***


##### I. Example Request: Accident



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 2 |  |



##### I. Example Response: Accident
```js
{
    "Accident": {
        "id": 2,
        "accidentdate": "1977-08-27",
        "victimname": "Robert A. Taylor",
        "reachid": 2378,
        "countryabbr": "US",
        "state": "WV",
        "river": "Gauley (7 ",
        "section": "7 (Upper). Summersville Dam to Mason Branch",
        "location": "Lost Paddle",
        "waterlevel": "3100",
        "rellevel": "M",
        "difficulty": "V",
        "age": 25,
        "experience": "X",
        "privcomm": "P",
        "boattype": "K",
        "groupinfo": "",
        "numvictims": 1,
        "othervictimnames": "",
        "description": "<p>\r\n\tBob Taylor was running the Upper Gauley with four friends on August 27, 1977. The level was 2700 from the dam, 400 from the Meadow River, Bob was in his late 20s, very fit, and quite familiar with the Gauley. He was probably the best paddler in West Virginia. In the third drop of Lost Paddle Bob elected to surf the holes. He got pummelled in the second, which is quite large. He flipped, rolled, endered, and rolled again. After his third flip he bailed out. He recirculated twice in the hole, then washed downstream. One other paddler attempted a boat rescue, but after holding on for a short time Bob let go of the boat and attempted to swim into a river left eddy. He was washed into a chute on the upper left side of Tumblehome Rapid where he disappeared. His companions coulds not find him that day, so they paddled out and reported the accident to authorites. The next day, with the river running at 2100 cfs, they returned with WVDNR Officers. After a lengthy search they spotted his body under several feet of water in the chute. They were able to pull a log out of the chute, which released the body.</p>\r\n<p>\r\n\thttp://www.americanwhitewater.org/content/Journal/show-page/issue/6/year/1977/page/193/</p>\r\n",
        "type": "F",
        "cause": 12,
        "contactname": null,
        "contactphone": null,
        "contactemail": null,
        "status": "R"
    }
}
```


***Status Code:*** 200

<br>



### 4. Update


See Create Accident for available fields.


***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-accident
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 11139 |  |



***Body:***



## Accident Causes



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-accident-cause
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| accident_id |  |  |
| cause_id |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-accident-cause
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| accident_id |  |  |



### 3. Get By Key


Get accident cause by accident id.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/accident-causes
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| accident_id | 16 |  |



***More example Requests/Responses:***


##### I. Example Request: Accident Cause



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| accident_id | 16 |  |



##### I. Example Response: Accident Cause
```js
[
    15,
    87
]
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-accident-cause
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| accident_id |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| cause_id |  |  |



## Accident Factors
Note: DB may be able to be restructured here. Use an array of factors instead of separate records.



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-accident-cause
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| accident_id |  |  |
| cause_id |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-accident-cause
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| accident_id |  |  |



### 3. Get By Key


Get accident cause by accident id.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/accident-factors
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| accident_id |  |  |



***More example Requests/Responses:***


##### I. Example Request: Accident Factors



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| accident_id | 49 |  |



##### I. Example Response: Accident Factors
```js
[
    31,
    35,
    43
]
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-accident-cause
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| accident_id |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| cause_id |  |  |



## Affiliate



### 1. By State


Query affiliates by state. Use state abbreviations: AL, AZ, AR...


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/affiliates-state
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| state |  |  |



### 2. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-affiliate
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| last |  |  |
| url |  |  |
| conemail |  |  |
| members |  |  |
| contact |  |  |
| abstract |  |  |
| description |  |  |
| reaches |  |  |
| volunteer |  |  |
| id |  |  |
| city |  |  |
| state |  |  |
| expiration |  |  |
| memberid |  |  |
| deleted |  |  |



### 3. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-accident
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 11139 |  |



### 4. Get All


Returns all AW affiliates.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/affiliates
```



***More example Requests/Responses:***


##### I. Example Request: Affiliates



##### I. Example Response: Affiliates
```js
[
    {
        "last": "Big Thompson Watershed Forum",
        "url": "http://www.btwatershed.org/",
        "conemail": "zshelley@btwatershed.org",
        "members": "0",
        "contact": "Zack Shelley",
        "abstract": "",
        "description": "",
        "reaches": "",
        "volunteer": "0",
        "id": "4008",
        "city": "Loveland",
        "state": "CO",
        "expiration": "2008-08-16",
        "memberid": "28872",
        "deleted": 1
    },
    {
        "last": "Keelhaulers Canoe Club",
        "url": "http://keelhauler.org/kh.htm",
        "conemail": "keelhauler@yahoo.com",
        "members": "300",
        "contact": "WebMeister and Membership Chair John Kobak",
        "abstract": "Paddling in OH, PA, WV, and wherever there's water!",
        "description": "<center><img src=\"http://keelhauler.org/newlogoweb.jpg\"></center><br>Centered in the Cleveland, OH, area, Keel-haulers is an active club with <a href=\"http://www.keelhauler.org/khcc/tripschedule.htm\">a full trip schedule</a>. Our 100-page yearbook contains a lot of info, including maps to local rivers and a self-consistent ranking of over a hundred international whitewater rivers. The club is open to all <a href=\"http://www.keelhauler.org/khcc/khcapp.htm\">(Print an Application)</a>; dues are $20/year.<br>\r\nThe club website has a very active <a href=\"http://www.keelhauler.org/khcc/khcads.htm\">Used Boats and Equipment</a> page and a <a href=\"http://keelhauler.org/phpBB/viewforum.php?f=2\">Message Board</a>.\r\n",
        "reaches": null,
        "volunteer": "358",
        "id": "713",
        "city": "Cleveland",
        "state": "OH",
        "expiration": "2019-05-24",
        "memberid": "706",
        "deleted": 0
    },
    {
        "last": "Warren Wilson College Paddling Club",
        "url": "",
        "conemail": "bfarthing@warren-wilson.edu",
        "members": "0",
        "contact": "Brit Farthing, 828-771-3004",
        "abstract": "",
        "description": "",
        "reaches": null,
        "volunteer": "0",
        "id": "1000004",
        "city": "Asheville",
        "state": "NC",
        "expiration": "2006-08-26",
        "memberid": "17832",
        "deleted": 1
    }    
]
```


***Status Code:*** 200

<br>



### 5. Get By Key


Returns a single AW affiliate.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/affiliate
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***More example Requests/Responses:***


##### I. Example Request: Affiliate



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 98 |  |



##### I. Example Response: Affiliate
```js
{
    "last": "Coastals Canoeists",
    "url": "http://coastals.org/",
    "conemail": "",
    "members": "375",
    "contact": "http://www.coastals.org/contact/contactform.php",
    "abstract": "Coastals are people who love the blueways of Virginia and beyond. Coastals are whitewater canoeists and kayakers, flat water recreational kayakers, rafters and those who paddle any other people-powered watercraft you can imagine.",
    "description": "Coastals is a family-oriented club dedicated to the enjoyment and advancement of paddlesports and consists of canoeists, kayakers and others from the southeastern U.S., but primarily from Virginia. Activities of the club include an active club volunteer-coordinated trip roster with trips for members, at all skill levels, happening nearly every weekend of the year.\r\n\r\nThe club holds quarterly meetings at various locations around Virginia featuring an evening meal, board of directors meeting, a trip on a nearby river, and a program of interest to paddlers. Coastals' website features an active forum for paddlers throughout the Commonwealth to communicate and discuss paddlesports.",
    "reaches": "",
    "volunteer": "654",
    "id": "98",
    "city": "Richmond",
    "state": "VA",
    "expiration": "2017-03-30",
    "memberid": "99",
    "deleted": 0
}
```


***Status Code:*** 200

<br>



### 6. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-affiliate
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***



## Affiliate Reach



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-affiliate-reach
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| reachid |  |  |
| affiliateid |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-affiliate-reach
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| affiliateid |  |  |
| reachid |  |  |



### 3. Get All By Key


Get all reaches associated with an AW affiliate by id.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/affiliate-reaches
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| affiliateid |  |  |



***More example Requests/Responses:***


##### I. Example Request: Affiliate Reaches



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| affiliateid | 1000011 |  |



##### I. Example Response: Affiliate Reaches
```js
[
    "1812",
    "1816",
    "1817",
    "1830",
    "2674",
    "2676",
    "2677",
    "2678",
    "2680",
    "2778",
    "4388",
    "4563",
    "4575"
]
```


***Status Code:*** 200

<br>



## Alert



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-alert
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| articleid | 34162 |  |
| type | rgnews |  |
| value | NW |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-alert
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 3. Get By Key



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/alert
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| articleid | 34161 |  |



***More example Requests/Responses:***


##### I. Example Request: Alert



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| articleid | 34161 |  |



##### I. Example Response: Alert
```js
{
    "articleid": "34161",
    "type": "rgnews",
    "value": "NW",
    "expiration": "2019-06-30",
    "priority": "0"
}
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-alert
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***



## Article



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-article
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| articleid | 34164 |  |
| shortname | new-test-article |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-article
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| articleid | 34163 |  |



### 3. Get By Key



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/article
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| articleid | 34161 |  |



***More example Requests/Responses:***


##### I. Example Request: Article



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| articleid | 34161 |  |



##### I. Example Response: Article
```js
{
    "article": {
        "articleid": "34161",
        "title": "Clackamas River flow information survey",
        "author": "Thomas O'Keefe",
        "abstract": "<p>\r\n\tAs a part of Portland General Electric&rsquo;s (PGE) license for its hydroelectric project along the Clackamas River, PGE follows a Recreation Resource Management Plan that directs the Company towards recreation projects along the Clackamas. PGE is currently seeking feedback from the whitewater community on the flow resources along the Upper Clackamas River through a short 8 question online survey.</p>\r\n",
        "abstractphoto": "2",
        "icon": null,
        "hascontents": 1,
        "contents": "<div>\r\n\tAs a part of Portland General Electric&rsquo;s (PGE) license for its hydroelectric project along the Clackamas River, PGE follows a Recreation Resource Management Plan that directs the Company towards recreation projects along the Clackamas.</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\tPGE meets bi-annually with a local whitewater stakeholder group, the Boater Logistics User Body (BLUB), to plan, conduct and complete the whitewater boating-related activities along the Upper Clackamas River. Such activities include sponsorship of the Annual Upper Clackamas River Whitewater Festival, the development of three river boat access sites (complete), the creation of a new whitewater boating-related improvement (in discussion), and funding for the annual maintenance of USGS flow gauges (ongoing).</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\tAs a part of the above measures, PGE is seeking feedback from the whitewater community on the current flow resources along the Upper Clackamas River through a short 8 question online survey.</div>\r\n<div>\r\n\t<br />\r\n\tWe encourage paddlers who enjoy the Clackamas River to take this survey:</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<a href=\"https://www.surveymonkey.com/r/FKJN8S2\">https://www.surveymonkey.com/r/FKJN8S2</a></div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t&nbsp;</div>\r\n",
        "contentsphoto": "2",
        "contact": "580",
        "posted": "2019-01-23T00:52:00.000Z",
        "shortname": "",
        "uid": "580",
        "releasedate": "2019-01-23T00:52:00.000Z",
        "deleted": 0
    }
}
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-article
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| articleid | 34163 |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| title | update test title |  |



## Comments



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-comment
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| uid |  |  |
| sectionid |  |  |
| name |  |  |
| comments |  |  |
| id |  |  |
| section |  |  |
| type |  |  |
| is_final |  |  |
| is_private |  |  |
| posted |  |  |
| deleted |  |  |
| duid |  |  |
| revision |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-reach
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 11139 |  |



### 3. Get By Key



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/comment
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1250363 |  |



### 4. Get By Reach


Get all comments for a reach.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/reach-comments
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| sectionid |  |  |



### 5. Reach Warnings


Get all comments which are categorized as warnings.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/reach-warnings
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| sectionid |  |  |



### 6. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-reach
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***



## Documents



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-document
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| documentid |  |  |
| shortname |  |  |
| abstract |  |  |
| description |  |  |
| keywords |  |  |
| recipient |  |  |
| author |  |  |
| document |  |  |
| title |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-document
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| documentid |  |  |



### 3. Get By Key



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/document
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| documentid |  |  |



***More example Requests/Responses:***


##### I. Example Request: Document



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| documentid | 51 |  |



##### I. Example Response: Document
```js
{
    "documentid": "51",
    "shortname": "Ausable Flow Study Comments",
    "abstract": "Comments on NYSEG's whitewater flow study, which also addresses demand, conflicts, and access.",
    "description": "Comments on NYSEG's whitewater flow study, wh",
    "uid": "419",
    "keywords": "FERC, NY, NYSEG, Flow Study, Access, Conflict",
    "editdate": "2007-04-13T04:00:00.000Z",
    "recipient": "0",
    "author": "144031",
    "document": "51.pdf",
    "deleted": 0,
    "title": "Ausable Flow Study Comments",
    "document_size": null
}
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-document
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| documentid |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| title | updated title |  |



## Event



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-event
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| title |  |  |
| city |  |  |
| description |  |  |
| cat |  |  |
| uid |  |  |
| state |  |  |
| url |  |  |
| orgname |  |  |
| orgaddress |  |  |
| orgphone |  |  |
| orgfax |  |  |
| orgemail |  |  |
| site |  |  |
| rivid |  |  |
| expectpart |  |  |
| expectspec |  |  |
| issue |  |  |
| media |  |  |
| nowreventinfo |  |  |
| contact_id |  |  |
| updated |  |  |
| html_description |  |  |
| retired |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-event
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 3. Get All By State


Get events by state.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/event-state
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| state |  |  |



***More example Requests/Responses:***


##### I. Example Request: Events By State



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| state | VT |  |



##### I. Example Response: Events By State
```js
[
    {
        "id": 655,
        "title": "Teva LiquidLifestyles Tour",
        "city": "Burlington",
        "description": "Video premier to be held at the Higher Grounds Nightclub",
        "cat": 19,
        "uid": 759,
        "state": "VT",
        "url": "",
        "orgname": "Mark Lubkowitz",
        "orgaddress": "",
        "orgphone": "(802) 434-8412",
        "orgfax": "",
        "orgemail": "",
        "site": "",
        "rivid": 0,
        "expectpart": 0,
        "expectspec": 0,
        "issue": "",
        "media": "",
        "nowreventinfo": 0,
        "contact_id": null,
        "updated": "2010-01-01T07:00:00.000Z",
        "html_description": "",
        "retired": 1
    },
    {
        "id": 2389,
        "title": "West River Releases",
        "city": "Jamaca",
        "description": "",
        "cat": 20,
        "uid": null,
        "state": "VT",
        "url": "",
        "orgname": null,
        "orgaddress": null,
        "orgphone": null,
        "orgfax": null,
        "orgemail": null,
        "site": "",
        "rivid": null,
        "expectpart": 0,
        "expectspec": 0,
        "issue": "",
        "media": "",
        "nowreventinfo": 0,
        "contact_id": 8201,
        "updated": "2007-12-10T18:03:53.000Z",
        "html_description": "",
        "retired": 1
    },
    {
        "id": 2532,
        "title": "West River Release",
        "city": "Jamaica",
        "description": "Scheduled whitewater releases from Ball Mountain Dam.",
        "cat": 20,
        "uid": null,
        "state": "VT",
        "url": "http://www.vtstateparks.com/htm/jamaicawhitewater.cfm",
        "orgname": null,
        "orgaddress": null,
        "orgphone": null,
        "orgfax": null,
        "orgemail": null,
        "site": "",
        "rivid": null,
        "expectpart": 0,
        "expectspec": 0,
        "issue": "",
        "media": "",
        "nowreventinfo": 0,
        "contact_id": 144031,
        "updated": "2012-07-13T20:07:02.000Z",
        "html_description": "",
        "retired": 0
    }
]
```


***Status Code:*** 200

<br>



### 4. Get By Key


Get a single event record by id.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/event
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



***More example Requests/Responses:***


##### I. Example Request: Event



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



##### I. Example Response: Event
```js
{
    "id": 1,
    "title": "Triple Crown",
    "city": "Elizabethton",
    "description": "Race the Watauga. \r\nRodeo at Hydro\r\nRodeo at Rock Island.\r\nRodeo at the Nolichucky.",
    "cat": 8,
    "uid": 1,
    "state": "TN",
    "url": null,
    "orgname": null,
    "orgaddress": null,
    "orgphone": null,
    "orgfax": null,
    "orgemail": null,
    "site": null,
    "rivid": null,
    "expectpart": null,
    "expectspec": null,
    "issue": null,
    "media": null,
    "nowreventinfo": 0,
    "contact_id": null,
    "updated": "2010-01-01T07:00:00.000Z",
    "html_description": "",
    "retired": 1
}
```


***Status Code:*** 200

<br>



### 5. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-event
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| description | new description |  |



## GIS Huc



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-gis-huc
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| huc_name | drew |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-gis-huc
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gid | 2159 |  |



### 3. Get By Key



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/gis-huc
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gid | 2158 |  |



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-gis-huc
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gid | 2160 |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| huc_name | updated huc name |  |



## GIS State



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-gis-state
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| gid | 2607 |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-gis-state
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gid |  |  |



### 3. Get All By Country



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/gis-states-country
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| country |  |  |



### 4. Get All By State



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/gis-states
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gid |  |  |



### 5. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-gis-zip
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gid |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| zip | 20861 |  |



## GIS Zip



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-gis-zip
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| gid |  |  |
| zip |  |  |
| po_name |  |  |
| state |  |  |
| area |  |  |
| sumblkpop |  |  |
| pop2000 |  |  |
| the_geom |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-gis-zip
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gid | 30010 |  |



### 3. Get All By State



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/gis-zip-state
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| state |  |  |



### 4. Get By Key



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/gis-zip
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gid |  |  |



***More example Requests/Responses:***


##### I. Example Request: GIS Zip



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| gid | 30010 |  |



##### I. Example Response: GIS Zip
```js
{
    "gid": 30010,
    "zip": "20861",
    "po_name": null,
    "state": null,
    "area": null,
    "sumblkpop": null,
    "pop2000": null,
    "the_geom": null
}
```


***Status Code:*** 200

<br>



### 5. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-gis-zip
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gid | 30010 |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| zip | 20861 |  |



## Gage Reading Metric



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-gage-reading-metric
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| id | 16 |  |
| shortkey | vis |  |
| unit | visual |  |
| name | visual |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-gage-reading-metric
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 16 |  |



### 3. Get All


Get all available gage metrics. For example, CFS, Ft, etc.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/gage-reading-metrics
```



***More example Requests/Responses:***


##### I. Example Request: Gage Reading Metrics



##### I. Example Response: Gage Reading Metrics
```js
[
    {
        "shortkey": "corr",
        "unit": "r.c.",
        "name": "Status",
        "id": 1,
        "format": "%1.1f",
        "sortorder": 99
    },
    {
        "shortkey": "perc",
        "unit": "%",
        "name": "Percent",
        "id": 14,
        "format": "%3.1f",
        "sortorder": 30
    },
    {
        "shortkey": "mflow",
        "unit": "cm/s",
        "name": "Metric Volumentric Flow ",
        "id": 13,
        "format": "%3.1f",
        "sortorder": 40
    },
    {
        "shortkey": "mstag",
        "unit": "m",
        "name": "Meters Stage",
        "id": 12,
        "format": "%3.2f",
        "sortorder": 50
    },
    {
        "shortkey": "pc15m",
        "unit": "in/15min",
        "name": "Precip. in 15m",
        "id": 4,
        "format": "%2.2f",
        "sortorder": 80
    },
    {
        "shortkey": "pc6h",
        "unit": "in/6h",
        "name": "Precip. in 6h",
        "id": 6,
        "format": "%2.1f",
        "sortorder": 83
    },
    {
        "shortkey": "pc12h",
        "unit": "in/12h",
        "name": "Precip. in 12h",
        "id": 3,
        "format": "%2.1f",
        "sortorder": 86
    },
    {
        "shortkey": "pc24h",
        "unit": "in/24h",
        "name": "Precip. in 24h",
        "id": 5,
        "format": "%2.1f",
        "sortorder": 89
    },
    {
        "shortkey": "pccum",
        "unit": "in/yr",
        "name": "Yearly Precip.",
        "id": 7,
        "format": "%3.1f",
        "sortorder": 93
    },
    {
        "shortkey": "bflow",
        "unit": "cfs",
        "name": "Alt. Flow",
        "id": 10,
        "format": "%4.0f",
        "sortorder": 60
    },
    {
        "shortkey": "bstag",
        "unit": "ft",
        "name": "Alt. Stage in Feet",
        "id": 11,
        "format": "%3.2f",
        "sortorder": 65
    },
    {
        "shortkey": "temp",
        "unit": "? F",
        "name": "Temperature",
        "id": 9,
        "format": "%3.0f",
        "sortorder": 75
    },
    {
        "shortkey": "flow",
        "unit": "cfs",
        "name": "Flow",
        "id": 2,
        "format": "%4.0f",
        "sortorder": 10
    },
    {
        "shortkey": "in",
        "unit": "inches",
        "name": "Inches Stage",
        "id": 15,
        "format": "%4.0f",
        "sortorder": 25
    },
    {
        "shortkey": "stage",
        "unit": "ft",
        "name": "Feet Stage",
        "id": 8,
        "format": "%3.2f",
        "sortorder": 20
    }
]
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-gage-reading-metric
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 16 |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| name | update name |  |



## Gage Source



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-gage-source
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| source | drew2 |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-gage-source
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| source | drew3 |  |



### 3. Get All


Get all recorded gage sources.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/gage-sources
```



***More example Requests/Responses:***


##### I. Example Request: Gage Sources



##### I. Example Response: Gage Sources
```js
[
    {
        "source": "river",
        "title": "Direct River Observations and Calculations",
        "url": null,
        "update_type": "d",
        "update_frequency": 0,
        "update_start_time": "20:00:00",
        "data": null,
        "updated": null,
        "populated": null,
        "disclaimer": null
    },
    {
        "source": "virtual",
        "title": "New Virtual Gauges",
        "url": null,
        "update_type": "d",
        "update_frequency": 0,
        "update_start_time": "20:00:00",
        "data": null,
        "updated": null,
        "populated": null,
        "disclaimer": null
    },
    {
        "source": "virt",
        "title": "Linear Virtual",
        "url": null,
        "update_type": "m",
        "update_frequency": 0,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": null,
        "populated": null,
        "disclaimer": null
    },
    {
        "source": "vrt2",
        "title": "Virtual",
        "url": null,
        "update_type": "m",
        "update_frequency": 0,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": null,
        "populated": null,
        "disclaimer": null
    },
    {
        "source": "release",
        "title": "AW Supplied Release Information",
        "url": null,
        "update_type": "m",
        "update_frequency": 0,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": null,
        "populated": null,
        "disclaimer": null
    },
    {
        "source": "ice",
        "title": "Ice custom gauge?",
        "url": "",
        "update_type": "m",
        "update_frequency": 0,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": null,
        "populated": null,
        "disclaimer": null
    },
    {
        "source": "dflows",
        "title": "Dreamflows",
        "url": null,
        "update_type": "m",
        "update_frequency": 0,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": null,
        "populated": null,
        "disclaimer": null
    },
    {
        "source": "bobs",
        "title": "Bobs custom gauge?",
        "url": "",
        "update_type": "m",
        "update_frequency": 0,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": null,
        "populated": null,
        "disclaimer": null
    },
    {
        "source": "hads",
        "title": "NOAA Gauges",
        "url": null,
        "update_type": "h",
        "update_frequency": 2592000,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": null,
        "populated": "2009-10-06T16:58:21.000Z",
        "disclaimer": null
    },
    {
        "source": "wvcoe",
        "title": "WV COE Gauges",
        "url": "http://www.lrh-wc.usace.army.mil/wc/whitewater.html",
        "update_type": "r",
        "update_frequency": 3600,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": "2009-08-24T06:54:38.000Z",
        "populated": "2016-02-11T22:00:03.000Z",
        "disclaimer": null
    },
    {
        "source": "sce",
        "title": "SC Edison Gauges",
        "url": "http://www.sce.com",
        "update_type": "r",
        "update_frequency": 600,
        "update_start_time": "00:33:53",
        "data": "{\"uid\":45851}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ",
        "updated": "2013-05-06T06:33:53.000Z",
        "populated": "2018-03-01T16:03:55.000Z",
        "disclaimer": null
    },
    {
        "source": "pge",
        "title": "PG&E Supplied",
        "url": null,
        "update_type": "r",
        "update_frequency": 600,
        "update_start_time": "00:00:00",
        "data": "{\"uid\":88675}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ",
        "updated": null,
        "populated": null,
        "disclaimer": null
    },
    {
        "source": "cdec",
        "title": "CDEC Gauges",
        "url": "http://www.nws.noaa.gov",
        "update_type": "r",
        "update_frequency": 7200,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": "2008-05-06T02:01:28.000Z",
        "populated": "2018-12-22T05:00:49.000Z",
        "disclaimer": null
    },
    {
        "source": "test",
        "title": "Test Gauge",
        "url": null,
        "update_type": "h",
        "update_frequency": 1000000,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": null,
        "populated": "2019-01-14T16:25:24.000Z",
        "disclaimer": null
    },
    {
        "source": "codwr",
        "title": "CO DWR Gauges",
        "url": "http://www.dwr.state.co.us/",
        "update_type": "r",
        "update_frequency": 3600,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": "2010-09-08T07:12:35.000Z",
        "populated": "2019-01-13T02:00:39.000Z",
        "disclaimer": null
    },
    {
        "source": "popud",
        "title": "POPUD Gauges",
        "url": "",
        "update_type": "r",
        "update_frequency": 3600,
        "update_start_time": "18:56:46",
        "data": null,
        "updated": "2013-11-08T01:56:46.000Z",
        "populated": "2018-11-08T15:56:46.000Z",
        "disclaimer": null
    },
    {
        "source": "qbec",
        "title": "Quebec Gauges",
        "url": "http://www.gouv.qc.ca/",
        "update_type": "h",
        "update_frequency": 2592000,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": "2009-08-24T06:54:12.000Z",
        "populated": "2018-12-27T06:35:35.000Z",
        "disclaimer": null
    },
    {
        "source": "wadoe",
        "title": "WA DOE Gauges",
        "url": "https://fortress.wa.gov/ecy/eap/flows/regions/state.asp",
        "update_type": "r",
        "update_frequency": 1800,
        "update_start_time": "01:29:27",
        "data": null,
        "updated": "2016-02-17T08:29:27.000Z",
        "populated": "2019-01-24T09:29:29.000Z",
        "disclaimer": null
    },
    {
        "source": "noaa",
        "title": "NOAA Gauges",
        "url": "http://water.weather.gov",
        "update_type": "r",
        "update_frequency": 1800,
        "update_start_time": "22:59:05",
        "data": null,
        "updated": "2013-12-09T05:59:05.000Z",
        "populated": "2019-01-25T03:59:08.000Z",
        "disclaimer": null
    },
    {
        "source": "tva",
        "title": "TVA Gauges",
        "url": "http://lakeinfo.tva.gov/htbin/streaminfo",
        "update_type": "r",
        "update_frequency": 3600,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": "2008-05-06T02:00:13.000Z",
        "populated": "2018-04-09T02:00:01.000Z",
        "disclaimer": null
    },
    {
        "source": "dream",
        "title": "DreamFlows Gauges",
        "url": "http://www.dreamflows.com/",
        "update_type": "r",
        "update_frequency": 1800,
        "update_start_time": "00:00:00",
        "data": "{\"cycle\":3}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ",
        "updated": "2008-05-06T02:00:44.000Z",
        "populated": "2019-01-25T07:00:01.000Z",
        "disclaimer": null
    },
    {
        "source": "usgs",
        "title": "USGS Gauges",
        "url": null,
        "update_type": "r",
        "update_frequency": 900,
        "update_start_time": "00:00:00",
        "data": null,
        "updated": null,
        "populated": "2019-01-25T08:45:05.000Z",
        "disclaimer": null
    }
]
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-gage-source
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| source | drew2 |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| source | drew3 |  |



## Gage Update



### 1. Create


Create gage update record.


***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-gage-update
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| oid | 128391 |  |
| gauge_id | 251541 |  |
| metric | 2 |  |



### 2. Delete


Remove gage update record from database.


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-gage-update
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gauge_id | 251541 |  |



### 3. Get By Key


Get updates for a single gage. 


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/gage-updates
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| gauge_id |  |  |



***More example Requests/Responses:***


##### I. Example Request: Gage Updates



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| gauge_id | 64 |  |



##### I. Example Response: Gage Updates
```js
[
    {
        "gauge_id": 64,
        "metric": 10,
        "lobs_time": "2017-04-11T07:04:00.000Z",
        "lobs_id": "275064391039",
        "lobs_reading": 0,
        "obs_time": "2017-04-11T07:04:00.000Z",
        "obs_id": "275064391039",
        "obs_reading": 0,
        "obs_data": null,
        "write_sequence": 9777059,
        "updated": "2017-05-09T03:07:21.000Z",
        "obs_ref": "890469",
        "last_journal_date": "2017-04-11T07:04:00.000Z",
        "gd_ref": null
    },
    {
        "gauge_id": 64,
        "metric": 8,
        "lobs_time": "2019-01-25T07:29:52.000Z",
        "lobs_id": "275071453969",
        "lobs_reading": 4.67,
        "obs_time": "2019-01-25T08:29:36.000Z",
        "obs_id": "275071454419",
        "obs_reading": 4.7,
        "obs_data": null,
        "write_sequence": 11946928,
        "updated": "2019-01-25T08:45:05.000Z",
        "obs_ref": null,
        "last_journal_date": null,
        "gd_ref": null
    },
    {
        "gauge_id": 64,
        "metric": 2,
        "lobs_time": "2019-01-25T07:29:52.000Z",
        "lobs_id": "275071453969",
        "lobs_reading": 1300,
        "obs_time": "2019-01-25T08:29:36.000Z",
        "obs_id": "275071454419",
        "obs_reading": 1320,
        "obs_data": null,
        "write_sequence": 11946928,
        "updated": "2019-01-25T08:45:05.000Z",
        "obs_ref": null,
        "last_journal_date": "2011-10-21T10:41:36.000Z",
        "gd_ref": null
    }
]
```


***Status Code:*** 200

<br>



### 4. Update


Edit an existing record.


***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-accident
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 11139 |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| description | new description |  |



## Injuries



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-injury
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |
| injury |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-injury
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 3. Get All



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/injuries
```



***More example Requests/Responses:***


##### I. Example Request: Injuries



##### I. Example Response: Injuries
```js
[
    {
        "id": 0,
        "injury": "Does not Apply"
    },
    {
        "id": 51,
        "injury": "Asthma Attack"
    },
    {
        "id": 52,
        "injury": "Head Injury / Concussion"
    },
    {
        "id": 53,
        "injury": "Heart Attack / Heart Failure"
    },
    {
        "id": 54,
        "injury": "Hypothermia"
    },
    {
        "id": 55,
        "injury": "Near Drowning"
    },
    {
        "id": 56,
        "injury": "Other"
    },
    {
        "id": 57,
        "injury": "Shoulder Dislocation"
    },
    {
        "id": 58,
        "injury": "Spinal Injury"
    },
    {
        "id": 59,
        "injury": "Physical Trauma"
    }
]
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-state
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| record_number |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| name |  |  |



## Layer



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-layer
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| topology_id |  |  |
| layer_id |  |  |
| schema_name |  |  |
| table_name |  |  |
| feature_column |  |  |
| feature_type |  |  |
| level |  |  |
| child_id |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-layer
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| layer_id |  |  |



### 3. Get All


Returns all tpoplogy records.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/layer-all
```



### 4. Get By Key


Returns a single topology record.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/layer
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| layer_id |  |  |



## Members



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-affiliate
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| last |  |  |
| url |  |  |
| conemail |  |  |
| members |  |  |
| contact |  |  |
| abstract |  |  |
| description |  |  |
| reaches |  |  |
| volunteer |  |  |
| id |  |  |
| city |  |  |
| state |  |  |
| expiration |  |  |
| memberid |  |  |
| deleted |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-accident
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 11139 |  |



### 3. Get All


Returns all AW affiliates.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/members
```



***More example Requests/Responses:***


##### I. Example Request: Affiliates



##### I. Example Response: Affiliates
```js
[
    {
        "last": "Big Thompson Watershed Forum",
        "url": "http://www.btwatershed.org/",
        "conemail": "zshelley@btwatershed.org",
        "members": "0",
        "contact": "Zack Shelley",
        "abstract": "",
        "description": "",
        "reaches": "",
        "volunteer": "0",
        "id": "4008",
        "city": "Loveland",
        "state": "CO",
        "expiration": "2008-08-16",
        "memberid": "28872",
        "deleted": 1
    },
    {
        "last": "Keelhaulers Canoe Club",
        "url": "http://keelhauler.org/kh.htm",
        "conemail": "keelhauler@yahoo.com",
        "members": "300",
        "contact": "WebMeister and Membership Chair John Kobak",
        "abstract": "Paddling in OH, PA, WV, and wherever there's water!",
        "description": "<center><img src=\"http://keelhauler.org/newlogoweb.jpg\"></center><br>Centered in the Cleveland, OH, area, Keel-haulers is an active club with <a href=\"http://www.keelhauler.org/khcc/tripschedule.htm\">a full trip schedule</a>. Our 100-page yearbook contains a lot of info, including maps to local rivers and a self-consistent ranking of over a hundred international whitewater rivers. The club is open to all <a href=\"http://www.keelhauler.org/khcc/khcapp.htm\">(Print an Application)</a>; dues are $20/year.<br>\r\nThe club website has a very active <a href=\"http://www.keelhauler.org/khcc/khcads.htm\">Used Boats and Equipment</a> page and a <a href=\"http://keelhauler.org/phpBB/viewforum.php?f=2\">Message Board</a>.\r\n",
        "reaches": null,
        "volunteer": "358",
        "id": "713",
        "city": "Cleveland",
        "state": "OH",
        "expiration": "2019-05-24",
        "memberid": "706",
        "deleted": 0
    },
    {
        "last": "Warren Wilson College Paddling Club",
        "url": "",
        "conemail": "bfarthing@warren-wilson.edu",
        "members": "0",
        "contact": "Brit Farthing, 828-771-3004",
        "abstract": "",
        "description": "",
        "reaches": null,
        "volunteer": "0",
        "id": "1000004",
        "city": "Asheville",
        "state": "NC",
        "expiration": "2006-08-26",
        "memberid": "17832",
        "deleted": 1
    }    
]
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-affiliate
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***



## Project



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-project
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| name |  |  |
| id |  |  |
| description |  |  |
| uid |  |  |
| shortname |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-project
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 201 |  |



### 3. Get By Key



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/project
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



***More example Requests/Responses:***


##### I. Example Request: Project



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



##### I. Example Response: Project
```js
{
    "project": {
        "id": "1",
        "name": "Gauley River (WV)",
        "description": "For many years AW has worked on the protection of this river and advocated for public access.",
        "uid": "0",
        "deleted": 0,
        "shortname": ""
    }
}
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-project
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***



## Rapids



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-rapid
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| distance |  |  |
| name |  |  |
| reachid |  |  |
| difficulty |  |  |
| description |  |  |
| rapidid |  |  |
| approximate |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-reach
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 11139 |  |



### 3. Get By Key


Get all rapids for a reach


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/rapid
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| rapidid |  |  |



***More example Requests/Responses:***


##### I. Example Request: Rapid



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| rapidid | 102199 |  |



##### I. Example Response: Rapid
```js
{
    "reachid": 10605,
    "rapidid": 102199,
    "name": "Bitch Monkey",
    "distance": 0.42,
    "difficulty": "5.2",
    "description": "<p>\n\tThis chaotic drop connects the third slide to the Back Canyon, but it has an irregular lip and a shallow landing. &nbsp; It can be run well, but unfortunately it&rsquo;s frequently run by accident. Formerly, there was an eddy or logjam above the slot but in recent years, rocks have shifted and much more water is rushing towards the dividing rock, and to the right over Bitch Monkey, which is now certainly in play.</p>\n",
    "photoid": 881376,
    "videoid": 0,
    "isputin": 0,
    "istakeout": 0,
    "isaccess": 0,
    "isportage": 0,
    "ishazard": 1,
    "iswaterfall": 1,
    "isplayspot": 0,
    "rlat": 38.9962997436523,
    "rlon": -77.2491989135742,
    "approximate": false,
    "deleted": false,
    "rloc": {
        "crs": {
            "type": "name",
            "properties": {
                "name": "EPSG:4326"
            }
        },
        "type": "Point",
        "coordinates": [
            -77.2492,
            38.9963
        ]
    },
    "revision": 7464,
    "is_final": true,
    "created_at": "2019-01-25T05:28:08.308Z"
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Reach Rapids



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| reachid | 355 |  |



##### II. Example Response: Reach Rapids
```js
[
    {
        "reachid": 355,
        "rapidid": 11128,
        "name": "test lorem rapid",
        "distance": 0.1,
        "difficulty": "V",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "photoid": null,
        "videoid": null,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 11381,
        "is_final": true,
        "created_at": "2020-07-11T09:54:53.896Z"
    },
    {
        "reachid": 355,
        "rapidid": 106974,
        "name": "test lorem rapid",
        "distance": 0.1,
        "difficulty": "V",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "photoid": null,
        "videoid": null,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 11382,
        "is_final": true,
        "created_at": "2020-07-11T09:56:40.836Z"
    },
    {
        "reachid": 355,
        "rapidid": 106975,
        "name": "test another blah!!",
        "distance": 0.1,
        "difficulty": "V",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "photoid": null,
        "videoid": null,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 11383,
        "is_final": true,
        "created_at": "2020-07-11T10:03:02.490Z"
    }
]
```


***Status Code:*** 200

<br>



### 4. Get By Reach


Get all rapids for a reach


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/rapids
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| reachid |  |  |



***More example Requests/Responses:***


##### I. Example Request: Get By Reach



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| reachid | 1039 |  |



##### I. Example Response: Get By Reach
```js
[
    {
        "reachid": 1039,
        "rapidid": 658,
        "name": "Pinball / First Rapid",
        "distance": 0.4,
        "difficulty": "II",
        "description": "<p>\n\tPinaball / 1st Rapid is the 1st horizon line that you come to. Almost all paddlers will run the opening left of center. At the bottom is a rock squarely in the most direct path. One method is to boof left into an eddy above and left of the rock. This is fairly easy. The other method (shown in the photo) is to angle right of the bottom rock. The problem is that there is a hidden underwater rock that you will hit if you cheat and head right too soon. It will pinball you into the rock at the bottom which you are trying to avoid. This is much more of a problem at lower water levels. At higher levels the pinball rock is further under water and you can start right earlier. I&#39;m leaving the old text below.</p>\n<p>\n\tRun the left hand chute! The right hand chute (which appears to be the obvious route) runs into a pinning rock.</p>\n",
        "photoid": 882130,
        "videoid": 0,
        "isputin": 0,
        "istakeout": 0,
        "isaccess": 0,
        "isportage": 0,
        "ishazard": 0,
        "iswaterfall": 0,
        "isplayspot": 0,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 3750,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 659,
        "name": "Stairstep Rapid",
        "distance": 1,
        "difficulty": "III+",
        "description": "<p>\n\tStairstep is the 1st horizon line after Pinball. The first 3 steps are not large, but by the 4th one you need to be lined up properly to run the big drop into the hole (not a keeper). This is followed by a succession of fairly large breaking waves. Stairstep gets harder with higher water levels; above a foot it is fairly beefy. &nbsp;Next to the 1st step there is a large boulder in the center of the river (boaters will pass to the right of it) with a fairly large eddy behind it. A lot of boaters catch this eddy. You can do so but be aware that there is a sieve at the lower end of that eddy that a few people have been sucked into. Fortunately all flushed out. The tree trunk that was on river right has been gone for a couple years. &nbsp;</p>\n",
        "photoid": 882307,
        "videoid": 0,
        "isputin": 0,
        "istakeout": 0,
        "isaccess": 0,
        "isportage": 0,
        "ishazard": 0,
        "iswaterfall": 0,
        "isplayspot": 0,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 7538,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 660,
        "name": "Suddy Hole",
        "distance": 1.9,
        "difficulty": "III+",
        "description": "<p>\n\tSuddy Hole consists of two drops. Most boaters will eddy out after the 1st. As you look at the horizon line of the second, you will see a &quot;dead&quot; tree across the creek and at the bottom of the rapid. This tree is still partly alive and has a prominent &quot;Y&quot; about 15 ft from the bottom. &nbsp;If you aim for this tree, you will be on the most commonly run line. The nasty recircing Suddy hole is on boaters right. There is an exciting line on river left at higher (above 6 inches) levels.&nbsp;</p>\n",
        "photoid": 882187,
        "videoid": 0,
        "isputin": 0,
        "istakeout": 0,
        "isaccess": 0,
        "isportage": 0,
        "ishazard": 0,
        "iswaterfall": 0,
        "isplayspot": 0,
        "rlat": 0,
        "rlon": 0,
        "approximate": true,
        "deleted": false,
        "rloc": null,
        "revision": 7574,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 102453,
        "name": "Lower Prelude",
        "distance": 2.2,
        "difficulty": "III",
        "description": "<p>\n\tPrelude (sometimes called False Narrows, Upper Narrows, and sometimes considered part of the Narrows) is a longish rapid and fairly intense, especially at higher water levels.&nbsp;</p>\n",
        "photoid": 882186,
        "videoid": 0,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": true,
        "deleted": false,
        "rloc": null,
        "revision": 4943,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 661,
        "name": "Narrows",
        "distance": 2.4,
        "difficulty": "III+",
        "description": "Start on river right moving towards river center over the first drop.  Run the slide that immediately follows down the center.",
        "photoid": 3672,
        "videoid": null,
        "isputin": 0,
        "istakeout": 0,
        "isaccess": 0,
        "isportage": 0,
        "ishazard": 0,
        "iswaterfall": 0,
        "isplayspot": 0,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 800,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 102452,
        "name": "Cliffside",
        "distance": 2.9,
        "difficulty": "II+",
        "description": "<p>\n\tThe path with enough water takes you to river right and to the base of a cliff. One good stroke at the right time keeps you from being pushed into it. Peter Van G is stylin it in the photo.&nbsp;</p>\n",
        "photoid": 882182,
        "videoid": 0,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": true,
        "deleted": false,
        "rloc": null,
        "revision": 4292,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 102454,
        "name": "Flume",
        "distance": 3.1,
        "difficulty": "II+",
        "description": "<p>\n\tSmall entry drop, then the main flume, run on river right. Smooth tongue leads into a breaking wave (low levels) or hole (medium and up). Hole is usually punched fairly easily.&nbsp;</p>\n",
        "photoid": 882188,
        "videoid": 0,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": true,
        "deleted": false,
        "rloc": null,
        "revision": 5215,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 102529,
        "name": "Humble Pie",
        "distance": 3.4,
        "difficulty": "III",
        "description": "<p>\n\tHumble Pie (aka Commitment Eddy) is the last rapid before the French Broad. Below about 8 inches, you are forced to take a route on the far left. The gap between the left bank and the 1st boulder is about 15 ft. Avoid the extreme left - i.e. the 5 ft closest to the left bank. &nbsp;The first hole tends to surf you to the left, the second more to the right. The boater in the picture is in the 1st hole. Above 8 inches a couple lines open up near the center. Below 0, it starts getting boney and one line is to make the &quot;commitment&quot; to catch the eddy behind that 1st large boulder. If you don&#39;t commit or blow the line you will be on a pinning rock. At those low levels, most people choose to make a couple quick turns around the partially exposed rocks.&nbsp;</p>\n",
        "photoid": 882306,
        "videoid": 0,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": true,
        "deleted": false,
        "rloc": null,
        "revision": 4302,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 662,
        "name": "Confluence with French Broad River",
        "distance": 3.7,
        "difficulty": null,
        "description": "To skip the 3 mile section on the French Broad, take out at the railroad tressle on river left.Â  Carry 0.7 miles up the railroad tracks to Stackhouse.Â  This also shortens the shuttle run.",
        "photoid": null,
        "videoid": null,
        "isputin": 0,
        "istakeout": 0,
        "isaccess": 1,
        "isportage": 0,
        "ishazard": 0,
        "iswaterfall": 0,
        "isplayspot": 0,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 801,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 663,
        "name": "Kayak Ledge (Needle Falls)",
        "distance": 4.7,
        "difficulty": "III",
        "description": "Run this five foot ledge on the right of the island.",
        "photoid": null,
        "videoid": null,
        "isputin": 0,
        "istakeout": 0,
        "isaccess": 0,
        "isportage": 0,
        "ishazard": 0,
        "iswaterfall": 0,
        "isplayspot": 0,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 802,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    },
    {
        "reachid": 1039,
        "rapidid": 664,
        "name": "Frank Bell's Rapid (Deep Water Rapid)",
        "distance": 5.7,
        "difficulty": "IV",
        "description": "This rapid is a long series of ledges and holes.  Start left and avoid the holes.  Aim for the right side of the bottom hole at higher water levels.",
        "photoid": null,
        "videoid": null,
        "isputin": 0,
        "istakeout": 0,
        "isaccess": 0,
        "isportage": 0,
        "ishazard": 0,
        "iswaterfall": 0,
        "isplayspot": 0,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 803,
        "is_final": true,
        "created_at": "2019-01-25T05:28:08.308Z"
    }
]
```


***Status Code:*** 200

<br>



##### II. Example Request: Reach Rapids



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| reachid | 355 |  |



##### II. Example Response: Reach Rapids
```js
[
    {
        "reachid": 355,
        "rapidid": 11128,
        "name": "test lorem rapid",
        "distance": 0.1,
        "difficulty": "V",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "photoid": null,
        "videoid": null,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 11381,
        "is_final": true,
        "created_at": "2020-07-11T09:54:53.896Z"
    },
    {
        "reachid": 355,
        "rapidid": 106974,
        "name": "test lorem rapid",
        "distance": 0.1,
        "difficulty": "V",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "photoid": null,
        "videoid": null,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 11382,
        "is_final": true,
        "created_at": "2020-07-11T09:56:40.836Z"
    },
    {
        "reachid": 355,
        "rapidid": 106975,
        "name": "test another blah!!",
        "distance": 0.1,
        "difficulty": "V",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "photoid": null,
        "videoid": null,
        "isputin": null,
        "istakeout": null,
        "isaccess": null,
        "isportage": null,
        "ishazard": null,
        "iswaterfall": null,
        "isplayspot": null,
        "rlat": 0,
        "rlon": 0,
        "approximate": false,
        "deleted": false,
        "rloc": null,
        "revision": 11383,
        "is_final": true,
        "created_at": "2020-07-11T10:03:02.490Z"
    }
]
```


***Status Code:*** 200

<br>



### 5. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-rapid
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| rapidid |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| distance |  |  |
| name |  |  |
| reachid |  |  |
| difficulty |  |  |
| description |  |  |
| approximate |  |  |



## Reach



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-reach
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| river |  |  |
| section |  |  |
| altname |  |  |
| county |  |  |
| zipcode |  |  |
| length |  |  |
| avggradient |  |  |
| maxgradient |  |  |
| agency |  |  |
| gaugeinfo |  |  |
| description |  |  |
| photoid |  |  |
| permitid |  |  |
| huc |  |  |
| plat |  |  |
| plon |  |  |
| prrn |  |  |
| tlat |  |  |
| tlon |  |  |
| trrn |  |  |
| skid |  |  |
| status |  |  |
| edited |  |  |
| is_final |  |  |
| revision |  |  |
| class |  |  |
| ploc |  |  |
| tloc |  |  |
| was_final |  |  |
| thumboverride |  |  |
| shuttledetails |  |  |
| abstract |  |  |
| direction_default |  |  |
| custom_destination |  |  |
| revision_comment |  |  |
| permiturl |  |  |
| permitinfo |  |  |
| image_override |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-reach
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 3. Get By Key


Get single reach by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/reach
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 2 |  |



***More example Requests/Responses:***


##### I. Example Request: Reach



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 2 |  |



##### I. Example Response: Reach
```js
{
    "reach": {
        "id": 2,
        "river": "Aniakchak",
        "section": "Surprise Lake to Aniakchak Bay",
        "altname": null,
        "county": "Aniakchak National Park and Preserve",
        "zipcode": "99571",
        "length": 32,
        "avggradient": 30,
        "maxgradient": 83,
        "agency": "National Park Service",
        "gaugeinfo": "<p>Look for 1000-2000 cfs in July (based on \r\nEmbick).</p>",
        "description": "<p>The Aniakchak River, a Federally-designated Wild and Scenic River, is located within the <a \r\nhref=\"http://www.nps.gov/ania/\">Aniakchak National Mounment and Preserve</a> providing an \r\nopportunity for a remote river expedition on the Alaska Peninusla. Trips usually take place during \r\nthe month of July. Plan for 3-4 days but be prepared for longer as weather conditions often dictate \r\nthe schedule.</p>\r\n\r\n<p>The Aniakchak Volcano underwent a catostrophic explosive erruption approximately 3400 \r\nyears \r\nago that formed the current caldera. Smaller erruptions have occurred more recently, with the last \r\none in 1931. Surprise Lake, located within the 5.9 mile diameter caldera, is the source of the \r\nAniakchak River. This caldera has its own microclimate marked by consistently wet weather and \r\nharsh winds. Despite this it offers opportunities for exploration and hiking across the volcanic \r\nlandscape.</p>\r\n\r\n<p>From the lake the river begins at a slow pace for the first mile before entering the \"Gates\", a \r\n1500 foot gash in \r\nthe \r\ncaldera wall. Here the river drops at a rate of 73 feet per mile with class IV whitewater. The river \r\nremains class II/III for the next 10 miles (if you're in an inflatible be sure to pack the patch kit as \r\nthe sharp volcanic rocks can do a number on your boat). At the confluence of Hidden Creek the \r\nriver enters the steep 83 feet per mile section where volcanic bedrock on either side and boulders \r\nin the channel constrict the flow. The pace of the river begins to slow considerably over the next \r\nfive miles \r\nas you leave this section and continue the remainder of the journey on a low-gradient alluvial river \r\nthat takes you to the ocean.<p>\r\n\r\n<p>The river system \r\nsupports all five species of salmon and Surprise Lake provides spawning habitat and a nursery for \r\nsockeye salmon and artic char. Dolly Varden are also present. Wildlife are abundant and brown \r\nbear are common along this river so be sure to take proper precautions and be prepared for \r\nencounters.\r\n</p>\r\n\r\n<p>LOGISTICS: The expense of getting to this river and the unpredictable weather keep usage \r\nlow. You can get commerical service into King Salmon or to Port Heiden. From either of these \r\nairstrips you'll need to arrange for a float plane charter to Surprise Lake. King Salmon \r\nis further away (150 miles vs. 20 miles) but offers more options. You will also need to arrange for \r\npick up at the end of your trip where the river meets the ocean at Aniakchak Bay. Float planes can \r\nland in the bay or wheel planes can land on the beachhead. Poor weather conditions can delay \r\nflights so plan accordingly. There is a shelter at the beach for boaters awaiting pick up. This region \r\nis extremely remote with no practical access to outside assistance.</p>",
        "photoid": 8547,
        "permitid": null,
        "huc": "19020702",
        "plat": 56.9059982299805,
        "plon": -158.080902099609,
        "prrn": null,
        "tlat": 56.7634010314941,
        "tlon": -157.493392944336,
        "trrn": null,
        "skid": null,
        "status": "u",
        "edited": "2004-09-03T20:12:15.000Z",
        "is_final": true,
        "revision": 1189796,
        "class": "I-IV",
        "ploc": {
            "crs": {
                "type": "name",
                "properties": {
                    "name": "EPSG:4326"
                }
            },
            "type": "Point",
            "coordinates": [
                -158.081,
                56.906
            ]
        },
        "tloc": {
            "crs": {
                "type": "name",
                "properties": {
                    "name": "EPSG:4326"
                }
            },
            "type": "Point",
            "coordinates": [
                -157.493,
                56.7634
            ]
        },
        "was_final": true,
        "thumboverride": false,
        "shuttledetails": null,
        "abstract": null,
        "direction_default": 1,
        "custom_destination": null,
        "revision_comment": null,
        "permiturl": null,
        "permitinfo": null,
        "image_override": null
    }
}
```


***Status Code:*** 200

<br>



### 4. Update


See Create Reach for available fields.


***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-reach
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***



## States



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-state
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| name |  |  |
| record_number |  |  |
| abbreviation |  |  |
| country |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-state
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| record_number |  |  |



### 3. Get All



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/states
```



***More example Requests/Responses:***


##### I. Example Request: States



##### I. Example Response: States
```js
[
    "Other",
    "Newfoundland",
    "Nova Scotia",
    "Nunavut",
    "Manitoba",
    "Alberta",
    "British Columbia",
    "New Brunswick",
    "Quebec",
    "Saskatchewan",
    "Ontario",
    "Alaska",
    "Minnesota",
    "Washington",
    "Montana",
    "Idaho",
    "North Dakota",
    "Michigan",
    "Maine",
    "Wisconsin",
    "Oregon",
    "South Dakota",
    "New Hampshire",
    "New York",
    "Vermont",
    "Wyoming",
    "Iowa",
    "Nebraska",
    "Massachusetts",
    "Pennsylvania",
    "Illinois",
    "Ohio",
    "Connecticut",
    "Rhode Island",
    "California",
    "Utah",
    "Nevada",
    "Indiana",
    "New Jersey",
    "Colorado",
    "West Virginia",
    "Missouri",
    "Kansas",
    "Delaware",
    "Maryland",
    "Virginia",
    "Kentucky",
    "District of Columbia",
    "Arizona",
    "NWT",
    "PEI",
    "Oklahoma",
    "New Mexico",
    "Tennessee",
    "North Carolina",
    "Texas",
    "Arkansas",
    "South Carolina",
    "Alabama",
    "Georgia",
    "Mississippi",
    "Louisiana",
    "Florida",
    "Hawaii",
    "Yukon"
]
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-state
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| record_number |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| name |  |  |



## Topology



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-topology
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |
| name |  |  |
| srid |  |  |
| precision |  |  |
| hasz |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-topology
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 3. Get All


Returns all tpoplogy records.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/topology-all
```



### 4. Get By Key


Returns a single topology record.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/topology
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 5. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-topology
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 |  |



***Body:***



## Trip Log



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-trip-log
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| id | 892843 |  |
| state |  |  |
| rivername |  |  |
| reachid |  |  |
| datetaken |  |  |
| level |  |  |
| description |  |  |
| uid |  |  |
| deleted |  |  |
| observation |  |  |
| title |  |  |
| obs_time |  |  |
| reading |  |  |
| gaugeid |  |  |
| metric |  |  |
| edit_option |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-trip-log
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 3. Get All By Key


Get all trip logs associated with a reach.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/trip-logs
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| reachid |  |  |



***More example Requests/Responses:***


##### I. Example Request: Reach Trip Logs



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| reachid | 1002 |  |



##### I. Example Response: Reach Trip Logs
```js
[
    {
        "id": 891701,
        "state": "MT",
        "rivername": "@Flathead Buffalo Rapids: Kerr Dam to County Road Bridge",
        "reachid": 1002,
        "datetaken": "03/22/18",
        "level": null,
        "description": null,
        "uid": 2096,
        "deleted": false,
        "observation": null,
        "title": "Rafting on Buffalo Rapids! ",
        "obs_time": "2018-03-23T01:12:00.000Z",
        "reading": null,
        "gaugeid": 38188,
        "metric": null,
        "edit_option": 0
    }
]
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-trip-log
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| rivername | new name |  |



## Trip Log Photo



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-trip-log-photo
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |
| caption |  |  |
| rapidname |  |  |
| thumbnail |  |  |
| ext |  |  |
| isvideo |  |  |
| filesize |  |  |
| deleted |  |  |
| triplog_id |  |  |
| author |  |  |
| subject |  |  |
| detail |  |  |
| allowhtml |  |  |
| url |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-trip-log-photo
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 3. Get All By Key


Get all photos for a trip log.


***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/trip-log-photos
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| triplog_id |  |  |



***More example Requests/Responses:***


##### I. Example Request: Trip Log Photos



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| triplog_id | 1001 |  |



##### I. Example Response: Trip Log Photos
```js
[
    {
        "id": 19248,
        "caption": "Hueco Falls",
        "rapidname": "",
        "thumbnail": true,
        "ext": "jpeg",
        "isvideo": false,
        "filesize": "2403659",
        "deleted": false,
        "triplog_id": 1001,
        "author": "",
        "subject": "",
        "detail": "",
        "allowhtml": false,
        "url": null
    },
    {
        "id": 19437,
        "caption": "Buffalo Rapid",
        "rapidname": "",
        "thumbnail": false,
        "ext": "",
        "isvideo": false,
        "filesize": "0",
        "deleted": false,
        "triplog_id": 1001,
        "author": "",
        "subject": "",
        "detail": "",
        "allowhtml": false,
        "url": null
    },
    {
        "id": 31060,
        "caption": "suejavqa",
        "rapidname": "suejavqa",
        "thumbnail": false,
        "ext": "",
        "isvideo": false,
        "filesize": "0",
        "deleted": false,
        "triplog_id": 1001,
        "author": "suejavqa",
        "subject": "suejavqa",
        "detail": " vzyeeiwo http://ifuffleo.com klizuatt ejucfadd  <a href=\"http://xmqoyqah.com\">xkkwsyyf</a>  [URL=http://lwqhejhh.com]twkadunx[/URL] ",
        "allowhtml": false,
        "url": null
    },
    {
        "id": 32788,
        "caption": "gbvwegvc",
        "rapidname": "gbvwegvc",
        "thumbnail": false,
        "ext": "",
        "isvideo": false,
        "filesize": "0",
        "deleted": false,
        "triplog_id": 1001,
        "author": "gbvwegvc",
        "subject": "gbvwegvc",
        "detail": " <a href=\"http://etvkwevm.com\">hwpmrugp</a>  [URL=http://ywhemqze.com]iwyvsfbd[/URL]  ugxhzqqo http://liltbgyv.com jxjklmqm tqczfatc ",
        "allowhtml": false,
        "url": null
    },
    {
        "id": 19147,
        "caption": ".",
        "rapidname": "",
        "thumbnail": true,
        "ext": "",
        "isvideo": false,
        "filesize": "1662976",
        "deleted": false,
        "triplog_id": 1001,
        "author": "",
        "subject": "",
        "detail": "",
        "allowhtml": false,
        "url": null
    },
    {
        "id": 19151,
        "caption": ".",
        "rapidname": "",
        "thumbnail": true,
        "ext": "",
        "isvideo": false,
        "filesize": "1662976",
        "deleted": false,
        "triplog_id": 1001,
        "author": "",
        "subject": "",
        "detail": "",
        "allowhtml": false,
        "url": null
    },
    {
        "id": 32793,
        "caption": "aowkggck",
        "rapidname": "aowkggck",
        "thumbnail": false,
        "ext": "",
        "isvideo": false,
        "filesize": "0",
        "deleted": false,
        "triplog_id": 1001,
        "author": "aowkggck",
        "subject": "aowkggck",
        "detail": " kckpwrvb http://lmbplpzk.com inavzwll hfjqkgyo  [URL=http://aqkkpcdy.com]mquaszwt[/URL]  <a href=\"http://dkdvgfgr.com\">nqumtodt</a> ",
        "allowhtml": false,
        "url": null
    },
    {
        "id": 35512,
        "caption": "",
        "rapidname": "",
        "thumbnail": false,
        "ext": "",
        "isvideo": false,
        "filesize": "0",
        "deleted": false,
        "triplog_id": 1001,
        "author": "",
        "subject": "",
        "detail": "",
        "allowhtml": false,
        "url": null
    }
]
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-trip-log-photo
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***



## User



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/new-user
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| uid |  |  |
| uname |  |  |
| upass |  |  |
| verifydate |  |  |
| email |  |  |
| zip |  |  |
| address |  |  |
| city |  |  |
| state |  |  |
| country |  |  |
| lastlogin |  |  |
| volunteer |  |  |
| alerts |  |  |
| postal |  |  |
| memnum |  |  |
| address2 |  |  |
| home_phone |  |  |
| work_phone |  |  |
| journal |  |  |
| aw_beta |  |  |
| mbr_level |  |  |
| bad_addrr |  |  |
| bad_email |  |  |
| mod_date |  |  |
| record_type |  |  |
| name |  |  |
| mem_transation |  |  |
| transaction_id |  |  |
| expiration |  |  |
| modifydate |  |  |
| pushdate |  |  |
| mbr_relation |  |  |
| prefs |  |  |
| annual_renew |  |  |
| code |  |  |
| googleid |  |  |
| socialprofile |  |  |
| facebookid |  |  |
| epassword |  |  |
| remember_token |  |  |
| created_at |  |  |
| updated_at |  |  |



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:8000/delete-user
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| uid | 160557 |  |



### 3. Get By Key



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8000/user
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| uid |  |  |



***More example Requests/Responses:***


##### I. Example Request: User



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| uid | 160551 |  |



##### I. Example Response: User
```js
{
    "user": {
        "uid": "160551",
        "uname": "paddlebro420",
        "upass": "password",
        "verifydate": "1978-01-21",
        "email": "pb@aol.com",
        "zip": "28804-2200",
        "address": "123 Maple Street",
        "city": "Asheville",
        "state": "NC",
        "country": "United States",
        "lastlogin": "2019-01-21T01:26:51.000Z",
        "volunteer": 0,
        "alerts": 0,
        "postal": 0,
        "memnum": "12345",
        "address2": "",
        "home_phone": "123-456-7890",
        "work_phone": "",
        "journal": 0,
        "aw_beta": 1,
        "mbr_level": "Explorer",
        "bad_addr": 0,
        "bad_email": 0,
        "mod_date": "2019-01-24T06:00:07.000Z",
        "record_type": "Fam",
        "name": "Chad Smith",
        "mem_transaction": null,
        "transaction_id": null,
        "expiration": "2021-08-21T04:00:00.000Z",
        "modifydate": null,
        "pushdate": null,
        "mbr_relation": "Renewal",
        "prefs": null,
        "annual_renew": 1,
        "code": null,
        "googleid": null,
        "socialprofile": null,
        "facebookid": null,
        "remember_token": null,
        "created_at": null,
        "updated_at": null
    }
}
```


***Status Code:*** 200

<br>



### 4. Update



***Endpoint:***

```bash
Method: PUT
Type: URLENCODED
URL: http://localhost:8000/update-user
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| uid | 160558 |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| upass | update test |  |



## User Auth



### 1. Login


Create an accident report.


***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8000/user-login
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| email |  |  |
| password |  |  |



***More example Requests/Responses:***


##### I. Example Request: Login



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| email | foo@email.com |  |
| password | password |  |



##### I. Example Response: Login
```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZvb0Bhb2wuY29tIiwiaWF0IjoxNTk0Njg2MzMwLCJleHAiOjE1OTQ2ODY2MzB9.ddefDTo6yHQNwDE-y7Nn2BRk74cwVsJBkzlgbzXmp_E"
}
```


***Status Code:*** 200

<br>



***Available Variables:***

| Key | Value | Type |
| --- | ------|-------------|
| base_url | http://localhost:8000 |  |


