# ekoapka (trello-volunteer)
![trello vs app view](/public/assets/ekoapka.png)
[still in progress]

ekoapka is an app that simplifies volunteers' shift in a polish animal care non-profit organization. It is designed to be used mostly in a mobile version. It retrieves data from trello to keep one source of truth and let volunteers decide if they want to become users. App is currently available only in polish.


## launch locally
1. Clone repo
2. Setup a postgres database
3. Create ```.env``` file according to ```.env.example``` 
   * [!WARNING] watch out, you need a trello board with a specific structure right now - lists: upperCatRoom, lowerCatRoom, quarantine and some dog lists; - cards with description in format
4. ```npm i```
5. ```npm run dev```

## features
* view cats and dogs data from trello
* choose fields to display 
* a shift checklist for a single user
* add notes during a shift
* newbie mode - temporary access without being a trello board member

### to do
* sharing shifts with different users (realtime - websockets)
* admins 