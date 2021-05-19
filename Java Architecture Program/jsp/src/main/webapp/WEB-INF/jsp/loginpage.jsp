<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
<h1>Login</h1>
<form action="/login" method="get">
    
        <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username">
    </div>
        <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password">
    </div>
    
    <input type="submit" name="submit">Submit</button>
    
    
</form>
</body>
</html>