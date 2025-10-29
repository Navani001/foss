curls:

curl -X POST http://localhost:5000/login \
-H "Content-Type: application/json" \
-d '{"username": "admin", "password": "12345"}'



curl http://localhost:5000/blogs


curl -X POST http://localhost:5000/blogs \
-H "Content-Type: application/json" \
-H "Authorization: <TOKEN>" \
-d '{"title": "New Blog", "content": "This is a protected post."}'


curl http://localhost:5000/blogs/1


curl -X PUT http://localhost:5000/blogs/1 \
-H "Content-Type: application/json" \
-H "Authorization: <TOKEN>" \
-d '{"title": "Updated Blog", "content": "Updated content here."}'


curl -X DELETE http://localhost:5000/blogs/1 \
-H "Authorization: <TOKEN>"
