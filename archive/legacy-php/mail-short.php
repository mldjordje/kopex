<?php
/**
 * Author: Shadow Themes
 * Author URL: http://shadow-themes.com
 */

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    # Replace this email with your email address
    $mail_to = "info@kopexmin.rs";

    # Message: You can modify that string with your text.
    $message = "";

    # Subject: You can modify that string with your message.
    $subject = "KOPEX MIN-LIV - Kratak upit";

	# Collect Data
    $email = filter_var(trim($_POST["subscribe_email"]), FILTER_SANITIZE_EMAIL);

    if ( !filter_var($email, FILTER_VALIDATE_EMAIL) ) {
        # Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Molimo unesite ispravnu email adresu.";
        exit;
    }

    # Mail Content
    $content = "Email: $email<br>";
    $content .= "Message:<br>$message<br>";

    # email headers.
    $headers = 	"From: " . $email . "\r\n" .
				"MIME-Version: 1.0" . "\r\n" .
				"Content-type: text/html; charset=utf-8" . "\r\n";

    # Send the email.
    if (mail($mail_to, $subject, $content, $headers)) {
        # Set a 200 (okay) response code.
        http_response_code(200);
        echo "Hvala! Vasa poruka je poslata.";
    } else {
        # Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Doslo je do greske. Pokusajte ponovo kasnije.";
    }
} else {
	# Not a POST request, set a 403 (forbidden) response code.
	http_response_code(403);
	echo "Doslo je do problema sa slanjem, pokusajte ponovo.";
}
