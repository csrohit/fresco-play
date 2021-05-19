<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>



<c:out value="${repo.getRepoName()}"/>  
<c:out value="${repoOwner.getFullname()}"/>

<c:if test="${not empty repoCode}">

<button onclick="toggle()">sample.txt</button>
		<c:out value="${colors[1]}"/>
		
		<form id="codeForm" style="display: none" action="/dashboard/savecode/1/1" method="post">

<textarea name="code" id="" cols="30" rows="10">
this is sample content
</textarea>

        <div class="form-group">
            <label for="password">filename:</label>
            <input type="text" name="filename" id="filename" value="sample.txt">
        </div>

        <input type="submit" name="submit">Submit</button>


    </form>

    <script>
        function toggle() {

            document.getElementById('codeForm').style.display = "block";
        }

    </script>
		
		
		

	</c:if>  
</body>
</html>