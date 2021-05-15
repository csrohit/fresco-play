<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<style>
        ul {
            display: inline-block;
        }

    </style>

    <script lang="js">
        function repoClick(num) {
            switch (num) {
                case 1: {
                    document.getElementById('repo1').style.display = "inline-block"
                    document.getElementById('repo2').style.display = "none"
                    document.getElementById('repo3').style.display = "none"
                    break;
                }
                case 2: {
                    document.getElementById('repo1').style.display = "none"
                    document.getElementById('repo2').style.display = "inline-block"
                    document.getElementById('repo3').style.display = "none"
                    break;
                }
                case 3: {
                    document.getElementById('repo1').style.display = "none"
                    document.getElementById('repo2').style.display = "none"
                    document.getElementById('repo3').style.display = "inline-block"
                    break;
                }
            }
        }

    </script>

    <ul>
        <li onclick="repoClick(2)">repo2</li>
        <li onclick="repoClick(3)">repo3</li>
        <li onclick="repoClick(1)">repo1</li>
    </ul>
    <ul>
        <li style="display: none" id="repo1"><a href="<%= request.getContextPath()%>/EditFile?path=repo1/text1.txt" target="_blank">\text1.txt</a></li>
        <li style="display: none" id="repo2"><a href="<%= request.getContextPath()%>/EditFile?path=repo1/text2.txt">\text2.txt</a></li>
        <li style="display: none" id="repo3"><a href="<%= request.getContextPath()%>/EditFile?path=repo1/text3.txt">\text3.txt</a></li>
    </ul>
    
    

</body>
</html>