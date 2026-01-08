A backend API == middleman between:
- Frontend (web/mobile app)
- Databse / Logic / AI models

what the API does:
- receives requests
- processes logic
- "talks" to databases
- and sends responses (usually JSON)

```python
Frontend → API → Database / Services → API → Frontend
```

### HTTP Basics

***APIs use HTTP requests.***

| Method | Purpose     |
| ------ | ----------- |
| GET    | Fetch data  |
| POST   | Create data |
| PUT    | Update data |
| DELETE | Remove data |
#### Endpoints
**endpoint** = URL + method

*Examples:*
- POST /login
- GET /products
- PUT /users/42

### REST APIs (most important)
 **REST** = rules for designing APIs

**Key principles:**

- Stateless (no memory between requests)
    
- Uses HTTP methods properly
    
- Returns JSON
    
- Clear resource-based URLs

![[Pasted image 20260107205527.png]]
**Good REST:**
GET /users
GET /users/1
POST /users

**Bad REST:**
GET /getUserData?id=1

## API Example with Node.js and Express

```javascript
import express from "express";
const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({ message: "Hello API" });
});

app.listen(3000);
```

Call it with: GET http://localhost:3000/hello

## Authentication (VERY IMPORTANT)

### JWT (most common)

1. User logs in
2. Server returns **token**
3. Frontend sends token in headers

`Authorization: Bearer eyJhbGciOi...`

Server verifies token --> allows access

**Never:** store passwords in plain text or end tokens in URLs

## API + Database Flow

1. Request arrives
    
2. Validate data
    
3. Query database
    
4. Return result
    

Example:
```js
app.get("/users/:id", async (req, res) => {
  const user = await db.users.findById(req.params.id);
  res.json(user);
});
```


## Error Handling
| Code | Meaning      |
| ---- | ------------ |
| 200  | OK           |
| 201  | Created      |
| 400  | Bad request  |
| 401  | Unauthorized |
| 404  | Not found    |
| 500  | Server error |

## Best Practices

- Use clear endpoint names  
- Validate input  
- Never trust frontend  
- Version APIs (`/api/v1/`)  
- Use environment variables  
- Log errors


## REST Principles

**REST (Representational State Transfer)** defines how APIs should behave.

- **Client–server separation**  
    → Client and server are independent
    
- **Statelessness**  
    → Each request contains all required information

- **Resource-based URLs**  
    → Endpoints represent resources, not actions
    - `/users`
    - `/orders/123`

- **HTTP methods**
    
    - `GET` → read
        
    - `POST` → create
        
    - `PUT/PATCH` → update
        
    - `DELETE` → remove
        
- **Standard HTTP status codes**
    
    - `200 = OK`
        
    - `400 = Bad Request`
        
    - `401 = Unauthorized`
        
    - `404 = Not Found`

### API Design

**API design** focuses on clarity, consistency, and usability.

- **Clear naming**
    
- **Versioning**    
    - E.g. `/v1/users`, versioning prevents breaking clients
        
- **Consistency**
    
    - Same patterns across endpoints
        
- **Pagination & filtering**
	*Examples:*
    - `?page=1&limit=20`
    - `?status=active`
        
- **Error handling**
    - Meaningful error messages + Predictable response format

### Auth Strategies 

**Authentication & authorization** control access to APIs.

- **API keys** --> simple but limited security
    
- **JWT (JSON Web Tokens)**
    
    - Stateless authentication; sent in request headers
    
- **OAuth 2.0**
    - Secure delegated access
    - Used for third-party logins

- **Role-based access control (RBAC)** --> Permissions based on user roles
    

### Rate Limiting

**Rate limiting** protects APIs from abuse and overload.
- Limits number of requests per user or IP
- It **prevents:**
    - DDoS attacks
    - Server overload

**Common strategies:**
- Fixed window
- Sliding window
- Token bucket

*Response example:* `429 Too Many Requests`

### Caching Patterns

**Caching** improves API performance and reduces load.

- **Client-side caching** => Browser or app stores responses
- **Server-side caching** => Cache frequent responses
    
- **HTTP caching headers**
    - `Cache-Control`
    - `ETag`

- **Cache invalidation**: Update or clear cache when data changes
Trade-off:  **Speed vs data "freshness"**


#### API Memory Shortcuts:

**REST = rules**  
**Design = clarity**  
**Auth = security**  
**Rate limiting = protection**  
**Caching = speed**

