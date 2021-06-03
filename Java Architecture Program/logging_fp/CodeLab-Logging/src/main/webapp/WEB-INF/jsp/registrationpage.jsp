<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" href="/css/registerpage.css">
</head>
<body>
	<form action="/register" method=POST>
		<div class="container">
			<h1>Register</h1>
			<p>Please fill in this form to create an account.</p>
			<hr>
			<label for="fullname"><b>Full Name</b></label>
			<input type="text" placeholder="Enter Your Fullname" name="fullname" required> <br>
			<label for="email"><b>Email</b></label>
			<input type="text" placeholder="Enter Email" name="username" required> <br>
			<label for="psw"><b>Password</b></label>
			<input type="password" placeholder="Enter Password" name="password" required> <br>
			<hr>
			<button type="submit" class="registerbtn">Register</button>
		</div>
		<div class="container signin">
			<p>
				Already have an account? <a href="/login">Sign in</a>.
			</p>
		</div>
	</form>
</body>
</html>