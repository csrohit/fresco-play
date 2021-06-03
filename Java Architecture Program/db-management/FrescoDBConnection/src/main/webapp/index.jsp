<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <%@ include file = "Header.jsp" %>
    <script type="text/javascript">
        function alertName(){
            var msg3 ='<%=request.getAttribute("create")%>';
            if (msg3 != "null") {
                alert(msg3);
            }
            var msg ='<%=request.getAttribute("success")%>';
            if (msg != "null") {
                alert(msg);
            }
            else {
                var msg1 ='<%=request.getAttribute("exists")%>';
                if (msg1 != "null") {
                    alert(msg1);
                }
                else {
                    var msg2 ='<%=request.getAttribute("exists")%>';
                    if (msg2 != "null") {
                        alert(msg2);
                    }
                }
            }
        }
    </script>
    <body>
        <h1>Create User</h1>
        <form action="/CreateUser" method="post">
            Username:<input type="text" id="userName" name="userName"/><br/>
            <input type="Submit" id="create" value="submit"/>
        </form>
    </body>
    <script type="text/javascript"> window.onload = alertName; </script>
</html>