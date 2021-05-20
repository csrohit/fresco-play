import string, random, base64
try:
    import requests, bcrypt, mysql.connector
except:
    pass

FS_SCORE = 0
mycursor = ""

def randomString(stringLength=10):
    """ Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))

try:
    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="mysql",
    database="CodeLab")
    mycursor = mydb.cursor()
    mycursor.execute("DELETE FROM user")
    mydb.commit()
except:
    pass

USERNAME = randomString()
PASSWORD = randomString()
FULLNAME = randomString()

try:
    url = 'http://localhost:8000/register'
    myobj = {'username': USERNAME, 'fullname':FULLNAME, 'password': PASSWORD}
    x = requests.post(url, data = myobj)
    mycursor.execute("SELECT fullname, username, password FROM user")
    myresult = mycursor.fetchall()[0]
    if myresult[0] == FULLNAME and myresult[1] == USERNAME :
        FS_SCORE += 25
    if bcrypt.checkpw(PASSWORD.encode('utf-8'), myresult[2].encode('utf-8')) :
        FS_SCORE += 25
except:
    pass
s = None
try:
    s = requests.Session()
    myobj = {'username': USERNAME, 'password': PASSWORD }
    x = s.post('http://localhost:8000/login', auth=(USERNAME, PASSWORD), data=myobj)
    s.headers["Cookie"] = "JSESSIONID=" + s.cookies.get("JSESSIONID") + "; user=" + s.cookies.get("user")
    x = s.get('http://localhost:8000/dashboard', auth=(USERNAME, PASSWORD))
    if "DASHBOARD" in str(x.content) :
        FS_SCORE += 25
except:
    pass
try:
    s.headers['Cookie']='JSESSIONID=fsdfdasfdfsas432432432'
    x = s.get('http://localhost:8000/dashboard/', auth=(USERNAME, 'fdsafsdd'))
    contents = open('ApiGateway/src/main/resources/static/login.html', 'r').read()
    if contents in x.text:
        FS_SCORE += 25
except:
    pass
print("FS_SCORE:" + str(FS_SCORE) + "%")
