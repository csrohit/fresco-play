<p>Create an application <strong>Healthcare Service</strong> that can be used by the receptionist of a hospital to
    register patients and book/cancel appointments.</p>
<p> </p>
<p> </p>
<p><strong>SpringBoot</strong></p>
<p> </p>
<p>Create an API for Healthcare Service.</p>
<p> </p>
<p><strong>API Endpoints</strong></p>
<p>
</p>
<p><strong>register:(HTTP METHOD-POST)</strong></p>
<ul>
    <li>Should register a user.</li>
    <li>On
        successful registration, the response should be {message=""Registration successful""}.</li>
    <li>On
        registration failure, the response should be {message="Password or username policy failed"}.</li>
</ul>
<p> </p>
<p><strong>signin</strong> : <strong>(HTTP METHOD-POST)</strong></p>
<ul>
    <li>A user should be able to
        sign in through this endpoint by providing their <strong>email</strong> and <strong>password</strong>.</li>
    <li>On successful login, the response should be:<br>{ message = "Authentication successful!",</li>
</ul>
<p> token = <strong>JWTtoken</strong>,</p>
<p> id=user.Id};</p>
<ul>
    <li>On login failure, the response should
        be {message="Username or Password is Incorrect."}</li>
</ul>
<p> </p>
<p>
    <strong>"viewprofile/{userId}":(HTTP METHOD-GET)</strong>
</p>
<p>Should return the details of all users.</p>
<p> </p>
<p><strong>"editprofile/{userId}":(HTTP METHOD-GET)</strong></p>
<p>Should allow you to edit a
    user's profile.</p>
<p> </p>
<p><strong>"patients/register" : (HTTP METHOD-POST)</strong></p>
<ul>
    <li>A user should be able to register a patient through this API.</li>
    <li>On succcessful registration, the
        response should be {message="Registration successful"}. </li>
    <li>On registration failure, the response
        should be {message="Registration failure"}.</li>
</ul>
<p> </p>
<p><strong>"patients/list/": (HTTP
        METHOD-GET)</strong></p>
<p>Should return the list of all patients.</p>
<p> </p>
<p>
    <strong>"patients/view/{Id}" : (HTTP METHOD-GET)</strong>
</p>
<p>Should return details of a specified patient
    ID.</p>
<p> </p>
<p><strong>"patients/delete/{Id}" : (HTTP METHOD-DELETE)</strong></p>
<p>Should delete a
    specified patient ID.</p>
<p> </p>
<p><strong>"appointment/register" : (HTTP METHOD-POST)</strong></p>
<ul>
    <li>Should book an appointment.</li>
    <li>On successful booking, the response should be {message="Booking
        successful"}.</li>
    <li>On booking failure, the response should be {message="Booking failure"}.</li>
</ul>
<p> </p>
<p><strong>"appointment/list" : (HTTP METHOD-GET)</strong></p>
<p>Should return the list of all
    appointments.</p>
<p> </p>
<p><strong>"/appointment/view/{appointmentId}":(HTTP METHOD-GET)</strong></p>
<p>Should return details of a specified appointment ID.</p>
<p> </p>
<p><strong>"/appointment/list/{patientid}"
        : (HTTP METHOD-GET)</strong></p>
<p>Should return the list of all the appointments of a specified patient ID.
</p>
<p> </p>
<p><strong>"/appointment/delete/{appointmentId}" : (HTTP METHOD-DELETE)</strong></p>
<p>Should
    delete a specified appointment ID.</p>
<p> </p>
<p><strong>Middleware:</strong></p>
<p>Create a Middleware
    to validate the API calls using JSON web token (JWT).</p>
<ul>
    <li>'Sign in' and 'Register API' endpoints do
        not require Middleware.</li>
    <li>If the login details are validated, send a response with the JWT as token
        parameter.</li>
</ul>
<p> </p>
<p><strong>Steps:</strong></p>
<p>1. Install dependencies (project &gt;
    install)</p>
<p>2. Run application (project &gt; run)</p>
<p>3. Test application (Run tests)</p>
<p> </p>
<p> </p>
<p><strong>Angular:</strong></p>
<p> </p>
<p><strong>Application Overview</strong></p>
<p> </p>
<p>Screens in the application:</p>
<p> </p>
<ul>
    <li>Login</li>
    <li>Profile</li>
    <li>Register patient
    </li>
    <li>Viewall Patients</li>
    <li>Requested App</li>
</ul>
<p> </p>
<p><strong>Sign Up</strong></p>
<p> </p>
<table height="923" width="896">
    <tbody>
        <tr>
            <td>
                <ul>
                    <li>The form
                        must contain the fields <strong>Username</strong>, <strong>Password</strong>, <strong>Contact
                            number</strong>, <strong>Email</strong>, and <strong>Location</strong>.</li>
                    <li>
                        <strong>Contact number</strong> should be exactly 10 digits and <strong>Email</strong> should
                        be a valid email ID. Error messages must be displayed for invalid inputs.
                    </li>
                    <li>
                        <p>The <strong>Create Account</strong> button should be enabled only if all the fields
                            pass the required validations.</p>
                    </li>
                </ul>
            </td>
            <td><img height="422" src="imgs/sognup1.png"
                    width="344"></td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>The
                        <strong>Username</strong> should be a minimum of 3 characters, and the <strong>Password</strong>
                        should be a minimum of 8 characters.
                    </li>
                    <li><strong>Password Pattern</strong>:
                        Should contain at least one upper case letter, one lower case letter, one numeric digit, and one
                        special character. The allowed special characters are !$%@#£€*?&amp;.
                        <br><strong>Example</strong>: pasSword8#
                    </li>
                    <li>Error messages must be
                        displayed for invalid inputs.</li>
                </ul>
            </td>
            <td><img height="201"
                    src="imgs/login%20err%204.png"
                    width="277"></td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>The
                        <strong>Username</strong> and <strong>Password</strong> should not exceed 20 characters.
                    </li>
                    <li>Error messages must be displayed for invalid inputs.</li>
                </ul>
            </td>
            <td><img height="230"
                    src="imgs/login%20err%203.png"
                    width="284"></td>
        </tr>
    </tbody>
</table>
<p> </p>
<p> </p>
<p>
    <strong>Login</strong>
</p>
<p> </p>
<table height="820" width="898">
    <tbody>
        <tr>
            <td>
                <ul>
                    <li>The <strong>LOGIN</strong> page must contain <strong>Username</strong> and
                        <strong>Password</strong> fields, and a <strong>Login</strong> button.
                    </li>
                    <li>If
                        there are no inputs in the <strong>Username/Password</strong> fields, an error message must be
                        displayed.</li>
                    <li>The <strong>Login</strong> button should be enabled only if all the
                        fields pass the required validations.</li>
                </ul>
            </td>
            <td><img height="296"
                    src="imgs/login%20err%201.png"
                    width="305"></td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>The
                        <strong>Username</strong> should be a minimum of <span style="color:#d35400;">3
                            characters</span>, and the <strong>Password</strong> should be a minimum of <span
                            style="color:#d35400;">8 characters</span>.
                    </li>
                    <li><strong>Password
                            Pattern</strong>: Should contain at least one upper case letter, one lower case letter, one
                        numeric digit, and one special character. The allowed special characters are <span
                            style="color:#d35400;">!$%@#£€*?&amp;</span>.<span style="color:#d35400;">
                        </span><br><strong>Example</strong>: <span style="color:#d35400;">pasSword8#</span></li>
                    <li>Error messages must be
                        displayed for invalid inputs.</li>
                </ul>
            </td>
            <td><img height="201"
                    src="imgs/login%20err%204.png"
                    width="277"></td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>The
                        <strong>Username</strong> and <strong>Password</strong> should not exceed <span
                            style="color:#d35400;">20 </span>characters.
                    </li>
                    <li>Error messages must be
                        displayed for invalid inputs.</li>
                </ul>
            </td>
            <td><img height="230"
                    src="imgs/login%20err%203.png"
                    width="284"></td>
        </tr>
    </tbody>
</table>
<p> </p>
<p> </p>
<p>
    <strong>Profile</strong>
</p>
<p> </p>
<table height="890" width="904">
    <tbody>
        <tr>
            <td>
                <ul>
                    <li>The <strong>Profile</strong> page must contain a user profile section (Name,
                        Contact number, Email, and Location) with an <strong>Edit profile</strong> button.</li>
                    <li>A user should be able to edit their profile details in the form that appears when the
                        <strong>Edit profile</strong> button is clicked.
                    </li>
                </ul>
            </td>
            <td><img height="192" src="imgs/profile.png"
                    width="525">
            </td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>A user should be able
                        to edit all details except <strong>Name</strong> (disabled).</li>
                    <li><strong>Contact
                            number</strong> should be exactly 10 digits and <strong>Email</strong> should be a valid
                        email ID. Error messages must be displayed for invalid inputs.</li>
                    <li>When the user
                        successfully submits the updates, the changes must be displayed.</li>
                    <li>When the
                        <strong>Discard</strong> button is clicked, the form must be hidden.
                    </li>
                </ul>
            </td>
            <td><img height="216" src="imgs/profile%202.png"
                    width="426"></td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>None of the input
                        fields should be empty.</li>
                    <li>The <strong>Make changes</strong> button should be
                        enabled only if all the fields pass the required validations.</li>
                </ul>
            </td>
            <td><img height="355"
                    src="imgs/edit%20profile.png" width="228">
            </td>
        </tr>
    </tbody>
</table>
<p> </p>
<p> </p>
<p><strong>Register
        Patient</strong></p>
<p> </p>
<table height="634" width="910">
    <tbody>
        <tr>
            <td>
                <ul>
                    <li>
                        <p>The fields marked * are mandatory.</p>
                    </li>
                    <li>
                        <p>The <strong>Submit</strong> button should be enabled only after the user has
                            entered details in all the mandatory fields. </p>
                    </li>
                    <li>
                        <p>
                            On submitting the registration form, the user should be redirected to the <strong>View all
                                patients </strong>page where the list of all the patients should be displayed.</p>
                    </li>
                </ul>
            </td>
            <td><img height="297" src="imgs/form%201.png"
                    width="300">
            </td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li><strong>Name</strong> should be a minimum
                        of 3 characters and a maximum of 20 characters, and should not be empty.</li>
                    <li>
                        <strong>Gender</strong> should not be empty.
                    </li>
                    <li><strong>DOB</strong> should
                        not be empty.</li>
                    <li><strong>Mobile</strong> should be exactly 10 digits and should
                        not be empty.</li>
                    <li><strong>Email </strong>should be a valid email.</li>
                    <li>Error messages must be displayed for invalid inputs.</li>
                </ul>
            </td>
            <td>
                <p><img height="78" src="imgs/form2.png"
                        width="340"><img height="79"
                        src="imgs/form3.png" width="332">
                </p>
                <p><img height="80" src="imgs/form4.png"
                        width="333">
                </p>
                <p> </p>
            </td>
        </tr>
    </tbody>
</table>
<p> </p>
<p> </p>
<p>
    <strong>View all Patients</strong>
</p>
<p> </p>
<table height="926" width="914">
    <tbody>
        <tr>
            <td>
                <ul>
                    <li>
                        <p>Should display all the registered patients.</p>
                    </li>
                </ul>
            </td>
            <td><img height="166" src="imgs/viewallpat.png"
                    width="449">
            </td>
        </tr>
        <tr>
            <td>
                <p> </p>
                <ul>
                    <li>
                        <p>On clicking
                            <strong>View Details</strong>, details of the selected patient should be displayed.
                        </p>
                    </li>
                </ul>
            </td>
            <td>
                <p><img height="134" src="imgs/vap2.png"
                        width="464">
                </p>
                <p> </p>
                <p> </p>
            </td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>
                        <p>On clicking the <strong>Book Appointment</strong> button, the
                            <strong>Book Appointment</strong> form should be displayed.
                        </p>
                    </li>
                    <li>
                        <p>The fields marked * are mandatory.</p>
                    </li>
                    <li>
                        <p>The
                            <strong>Schedule</strong> button should be enabled only after the user has entered details
                            in all the mandatory fields.
                        </p>
                    </li>
                    <li>
                        <p>After booking an
                            appointment, the user should be redirected to the <strong>Requested Appointments</strong>
                            page where all the appointments should be displayed.</p>
                    </li>
                </ul>
            </td>
            <td><img height="189" src="imgs/book%20app.png"
                    width="438">
            </td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>
                        <p>The <strong>Scheduled
                                Appointments</strong> table should be displayed when the <strong>Scheduled
                                Appointments</strong> button is clicked.</p>
                    </li>
                    <li>
                        <p>
                            The table should display all the appointments of the selected patient.</p>
                    </li>
                    <li>
                        <p>On clicking the <strong>Cancel Appointment</strong> button, the
                            appointment should be deleted.</p>
                    </li>
                </ul>
            </td>
            <td><img height="166" src="imgs/scdapp.png"
                    width="503"></td>
        </tr>
        <tr>
            <td>
                <p> </p>
                <ul>
                    <li>
                        <p>Display an appropriate message if there is no appointment.</p>
                    </li>
                </ul>
            </td>
            <td><img height="84"
                    src="imgs/no%20rec%20found.png"
                    width="496"></td>
        </tr>
    </tbody>
</table>
<p> </p>
<p><strong>Requested
        Appointments</strong></p>
<p> </p>
<table height="197" width="926">
    <tbody>
        <tr>
            <td>
                <ul>
                    <li>
                        <p>Should display the booked appointments of all the patients.</p>
                    </li>
                    <li>
                        <p>On clicking <strong>View Details</strong>, details of
                            the selected patient should be displayed.</p>
                    </li>
                    <li>
                        <p>On
                            clicking the <strong>Cancel Appointment</strong> button, the appointment should be deleted.
                        </p>
                    </li>
                </ul>
            </td>
            <td><img height="171" src="imgs/reqapp.png"
                    width="487">
            </td>
        </tr>
    </tbody>
</table>
<p> </p>
<h4><strong>Header</strong></h4>
<p> </p>
<table align="left" height="243" width="1018">
    <tbody>
        <tr>
            <td>
                <ul>
                    <li>The header
                        component should be displayed at the top of all pages except the <strong>Login</strong> page.
                    </li>
                    <li>The header component should display the name of the logged in user.</li>
                    <li>Clicking on a particular menu should navigate to the corresponding page.</li>
                </ul>
                <p> </p>
            </td>
            <td>
                <p> </p>
                <p><img height="26" src="imgs/header.png"
                        width="585">
                </p>
            </td>
        </tr>
    </tbody>
</table>
<p> </p>
<h2> </h2>
<p> </p>
<p> </p>
<p> </p>
<p> </p>
<h4> </h4>
<h4> </h4>
<h4> </h4>
<h4> </h4>
<h4><strong>Services</strong></h4>
<p> </p>
<p>Services in the application:</p>
<p> </p>
<ul>
    <li><strong>API</strong><strong>
            Service</strong><br>Service for API calls to the backend server.</li>
    <li><strong>Auth
            Guard</strong><br>To prevent navigation to the application pages other than the login page for
        unauthorized users.</li>
    <li><strong>Data Service</strong><br>Acts as middleware between a component
        and API service.</li>
</ul>
<p> </p>
<h2><strong>Other Instructions</strong></h2>
<p> </p>
<ul>
    <li>All the project files should be kept in the <strong>src</strong> folder.</li>
    <li><em><strong>Do not modify
                the ids or classes</strong></em> of the existing UI elements as they are required by the unit tests.
    </li>
    <li>The API URL is predefined in the service as <strong>API_URL</strong>. You can use <strong>API_URL +
            endpoint</strong> as required.</li>
</ul>"