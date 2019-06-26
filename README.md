# avian-influenza

API for avian influenza information which could be used to visually represent spatial distribution of different types of viruses in different locations.

API contains requests for data about specific virus, its location, and general statistics.

## Usage

All responses will have a form:

```json
{
    "data": "Content of response",
    "message": "Description of response",
    "status": "Status of the response",
    "error": "Error or null"
}
```

Subsequent response definitions will only detail the expected values of `data` field

### List of all viruses' types (disease and serotype)

**Definition**

`GET /virus/type`

**Response**

- `200 OK` on success

```json
{
    "data": [
        {
            "id": "virus id",
            "disease": "avian-influenza",
            "serotype": "H5N6 HPAI",
        }
    ],
    "message": "Data retrieved or null",
    "status": 200,
    "error": null
}
```

### Get specific virus type

**Definition**

`GET /virus/type/<virus_identifier>`

**Arguments**

ID of the virus about which information is requested

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `404 NOT FOUND` if virus is not found

```json
{
    "data": {
        "id": "virus id",
        "disease": "avian-influenza",
        "serotype": "H5N6 HPAI",
    },
    "message": "virus has been found or null",
    "status": 200,
    "error": null,
}
```

### Get data about viruses

**Definition**

`GET /virus`

**Response**

`200 OK` on success

```json
{
    "data": [
        {
            "status": "Confirmed",
            "region": "Americas",
            "country": "United States of America",
            "admin1": "California",
            "locality_name": "Monterey County",
            "locality_quality": "Exact",
            "longitude": -121.656,
            "latitude": 36.378,
            "observation_date": "15/04/2019",
            "reporting_date": "24/04/2019",
            ...
        }
    ]
}
```

### Get data about specific virus

**Definiton**

`GET /virus/<virus-identifier>`

**Arguments**

ID of the virus about which information is requested

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `404 NOT FOUND` if virus is not found

```json
{
    "data": {
        "status": "Confirmed",
        "region": "Americas",
        "country": "United States of America",
        "admin1": "California",
        "locality_name": "Monterey County",
        "locality_quality": "Exact",
        "longitude": -121.656,
        "latitude": 36.378,
        "observation_date": "15/04/2019",
        "reporting_date": "24/04/2019",
        ...
    },
    "message": "virus has been found or null",
    "status": 200,
    "error": null,
}
```

### Get virus' raw coordinates

**Definition**

`GET coordinates/<virus-indentifier>`

**Arguments**

ID of virus which coordinates are required

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `404 NOT FOUND` if virus is not found

```json
{
    "data": {
        "region": "Americas",
        "country": "United States of America",
        "admin1": "California",
        "locality_name": "Monterey County",
        "locality_quality": "Exact",
        "longitude": -121.656,
        "latitude": 36.378,
    },
    "message": "Virus raw location was found",
    "status": 200,
    "error": null,
}
```

### Get virus' location as spatial geometry field

### Get all viruses of specific type

### Get virus statistics

**Definition**

`GET /statistics/<virus-identifier>`

**Arguments**

ID of virus which statistics is required

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `404 NOT FOUND` if virus is not found

```json
{
    "data": {
        "sum_at_risk": 200,
        "sum_cases": 300,
        "sum_deaths": null,
        "sum_destroyed": null,
        "sum_slaughtered": 1524,
        "humans_gender_desc": "Male",
        "human_age": 24,
        "humans_affected": 23453,
        "human_deaths": 0,
    },
    "message": "Virus statistics was found",
    "status": 200,
    "error": null,
}
```

### Get virus' sources

### Create new virus entry

**Definition**

`POST /virus`

**Arguments**

Properties and values of new entry

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` if user is unauthorized to add new entries

```json
{
    "data": null,
    "message": "Entry was successfully created",
    "status": 200,
    "error": null,
}
```

### Update virus information

**Definition**

`PATCH /virus/<virus-identifier>`

**Arguments**

Properties and values to change

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `404 NOT FOUND` if virus is not found

```json
{
    "data": null,
    "message": "Values have been updated",
    "status": 200,
    "error": null,
}
```

### Delete virus entry

**Definition**

`DELETE /virus/<virus-identifier>`

**Arguments**

ID of virus which needs to be deleted

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `404 NOT FOUND` if virus is not found

```json
{
    "data": null,
    "message": "Virus entry was successfully deleted",
    "status": 200,
    "error": null,
}
```

### Get user info

**Definition**

`GET /user/<user-identifier>`

**Arguments**

ID of the user

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `404 NOT FOUND` if user is not found

```json
{
    "data": {
        "firstname": "John",
        "lastname": "Doe",
        "email": "john@doe.com",
        "role": "admin",
        "created_on": "0000/00/00",
        "updated_on": "0000/00/00",
    }
}
```

### Create new user

**Definition**

`POST /user`

**Arguments**

Properties and values of new user

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization failed

```json
{
    "data": null,
    "message": "User was successfully created",
    "status": 200,
    "error": null,
}
```

### Update existing user

**Definition**

`PATCH user/<user-identifier>`

**Arguments**

Properties and values to update

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `404 NOT FOUND` if user is not found

```json
{
    "data": null,
    "message": "User was successfully updated",
    "status": 200,
    "error": null,
}
```
### Delete user

**Definition**

`DELETE /user/<user-identifier>`

**Arguments**

ID of user which needs to be deleted

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `404 NOT FOUND` if user is not found

```json
{
    "data": null,
    "message": "User was successfully deleted",
    "status": 200,
    "error": null,
}
```
