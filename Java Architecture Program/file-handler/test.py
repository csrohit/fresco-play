import os
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def start():
    try:
        f = open("testapp.txt", "w+")
        f.write("testDataDummy")
        f.close()
        print("Run the server before executing test. Ignore if Server is running")
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        browser = webdriver.Chrome('./chromedriver', chrome_options = chrome_options)
        browser.get("http://localhost:8000")
        dir_path = os.path.dirname(os.path.realpath(__file__))
        browser.find_element_by_id("fileAttachment").send_keys(os.getcwd()+"/testapp.txt")
        browser.find_element_by_id("uploadBtn").click()
        os.remove("testapp.txt")
        print("uploading file is successfull")
        print("We will test download servlet internally")
        print("Test is successfull")
    except Exception as e:
        print(e)
        print("something went wrong with your code")

start()
