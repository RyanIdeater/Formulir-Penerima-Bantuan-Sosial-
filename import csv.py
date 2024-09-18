import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    with open(csv_file_path, mode='r', newline='', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        data = [row for row in csv_reader]
    
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(data, json_file, separators=(',', ':'))

# Contoh penggunaan
csv_file_path = 'data.csv'  # Ganti dengan path file CSV Anda
json_file_path = 'data.json'  # Ganti dengan path file JSON yang diinginkan
csv_to_json(csv_file_path, json_file_path)
