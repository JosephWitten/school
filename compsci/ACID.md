A - Atomic

C - Consistent

I - Isolated

D - durability

**Atomic**

- All or nothing
If any data is lost or an error is hit, the whole transaction is cancelled and any changes undone (a rollback)

**Isolated** 

The statements are executed in a seemingly sequential way.

Only one transaction happens at once, two people cannot book the same ticket at once, the other person is locked out or placed in a queue.

**Consitent** 

All of the types are checked after transaction and consitentcy is met. All of the rules of the database is applied at all times

**Durability**

The effects of commited transaction are permanently stored on a non volatile storage.
- wont changed if power outage or unexpected shut down

**Referential integrity** is a concept that ensures that relationships between tables remiain consistent.
- If there is a foriegn key, it *must* link back to a primary key

**cascading update** ensures that changes made to the linked table are reflected in the primary table.
eg if a user is removed from the USER table, all of the things in other tables that are linked to them are removed

**Record locking** is when a record is locked in order to stop multiple users accessing data simulatenously

**redundant information** can
- be inefficient
- take up storage
- make querying take longer

positives:
- safeguard data (acts as a backup)