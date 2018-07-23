import pandas as pd
import requests
import logging
import time
#run
#geocode('example_geocode.xlsx', 'example_geocode_convert.csv', 'Address')
def get_google_results(address, api_key=None, return_full_response=False):

    geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?address={}".format(address)
    if api_key is not None:
        geocode_url = geocode_url + "&key={}".format(api_key)
        
    # ping google for the reuslts:
    results = requests.get(geocode_url)
    # results will be in JSON format - convert to dict using requests functionality
    results = results.json()
    
    # if there's no results or an error, return empty results.
    if len(results['results']) == 0:
        output = {
            "formatted_address" : None,
            "latitude": None,
            "longitude": None,
            "accuracy": None,
            "google_place_id": None,
            "type": None,
            "postcode": None
        }
    else:    
        answer = results['results'][0]
        output = {
            "formatted_address" : answer.get('formatted_address'),
            "latitude": answer.get('geometry').get('location').get('lat'),
            "longitude": answer.get('geometry').get('location').get('lng'),
            "accuracy": answer.get('geometry').get('location_type'),
            "google_place_id": answer.get("place_id"),
            "type": ",".join(answer.get('types')),
            "postcode": ",".join([x['long_name'] for x in answer.get('address_components') 
                                  if 'postal_code' in x.get('types')])
        }
        
    # append some other details:    
    output['input_string'] = address
    output['number_of_results'] = len(results['results'])
    output['status'] = results.get('status')
    if return_full_response is True:
        output['response'] = results
    
    return output




def geocode(input_file, output_file, name_address_column):
    logger = logging.getLogger("root")
    logger.setLevel(logging.DEBUG)
    # create console handler
    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)
    logger.addHandler(ch)
    
    # you can get free access without an API_KEY for 2500 queries per day
    #API_KEY = None
    API_KEY = 'AIzaSyC9D0vXh84s4FYro6IiZDA08xDOf5ac6Z8'
    BACKOFF_TIME = 30
    output_filename = os.path.join(settings.BASE_DIR, 'api', 'source-data', output_file)
    input_filename = os.path.join(settings.BASE_DIR, 'api', 'source-data', input_file)
    address_column_name = name_address_column
    # whether return full geojson results from google 
    RETURN_FULL_RESULTS = False
    
    
    data = pd.read_excel(input_filename, encoding='utf8')
    
    if address_column_name not in data.columns:
        raise ValueError("Missing Address column in input data")
    
    addresses = data[address_column_name].tolist()
    addresses = (data[address_column_name] + ',' + ',Belgium').tolist()
    
    results = []
    for address in addresses:
        geocoded = False
        while geocoded is not True:
            try:
                geocode_result = get_google_results(address, API_KEY, return_full_response=RETURN_FULL_RESULTS)
            except Exception as e:
                logger.exception(e)
                logger.error("Major error with {}".format(address))
                logger.error("Skipping!")
                geocoded = True
            if geocode_result['status'] == 'OVER_QUERY_LIMIT':
                logger.info("Hit Query Limit! Backing off for a bit.")
                time.sleep(BACKOFF_TIME * 60) # sleep for 30 minutes
                geocoded = False
            else:
                # If we're ok with API use, save the results
                # Note that the results might be empty / non-ok - log this
                if geocode_result['status'] != 'OK':
                    logger.warning("Error geocoding {}: {}".format(address, geocode_result['status']))
                logger.debug("Geocoded: {}: {}".format(address, geocode_result['status']))
                results.append(geocode_result)           
                geocoded = True
    # All done
    logger.info("Finished geocoding all addresses")
    # Write the full results to csv using the pandas library.
    pd.DataFrame(results).to_csv(output_filename, encoding='utf8')




