import csv

file_path = "./me.csv"

# Open the CSV file
with open(file_path, 'r', newline='', encoding='utf-8') as file:
    # Create a CSV reader
    csv_reader = csv.DictReader(file)

    # Iterate through each row in the CSV file
    for row in csv_reader:
        # Access data using column names
        print(row)
