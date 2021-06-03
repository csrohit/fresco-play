

import os
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import mysql.connector
from mysql.connector import Error
import time

def start():
    try:
        print("Run the server before executing test. Ignore if Server is running")
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        browser = webdriver.Chrome('./chromedriver', chrome_options = chrome_options)
        dir_path = os.path.dirname(os.path.realpath(__file__))
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="mysql",
            database="DBConnection")
        mycursor = mydb.cursor()
        mycursor.execute("DELETE FROM users")
        mycursor.execute("DELETE FROM repos")
        mydb.commit()
        browser.get("http://localhost:8000")
        browser.find_element_by_id("userName").send_keys("qwerty001")
        browser.find_element_by_id("create").click()
        browser.switch_to.alert.accept()
        time.sleep(2)
        browser.find_element_by_id("userName").send_keys("qwerty002")
        browser.find_element_by_id("create").click()
        browser.switch_to.alert.accept()
        sql_select_Query = "select * from users"
        mycursor.execute(sql_select_Query)
        records = mycursor.fetchall()
        newlist=[]
        for row in records:
            newlist.append(row[0])
            if(row[1]=="qwerty001" or row[1]=="qwerty002"):
                print("User Creation successfull")
        url = 'http://localhost:8000/CreateRepo'
        params="userId="+newlist[0]+"&RepoName=testrepo&RepoDesc=testrepodesc&RepoDev="+newlist[1]
        command="curl -X POST -d \""+params+"\" http://localhost:8000/CreateRepo"
        os.system(command)
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="mysql",
            database="DBConnection")
        mycursor = mydb.cursor()
        mycursor.execute("SELECT * FROM repos")
        myresult = mycursor.fetchall()[0]
        print(myresult)
        if myresult[1] == newlist[0] and myresult[4] == newlist[1] :
            print("FS_SCORE:100%")
        else:
            print("test failed.something wrong with code")
    except:
        print("test failed.comething wrong with code")

start()
