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

// Retrieve login data
$regNo = isset($_POST['regNo']) ? trim($_POST['regNo']) : null;
$passwordInput = isset($_POST['password']) ? $_POST['password'] : null;

if ($regNo && $passwordInput) {
    $sql = "SELECT name, password FROM users WHERE regNo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $regNo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password'];

        if (password_verify($passwordInput, $hashedPassword)) {
            $_SESSION['username'] = $row['name'];
            echo "<script>
                alert('Login successful! Redirecting...');
                window.location.href = '1indexm.php';
            </script>";
        } else {
            echo "<script>alert('Incorrect password.'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('Registration number not found.'); window.history.back();</script>";
    }

    $stmt->close();
} else {
    echo "<script>alert('Please enter both registration number and password.'); window.history.back();</script>";
}

$conn->close();
?>
