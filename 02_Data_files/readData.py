import csv

file_path = "./me.csv"

with open(file_path, 'r', newline='', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)

    for row in csv_reader:
        print(row)
