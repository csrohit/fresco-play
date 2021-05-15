import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def start():
    try:
        print("Run the server before executing test. Ignore if Server is running")
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        browser = webdriver.Chrome('./chromedriver', chrome_options = chrome_options)
        dir_path = os.path.dirname(os.path.realpath(__file__))
        browser.get("http://localhost:8000/FileExplorer")
        url = 'http://localhost:8000/EditFile?path=%2Fusr%2Frepos%2Frepo1%2Ftext1.txt'
        browser.get(url)
        # os.system("> /usr/repos/repo1/text1.txt")
        browser.find_element_by_id("editor").send_keys("dummy data")
        browser.find_element_by_id("save").click()
        if open("/usr/repos/repo1/text1.txt","r").read() == "dummy data":
            print("Test successfull")
        else:
            print("Test is unsuccessfull. Something wrong with your code")
    except:
        print("Test is unsuccessfull. Something wrong with your code")

start()
