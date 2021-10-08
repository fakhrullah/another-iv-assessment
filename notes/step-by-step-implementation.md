# Building the system

1. Understand the requirements.

## 1. Understand the requirements

[See note of the requirements](task-requirement.md)

## 2. How I am going to do this

4 keys when build something:

1. Functional - make the system working as expected

2. Timeline - how long its gonna take. Build fast or build correctly. I did not receive hard deadline here, but I do not want to spent a lot. So, the result should be good enough.
   
3. Code quality - focus on functional with good enough quality. Then refactor later. Should have:
   - Separate dir for development & production `src` & `dist`
   - Use linter
   - Tests (at least unit test)

4. UI quality - UI quality is not the requirement. So, will use familiar Chakra UI because I am familiar with it.
   
Make things work with familiar tech stack & only 1-2 new tech. Then refactor with technology specified by requirements.

- [x] Start with wireframe of the frontend to understand more about the system. [<sup>2.1</sup>](#21-understand-more-about-the-system)
- [x] Decide on data structure [<sup>2.2</sup>](#22-data-structure)
- [ ] Build frontend
  - [ ] Tech stack decision
  - [ ] Setup. Build tools, linter, 
- [ ] Build Order App micro-service
  - [ ] Tech stack decision
- [ ] Build Payment App micro-service
  - [ ] Tech stack decision

### 2.1 Understand more about the system

Architecture draft

![Architecture draft](./architecture.jpg)

Wireframe order portal

![wirefram order portal](./order-portal-wireframe.jpg)

### 2.2 Data structure

Data design is important should really spent time to discuss & plan about the design.

```
# Order App (postgres)
  |- order_table - 
  |  |- _id - UUID
  |  |- status - order_status_lookup.key
  |  |- user_id -
  |  |- notes - string, text
  |  |- order_detail - Array of order_detail_table
  |  |- total_price
  |  |- phone_num
  |  |- created_at
  |  |- updated_at
  |
  |- order_detail_table 
  |  |- _id - UUID
  |  |- order_id - order_table.id - one-to-many
  |  |- item_detail - JSON
  |  | |- a copy detail of item, so that still has data even after
  |  |    item is delete by seller 
  |  |- created_at
  |  |- updated_at
  |
  |- order_status_lookup
  |  |- key - string unique primary_key
  |  |  |- created
  |  |  |- confirmed
  |  |  |- delivered
  |  |  |- cancelled
  |  |
  |  |- name - string 
  |  |- created_at
  |  |- updated_at

# Payment App (mongodb)
  |- transactions
  |  |- ObjectId - MongoObjectID
  |  |- orderId 
  |  |- userId
  |  |- createdAt
  |  |- updatedAt
```

