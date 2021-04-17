# 1. Healthcare Service - Spring Boot

You have to create an API of the healthcare service The following are the details of the API endpoints

## register: (HTTP METHOD-POST)

This endpoint should register the application user. On successful registration, the response should be {message = 
Registration successful} and on failure, the message should be {message=Password and username policy failed}

## signin: (HTTP METHOD_POST)

Users should be able to sign in through this endpoint by providing their email and password. On successful login, the
response should be { message = Authentication successful!, token = **JWTtoken**, id=user.Id};
and on failure, the response should be
{message = "Username and Password is Incorrect"}

## viewprofile/{userId}: (HTTP METHOD-GET)
This API should return the details of all the application users.

## editprofile/{userId}: (HTTP METHOD-GET)
This API should allow you to edit the details of an application user.

## patients/register: (HTTP METHOD-POST)

An application user should register the patient through this API. On succcessful registration, the response should be {message=Registration successful} and on failure, {message=Registration failure}


## patients/list/: (HTTP METHOD-GET)

Should return a list of all the patients.

## patients/view/{Id}: (HTTP METHOD-GET)

Should return details of the single user of that particular ID

## patients/delete/{Id}: (HTTP METHOD-DELETE)

Should delete the patient details of that particular ID

## appointment/register: (HTTP METHOD-POST)

Book an appointment through this API. On succcessful booking, the response should be {message="Booking successful"} and on failure, {message="Booking failure"}

## appointment/list: (HTTP METHOD-GET)

Should get the list of all the appointments

## /appointment/view/{appointmentId}: (HTTP METHOD-GET)

It should get the details of the appointment of that particular appointmentid.

## /appointment/list/{patientid}: (HTTP METHOD-GET)

Should get the list of all the appointments of the patient of that particular patientid.

## /appointment/delete/{appointmentId}: (HTTP METHOD-DELETE)

Should delete the appointment of that particular appointmentid.



## Middleware

You need to create a Middleware to validate the API calls.

For middleware, you have to use 'json web token' (jwt) with the following rules:

1)**signin** and **register** API endpoints do not need middleware. If login details are validated, a response should be sent with a JSON web token as the token parameter.



## Steps to be followed for Hands-on

1. Install dependencies (project &gt; install)

2. Run the application (project &gt; run)

3. Test the application (Run tests)
