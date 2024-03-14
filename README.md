# ekoapka
![trello vs app view](/public/assets/ekoapka.png)
ekoapka is an app that simplifies volunteers' shift in a polish animal care non-profit organization. It was primarily designed to be used in mobile version. It retrieves data from trello to keep one source of truth and let volunteers decide if they want to become users. App is currently available only in polish.


## launch locally
1. Clone repo
2. Setup a postgress database
3. Create ```.env``` file according to ```.env.example```
4. ```npm i```
5. ```npm run dev```

## features
* view cats and dogs data from trello
* choose fields to display 
* shift checklist for single user
* add notes during shift
* newbie mode - temporary access without being trello board member

### to do
* sharing shifts with different users
* admins 