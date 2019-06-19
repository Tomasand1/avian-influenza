# avian-influenza

## Usage

All responses will have a form 

```json
{
    "data": "Content of response",
    "message": "Description of response",
    "status": "Status of the response",
    "error": "Error or null"
}
```

Subsequent response definitions will only detail the expected values of `data` field

### List of all locations

**Definition**

`GET /locations`

**Response**

- `200 OK` on success

```json
{}
```
