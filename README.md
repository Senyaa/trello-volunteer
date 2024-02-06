# ekoapka
![trello vs app view](/public/assets/ekoapka.png)
ekoapka is an app that simplifies volunteer animal care in a polish animal care non-profit organization. It was designed to primarily be used in mobile version. It uses data from trello to keep one source of truth and let users decided if they want to use it. App is currently available only in polish.


## launch locally
1. Clone repo
2. Setup a postgress database
3. Create ```.env``` file according to ```.env.example```
4. ```npm i```
5. ```npm run dev```

## features
* view data from trello
* choose fields to display 
* shift checklist for single user

### to do
* sharing shifts with different users
* add notes during shift
* newbie mode - temporary access without being trello board member
* admins 