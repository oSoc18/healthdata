# healthdata project
This repository holds the code for the healthdata project, aka Health Story. It consists of two directories, one holding the frontend code and one holding the backend code.

## running the project
This project uses [docker](https://docs.docker.com/install/) and  [docker-compose](https://docs.docker.com/compose/install/).

Add your Google API Key :
  - create a "docker-compose.override.yml" with:
  ```
  version: '3'

  services:
    api:
      environment:
        - "GOOGLE_API_KEY=YOUR_KEY"
  ```

```
docker-compose build
docker-compose up -d
docker-compose exec api python manage.py migrate # only when you need to run migrations (make sure the db is up)

#import data using bonobo
docker-compose exec api python manage.py historicaldata
docker-compose exec api python manage.py importDetailedHospitals
docker-compose exec api python manage.py importbedshistory
docker-compose exec api python manage.py importpopulation
docker-compose exec api python manage.py importpopulationdetailed
docker-compose exec api python manage.py importdepression
docker-compose exec api python manage.py importcancer
```

Full API Documentation available in: /backend/swagger.yaml

To access the apis :
* http://localhost:8000/api/hospitals
* http://localhost:8000/api/population
* http://localhost:8000/api/populationdetailed
* http://localhost:8000/api/depression (optional query params: year, agegroup, province, gender)
* http://localhost:8000/api/cancer
* http://localhost:8000/api/hospital-networks
* http://localhost:8000/api/hospital-networks/[id]/beds (optional query params: type, year)
* http://localhost:8000/api/departments

The backend should be available on http://localhost:8000 and the frontend should be available on http://localhost:9000

#### To run the frontend locally with hot reloading:

Requires Node version >= 8.0.0

`yarn` or `npm install`  
`yarn start` or `npm start`

Requires a `.env` file in the root of the frontend folder to run. This should contain your API URL as `REACT_APP_API_URL`.  
Example if using the standard docker configuration and port:
```
REACT_APP_API_URL=http://localhost:8000/api
```

## data sources
* depression_data.csv comes from : https://hisia.wiv-isp.be/SitePages/Home.aspx
* cancer.csv comes from : http://www.kankerregister.org/default.aspx?url=Statistiques_tableaux%20annuelle
* hospital data was retrieved from http://fair-acc.healthdata.be
