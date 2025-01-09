import xmltodict
import sys
import json
import numpy as np
import pandas as pd

#Get the file path passed as an argument
file_path = sys.argv[1]

#Parse XML to dictionary
with open(file_path, 'r') as f:
    health = xmltodict.parse(f.read())

#Extract desired data and turn into a Data Frame
data = pd.DataFrame(health['HealthData']['Record'])

#Create two Data Frames for distance and steps walked
distance = data[data['@type'] == 'HKQuantityTypeIdentifierDistanceWalkingRunning'][['@value','@creationDate','@startDate','@endDate']]
step = data[data['@type'] == 'HKQuantityTypeIdentifierStepCount'][['@value','@creationDate','@startDate','@endDate']]

#Turn the kilometers into float data type from object and others into datetime
distance['@value'] = distance['@value'].astype(float)
for column in distance.columns:
    if column != '@value':
        distance[column] = pd.to_datetime(distance[column])

#Create a new column to get the time differences        
distance['@walkHours'] = distance['@endDate'] - distance['@startDate']

#Resample to aggregate data by day and merge kilometres and walking time dataframes
data = pd.merge(
    left = distance.resample("D",on='@startDate')['@walkHours'].sum().reset_index(),
    right = distance.resample("D",on='@startDate')['@value'].sum().reset_index(),
    on = '@startDate',
    how = 'outer',
    indicator = False).rename(columns={'@value':'@kms'})

#Same with step
step['@value'] = step['@value'].astype(int)
for column in step.columns:
    if column != '@value':
        step[column] = pd.to_datetime(step[column])

#Merge with earlier data
data = data.merge(
    step.resample("D",on='@startDate')['@value'].sum().reset_index(),
    on='@startDate',
    how='outer').rename(columns={'@value':'@steps'})

#Turn HH:MM:SS into minutes.
data['@walkMins'] = round((data['@walkHours'].dt.total_seconds() / 60), 2)
data = data[data['@walkMins'] < 1440]

#Filter out incorrect entries
data['@startDate'] = data['@startDate'].dt.tz_localize(None)

#Export to Excel
data.to_excel('health.xlsx')