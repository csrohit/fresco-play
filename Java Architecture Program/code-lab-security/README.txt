Run install once before you start coding

Complete the implementation of Spring Zuul Api gateway and run it at port 8080 

Connect it to eureka server running at http://localhost:8761

Implement basic authentication in zuul using spring basic security

Load the user authentication details from mysql db, following are the credentials:
            username: root
            password: mysql
            db: FrescoTweet
            table: user

Zuul should also do routing for the fallowing paths:
    http://localhost:8080/ui                       ui            (eureka connected application)
    http://localhost:8080/dbrestapi                dbrestapi
    http://localhost:8080/recommendationengine     recommendationengine
    
Important! : Please keep your application running when you submit your test to generate score 