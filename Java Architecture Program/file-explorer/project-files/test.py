import os
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options


def start():
    try:
        print("Run the server before executing test. Ignore if Server is running")
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        browser = webdriver.Chrome('C:/my-apps/chromedriver', options = chrome_options)
        dir_path = os.path.dirname(os.path.realpath(__file__))
        # browser.get("http://localhost:8000/file-explorer/FileExplorer")
        print("Test successfull")
        url = 'http://localhost:8080/file-explorer/EditFile?path=%2Fusr%2Frepos%2Frepo1%2Ftext1.txt'
        browser.get(url)
        print("Test successfull2")
        # os.system("> /usr/repos/repo1/text1.txt")
        browser.find_element_by_id("editor").send_keys("dummy data")
        print(browser.find_element_by_id("editor"))
        print("Test successfull3")
        browser.find_element_by_id("save").click()
        print("Test successfull4")
        if open("/usr/repos/repo1/text1.txt","r").read() != "dummy data":
            print("Test successfull")
        else:
            print("Test is unsuccessfull. Something wrong with your code")
    except Exception as e:
        print(e)
        print("Test is unsuccessfull. Something wrong ewith your code")

start()
