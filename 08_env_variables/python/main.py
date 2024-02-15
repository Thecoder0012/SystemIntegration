from dotenv import dotenv_values, load_dotenv
# 1
env_values = dotenv_values()
print(env_values["MYSQL"])

# 2 os used for files, folders, env 
import os
load_dotenv()
print(os.getenv(("MYSQL")))