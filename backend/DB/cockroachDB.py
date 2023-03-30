import psycopg2

url = "postgresql://ahmed:BDjcdSQtGydbQm5oZZvljw@sunny-cattle-2639.7s5.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"
conn = psycopg2.connect(url)

with conn.cursor() as cur:
    cur.execute("SELECT now()")
    res = cur.fetchall()
    conn.commit()
    print(res)
    
    # cur.execute("CREATE TABLE test (id serial PRIMARY KEY, num integer, data varchar);")
    
    # cur.execute("INSERT INTO test (num, data) VALUES (%s, %s)",(100, "abc'def"))

    cur.execute("SELECT * FROM test;")
    res = cur.fetchone()
    conn.commit()
    print(res)

    cur.close()
# >>> conn.close()