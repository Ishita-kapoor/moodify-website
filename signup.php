<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "moodify";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$name = isset($_POST['name']) ? trim($_POST['name']) : null;
$regNo = isset($_POST['regNo']) ? trim($_POST['regNo']) : null;
$year = isset($_POST['year']) ? trim($_POST['year']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$gender = isset($_POST['gender']) ? trim($_POST['gender']) : null;
$passwordInput = isset($_POST['password']) ? trim($_POST['password']) : null;
// Handling hobbies
$hobbies = isset($_POST['hobby']) ? (array)$_POST['hobby'] : [];  // Force it to be an array
$hobbiesString = !empty($hobbies) ? implode(", ", $hobbies) : null;

$hashedPassword = password_hash($passwordInput, PASSWORD_DEFAULT);
// Check if all required fields are filled
if ($name && $regNo && $year && $email && $gender && $hobbiesString && $hashedPassword) {
    $hashedPassword = password_hash($passwordInput, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (name, regNo, year, email, gender, hobbies,password) VALUES (?, ?, ?, ?, ?, ?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $name, $regNo, $year, $email, $gender, $hobbiesString,$hashedPassword);

    if ($stmt->execute()) {
        echo "<script>
            alert('Registration successful! Redirecting to content page.');
            window.location.href = '1indexm.php';
        </script>";
    } else {
        echo "Error: " . $stmt->error;
    }
    

    $stmt->close();
} else {
    echo "Please fill all the required fields.";
}

$conn->close();
?>



