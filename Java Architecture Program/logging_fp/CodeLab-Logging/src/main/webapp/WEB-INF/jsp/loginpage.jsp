<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" href="/css/registerpage.css">
</head>
<body>
	<form action="/login" method=POST>
		<div class="container">
			<h1>Login</h1>
			<p>Please enter your credentials to login.</p>
			<hr>
			<label for="username"><b>Email</b></label>
			<input type="text" placeholder="Enter Email" name="username" required> <br>
			<label for="password"><b>Password</b></label>
			<input type="password" placeholder="Enter Password" name="password" required> <br>
			<hr>
			<button type="submit" class="registerbtn">Login</button>
		</div>
		<div class="container signin">
			<p>
				Don't have an account? <a href="/register">Sign up</a>.
			</p>
		</div>
	</form>
</body>
</html>