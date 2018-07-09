# healthdata backend
this directory holds the healthdata backend. It's written in python and uses the django rest framework.

## running it
It is recommended to run the backend from the docker-compose.yml provided in the project root. If required you can run the docker image manually with the following commands:

```
docker build -t 'healthdata/backend' .
docker run --name db -d postgres
docker run --rm --link db:db 'healthdata/backend' python manage.py migrate
docker run -v $PWD:/app -8000:8000 --link db:db -it 'healthdata/backend'
```


## reading material
http://www.django-rest-framework.org/tutorial/1-serialization/
https://docs.docker.com/compose/django/ (project is set up in a somewhat similar fashion)
