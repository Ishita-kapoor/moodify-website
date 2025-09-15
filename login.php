<?php
session_start();

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
$email = isset($_POST['email']) ? trim($_POST['email']) : null;

if ($name && $regNo && $email) {
    // Check if user already exists
    $sql = "SELECT * FROM users WHERE regNo = ? AND name = ? AND email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $regNo, $name, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User exists, log them in
        $_SESSION['user_name'] = $name;
        echo "<script>
            alert('Login successful! Redirecting to home page.');
            window.location.href = '1indexm.html';
        </script>";
    } else {
        // User does not exist, add them to the database
        $year = isset($_POST['year']) ? trim($_POST['year']) : null;
        $gender = isset($_POST['gender']) ? trim($_POST['gender']) : null;
        $hobbies = isset($_POST['hobby']) ? (array)$_POST['hobby'] : [];
        $hobbiesString = !empty($hobbies) ? implode(", ", $hobbies) : null;

        if ($year && $gender && $hobbiesString) {
            $sql = "INSERT INTO users (name, regNo, year, email, gender, hobbies) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssss", $name, $regNo, $year, $email, $gender, $hobbiesString);

            if ($stmt->execute()) {
                $_SESSION['user_name'] = $name;
                echo "<script>
                    alert('Registration successful! Redirecting to home page.');
                    window.location.href = '1indexm.html';
                </script>";
            } else {
                echo "Error: " . $stmt->error;
            }
            $stmt->close();
        } else {
            echo "Please fill all the required fields.";
        }
    }
} else {
    echo "Please provide name, registration number, and email.";
}

$conn->close();
?>
