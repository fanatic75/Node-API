# NODE-API

A simple node js api

Requirements
Node : 12.13.6
MYSQL : 8.0
Yarn

#Start Command

1.Through command terminal, move to the project directory and run 'Yarn Install'
2.Run 'Yarn start'

API Routes
REQUEST TYPE URL RETURN
GET /cost-explorer/ JSON Array Output of All clients  
GET /cost-explorer/clients=1&clients=2 JSON Array Ouput of Client 1 and Client 2  
GET /cost-explorer/clients=1&clients=2&projects=1 JSON ARRAY Ouput of Client 1 Containing project 1
GET /cost-explorer/cost_types=1&cost_types=2 JSON Array Output of all the clients with their projects containing cost type 1 and cost type 2
GET /cost-explorer/clients=1&projects=2&cost_types=3 JSON Array Output of client 1 containing project 2 with cost type 3

There are some problems explained in the following points:

1. Amount for Particular Projects are not coming up in the output. I'm having trouble to print these out because of the repition of attribute names in multiple tables.
2. Amount of the inner most cost type is also not coming up again because of same attribute name , again the ambiguous column name error found in sequelize library. Still working on these errors.

Error is : (attribute name is ambiguous)
