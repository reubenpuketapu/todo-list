=======================
How to use the system:
=======================

To use this system you need you can use it just as a you would in the last project.

——————————————————————————————
To open the local version:

1.	In bash: node index.js

2.	open localhost:8080 in browser 

——————————————————————————————
To open on Heroku:

1. 	open https://cryptic-sands-19648.herokuapp.com/ in browser

——————————————————————————————

Both of the above methods use the same database on AWS, so an internet connection must be active.

=======================
What the REST interface is:
=======================
CURL Test Commands:

——————————————————————————————
GET:
All of the task items:

curl https://cryptic-sands-19648.herokuapp.com/get

curl localhost:8080/get


——————————————————————————————
GET:
Simple hello ‘name’ response:

curl https://cryptic-sands-19648.herokuapp.com/hello/name

curl localhost:8080/hello/name

——————————————————————————————
GET:
Simple successful response:

curl https://cryptic-sands-19648.herokuapp.com/test

curl localhost:8080/test


——————————————————————————————
POST:
Add a new task item:

curl --data "" https://cryptic-sands-19648.herokuapp.com/post/name/false

curl --data "" localhost:8080/post/name/false

Can replace "name" in the url to any name to be added.

——————————————————————————————
PUT:
Change a task item to done:

curl -X PUT https://cryptic-sands-19648.herokuapp.com/put/name/true

curl -X PUT localhost:8080/put/name/true

Can replace "name" in the url to any name to be changed.
Also can change "true" to "false" to make the task not completed.

——————————————————————————————
PUT:
Remove a task item:

curl -X PUT https://cryptic-sands-19648.herokuapp.com/remove/name

curl -X PUT localhost:8080/remove/name

Can replace "name" in the url to any name to be removed.

——————————————————————————————

=======================
Error Handing
=======================

Server side:

For each request to the server there is a function to check if the response had an error or not, if there was an error in the query to the database, a 404 error is sent to the client then an error message is output to the clients console.

Client side:

If there is a bad response from the server there is a an output to the console.

