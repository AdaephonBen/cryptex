from sqlfaker.database import Database
my_db = Database(db_name="defaultdb")
my_db.add_table(table_name="users", n_rows=500)
my_db.generate_data()
my_db.export_sql("test.sql")