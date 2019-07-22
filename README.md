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

Error format:

```json
    {
        "code": "FIELDS_VALIDATION_ERROR",
        "message": "One or more fields raised validation errors.",
        "fields": {
            "email": "Invalid email address.",
            "password": "Password too short."
        }
    }
```

Subsequent response definitions will only detail the expected values of `data` field

All request must follow version identifier:

**Version: 1.0.0** `/v1/`

## Data

### List of all virus' types (disease and serotype)

---

**Definition**

`GET /data/type`

**Arguments**

Query (Optional):

- `id` data entry id

**Response**

- `200 OK` on success

```json
{
    "data": [
        {
            "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
            "disease": "avian-influenza",
            "serotype": "H5N6 HPAI",
        }
    ],
    "message": "Entry was successfully retrieved",
    "status": 200,
    "error": null
}
```

### Get data about viruses

---

**Definition**

`GET /data`

**Arguments**

Query (Optional):

- `id` to get data of specific virus
- `type` to get data of specific virus type
- `region` to get data from specific region
- `start date` to get specific data range
- `end date` to get data of specific range

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `404 NOT FOUND` if virus is not found

```json
{
    "data": [
        {
            "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
            "disease": "avian-influenza",
            "serotype": "H5N6 HPAI",
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
            "sum_at_risk": 200,
            "sum_cases": 300,
            "sum_deaths": null,
            "sum_destroyed": null,
            "sum_slaughtered": 1524,
            "humans_gender_desc": "Male",
            "human_age": 24,
            "humans_affected": 23453,
            "human_deaths": 0,
        }
    ],
    "message": "Entry was successfully retrieved",
    "status": 200,
    "error": null,
}
```

### Create new virus entry

---

**Definition**

`POST /data`

**Arguments**

Properties and values of new entry

**Response**

- `201 CREATED` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` if user is unauthorized to add new entries
- `409 CONFLICT` data entry already exists

```json
{
    "data": {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "disease": "avian-influenza",
        "serotype": "H5N6 HPAI",
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
    "message": "Entry was successfully created",
    "status": 201,
    "error": null,
}
```

### Update virus information

**Definition**

`PATCH /data/<virus-identifier>`

**Arguments**

Path (Required):

- `id` data entry id

Body (Required):

- Properties and values to change

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `404 NOT FOUND` if virus is not found

```json
{
    "data": {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "region": "Americas",
        "country": "United States of America",
        "admin1": "California",
        "locality_name": "Monterey County",
        "locality_quality": "Exact",
    },
    "message": "Values have been updated",
    "status": 200,
    "error": null,
}
```

### Delete virus entry

**Definition**

`DELETE /data/<virus-identifier>`

**Arguments**

Path (Required):

- `id` data entry ID

**Response**

- `204 NO CONTENT` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `404 NOT FOUND` if virus is not found

```json
{
    "data": null,
    "message": "Virus entry was successfully deleted",
    "status": 204,
    "error": null,
}
```

## Users

### Get user info

**Definition**

`GET /users`

**Arguments**

Query (Optional):

- `id` user's id

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `404 NOT FOUND` if user is not found

```json
{
    "data": {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
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

Body (Required):

- `firstname` user's first name
- `lastname` user's last name
- `role` user's role
- `email` user's email
- `password` user's password
- `created_on` date of creation

**Response**

- `201 CREATED` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization failed
- `409 CONFLICT` on user already exists

```json
{
    "data": {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john@doe.com",
        "role": "admin",
    },
    "message": "User was successfully created",
    "status": 201,
    "error": null,
}
```

### Update existing user

**Definition**

`PATCH user/<user-identifier>`

**Arguments**

Path (Required):

- `id` user's id

Body (Required):

- Properties and values to update

**Response**

- `200 OK` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `404 NOT FOUND` if user is not found

```json
{
    "data": {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "firstname": "Jonathan",
    },
    "message": "User was successfully updated",
    "status": 200,
    "error": null,
}
```

### Delete user

**Definition**

`DELETE /user/<user-identifier>`

**Arguments**

Path (Required):

- `id` user which needs to be deleted

**Response**

- `204 NO CONTENT` on success
- `400 BAD REQUEST` on request validation fail
- `401 UNAUTHORIZED` on user authorization fail
- `403 FORBIDDEN` on user token invalid
- `404 NOT FOUND` if user is not found

```json
{
    "data": null,
    "message": "User was successfully deleted",
    "status": 204,
    "error": null,
}
```
