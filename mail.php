<?php
    // Replace 'demo@spondonit.com' with the email address that you want to send the message to
    $to = 'demo@spondonit.com';

    // Set the variables for the form data using the 'name' attributes of the form fields
    $firstname = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Set the 'From' and 'Content-type' headers for the email
    $headers = "From: $email\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

    // Construct the email message using the form data
    $email_message = "
        <table style='width:100%'>
            <tr>
                <td>$firstname</td>
            </tr>
            <tr>
                <td>Email: $email</td>
            </tr>
            <tr>
                <td>Subject: $subject</td>
            </tr>
            <tr>
                <td>Message: $message</td>
            </tr>
        </table>
    ";

    // Send the email
    if (mail($to, $subject, $email_message, $headers)) {
        // If the email was successfully sent, display a success message
        echo 'The message has been sent.';
    } else {
        // If the email failed to send, display an error message
        echo 'Failed to send the message. Please try again.';
    }
?>
