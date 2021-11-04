import psycopg2

DB_NAME = 'sample_db'
DB_URL = 'jdbc:postgresql://localhost:5432/sample_db'

conn = psycopg2.connect(
    host="localhost",
    database="sample_db",
    user="postgres",
    password="Abcd1234")

curr = conn.cursor()

curr.execute("SELECT * FROM people;")
print(curr.fetchall())
curr.close()

conn.close()