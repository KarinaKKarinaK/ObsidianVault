**Database** = structured set of data held in a computer (ideally organized in a way that it can easily be accessed, managed, and updated)

## Some database definitions

**Query**
Single action rtaken on a database, a request presented in a predefined format. (e.g. SELECT, INSERT, UPDATE, or DELETE). "Query" can also describe a request from a user for information from a database

**Transaction**  
A transaction is a sequence of operations ([[Queries]]) that make up a single unit of work performed against a database

**ACID: Atomicity, Consistency, Isolation, Durability** 
In most popular databases, a transaction is only qualified as a transaction if it exhibits the four “ACID” properties:  
- **_Atomicity_:** Each transaction is a unique, atomic unit of work. If one operation fails, data remains unchanged.  
- **_Consistency_:** All data written to the database is subject to any rules defined. When completed, a transaction must leave all data in a consistent state.  
- **_Isolation_:** Changes made in a transaction are not visible to other transactions until they are complete.  
- **_Durability_:** Changes completed by a transaction are stored and available in the database, even in the event of a system failure.

**Schema**
A skeleton structure of a database; a logical blueprint of how the database is constructed and how things relate to each other. Schemas can be:
- ***static =*** defined before a program is written
- ***dynamic =*** defined by the program or data itself
![[Pasted image 20260108164003.png]]
**DBMS: Database Management System**
From Wikipedia: “A database management system is a software application that interacts with the user, other applications, and the database itself to capture and analyze data. A general-purpose DBMS is designed to allow the definition, creation, querying, update, and administration of databases.” MySQL, PostgreSQL, Oracle; these are database management systems.

**Middleware**
(Database-oriented) middleware is all the software that connects some application to some database. (Middleware might also facilitate access to a DBMS via a web server for example, without having to worry about database-specific characteristics.)

**Scalability**
Scalability is simply the ability of a database to handle a growing amount of data.

There are 2 types of scalability:
- ***Vertical scalability*** = adding more capacity to a single machine. (virtually every database is vertically scalable)
- ***Horizontal scalability*** = adding capacity by adding more machines. The DBMS needs to be able to partition, manage, and maintain data across all machines.

The picture on the left = vertical vs right = horizontal scalability

![[Pasted image 20260108165155.png]]
##### **Distributed vs Centralized Databases**

###### **Memory Hook**

> **Centralized = Simplicity & Control**  
> **Distributed = Scale & Performance**

| Aspect                          | Centralized Database                                                     | Distributed Database                                                     |
| ------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| **Structure**                   | One single database file                                                 | Multiple database files                                                  |
| **Location**                    | Stored in one location on a network                                      | Stored across multiple physical locations (controlled by a central DBMS) |
| **Control**                     | Managed by a single DBMS                                                 | All databases are controlled by a central DBMS                           |
| **Complexity**                  | Simpler to design and manage                                             | More complex to design and maintain                                      |
| **Data consistency & updates**  | Easier to maintain data integrity and consistency                        | Requires extra work to keep data up-to-date and avoid redundancy         |
| **Risk of stale data**          | Low risk: once data is updated, outdated versions do not exist elsewhere | Higher risk: multiple copies can become outdated if not synchronized     |
| **Performance & load handling** | Can become a bottleneck with many requests                               | Supports parallelization, balancing load across servers                  |
| **Scalability**                 | Limited scalability                                                      | Highly scalable                                                          |
| **Fault tolerance & recovery**  | Harder to recover lost or overwritten data due to lack of copies         | Easier recovery due to multiple copies across locations                  |
| **Typical use cases**           | Small systems, simple applications                                       | Large-scale systems, high-traffic applications                           |
### **There are multiple types of databases:**
- Hierarchical databases
- Relational databases
- Non-relational (NoSQL) databases
- Cloud databases
- Centralized databases
- Distributed databases
- Object-oriented databases
- Graph databases

#### Relational
Has nothing to do with relational as in relationships, its about relations from relational algebra.
- In a relational database each relation is a set of tuples. Each tuple is a set of attributed, which represents a single item in the database.
- Each tuple (“row”) in a relation (“table”) shares the same attributes (“columns”). Each attribute has a well-defined data type (int, string, etc), defined ahead of time — schema in a relational database is static.  
- Examples include: Oracle, MySQL, SQLite, PostgreSQL

![[Pasted image 20260108165748.png]]

**SQL = Structured Query Language**
SQL is a programming language based on relational algebra used to manipulate and retrieve data in a relational database

**JOIN operations**  
A JOIN operation combines rows from multiple tables in one query.

**Normalization and Denormalization**
- **Normalization** = the process of organizing the relations and attributes of a relational database in a way that reduces redundancy and improves data integrity (accurate, consistent, up-to-date data). 
	- Data might be arranged based on dependencies between attributes, (e.g. we can prevent repeating information by using JOIN operations). 
- **Denormalization** = the process of adding redundant data in order to speed up complex [[Queries]]. We might include the data from one table in another to eliminate the second table and reduce the number of JOIN operations.

**ORM: Object-Relational Mapping**  
ORM = a technique for translating the logical representation of objects (as in object-oriented programming) into a more atomized form that is capable of being stored in a relational database (and back again when they are retrieved).

#### Non-Relational (NoSQL) Databases
A "non-relational" database is one that doesn’t use the relational model; no relations (tables) with tuples (rows) and attributes (columns). This title covers a pretty wide range of models, typically grouped into four categories: key-value stores, graph stores, column stores, and document stores.

#### **Key-Value Store**  
- Key-value stores don’t use the pre-defined structure of relational databases, but instead treat all of their data as a single collection of items.
- Like a map or a dictionary, each **key-value pair** defines a link between some unique “key” (like a name, ID, or URL) and its “value” (an image, a file, a string, int, list, etc). There are no fields, so the entire value must be updated if changes are made. Key-value stores are generally fast, scalable, and flexible.  
- Examples include: Dynamo, MemcacheDB, Redis

#### **Graph Store**  
- Using graph structures, this type of database is made for dealing with interconnected data ( e.g. social media connections, a family tree, or a food chain). 
- Items in the database are represented by “nodes”, and “edges” directly represent the relationships between them. Both nodes and edges can store additional “properties”: id, name, type, etc.
- Think "Knowledge & Data" univeristy course
- The strength of a graph database is in traversing the connections between items, but their scalability is limited.  
- Examples include: Allegro, OrientDB, Virtuoso
![[Pasted image 20260108170411.png]]

**Object or Object-Oriented Database**  
Not as common as other non-relational databases, an object or object-oriented database is ones in which data is represented in the form of “objects” (with attributes and methods) as used in object-oriented programming. This type might be used in place of a relational database and ORM, and may make sense when the data is complex or there are complex many-to-many relationships involved. Beware its language dependence and difficulty with ad-hoc [[Queries]] though.

### Common Architectures
Client → API → Database  
AI Model → Database → Dashboard

## More resources:
- https://www.codecademy.com/article/database-guide
- https://medium.com/@rwilliams_bv/intro-to-databases-for-people-who-dont-know-a-whole-lot-about-them-a64ae9af712

## Further (more advanced) database topics:

- Query optimization
    
- Index tuning
    
- Sharding
    
- Replication
    
- Read replicas
    
- Caching (Redis)