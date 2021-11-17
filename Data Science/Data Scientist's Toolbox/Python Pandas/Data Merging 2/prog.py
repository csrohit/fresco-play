#Write your code here

import pandas as pd

import numpy as np

nameid = pd.Series(range(101,111))

name = pd.Series(['person' + str(i) for i in range(1,11)])

master = pd.DataFrame()

master['nameid'] = nameid

master['name'] = name

transaction = pd.DataFrame({'nameid':[108,108,108,103],'product':['iPhone','Nokia','Micromax','Vivo']})

mdf = pd.merge(master,transaction,on='nameid')

print(mdf)

#Write your code here