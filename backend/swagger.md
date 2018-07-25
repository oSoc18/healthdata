HealtStory API
==============
**Version:** 1.0.0

### /hospitals
---
##### ***GET***
**Summary:** Returns a list of hospitals

**Description:** Provides all the information about all the hospitals

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | A JSON array of hospitals | [ object ] |

### /hospitals/{hospitalId}/
---
##### ***GET***
**Summary:** Returns a hospital by ID

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| hospitalId | path | ID of hospital to fetch | Yes | long |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation | object |
| 404 | Hospital Not Found |  |

### /population
---
##### ***GET***
**Summary:** Returns the population for each province from 2010 to 2017

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | 3 JSON objects. 1) Male, 2) Female, 3) Male and Female with the population for each province | [ object ] |

### /depression
---
##### ***GET***
**Summary:** Returns the percentage of depressed people for each province in 2001, 2004, 2008, 2013

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| year | query | Data for a certain year | No | integer |
| agegroup | query | Data for a certain age group | No | string |
| province | query | Data for a certain province | No | string |
| gender | query | Data for a certain gender | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | A JSON array with all the percentages | [ object ] |

### /cancer
---
##### ***GET***
**Summary:** Returns the amount of people having different type of cancer in Belgium

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | A JSON array with the amount of each type of cancer and multiple age groups | [ object ] |

### /cancer/{cancerId}
---
##### ***GET***
**Summary:** Returns the amount of people having different type of cancer in Belgium

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| cancerId | path | ID of Cancer data to fetch | Yes | long |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | A JSON array with the amount of each type of cancer and multiple age groups | [ object ] |
| 404 | Cancer Id Not Found |  |

### /hospital-networks
---
##### ***GET***
**Summary:** Returns all the hospital networks in Belgium

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | A JSON array with each hotpital network | [ object ] |

### /hospital-networks/{id}/beds
---
##### ***GET***
**Summary:** Returns all the hospital networks in Belgium

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Hospital-Network ID | Yes | long |
| year | query | Amount of bed in a certain year | No | integer |
| type | query | Amount of bed of a certain type (Department-code) | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | A JSON array with the amount of bed for each department | [ object ] |

### /departments
---
##### ***GET***
**Summary:** Returns all the departments possible for a hospital in Belgium and the total amount of bed for each

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | A JSON array with each department and the total amount beds of it in Belgium | [ object ] |
