<?php
$name = $_POST['name'];
$email = $_POST['email'];

$host        = "host = ec2-44-192-245-97.compute-1.amazonaws.com";
$port        = "port = 5432";
$dbname      = "dbname = da08avkeb7geuu";
$credentials = "user = bdwsavcgsqstxd password=ac7da018f2206f5c87be5cc7efc244da492a954e6a8a489aa29bf357eabbf1be";

$taken = "";

$db = pg_connect( "$host $port $dbname $credentials");
pg_query($db, "CREATE TABLE IF NOT EXISTS cryptexprereg ( id SERIAL, name VARCHAR(255) NOT NULL, email VARCHAR(255) PRIMARY KEY);");
   if(!$db) {
      echo "Error : Please try after soemtime, or contact us\n";
      exit;
   }
    else {
      $search_result = pg_query($db, "SELECT * FROM cryptexprereg WHERE email= '$email'");
      if(pg_num_rows($search_result)==0){
      $result = pg_prepare($db, "insert_query", 'INSERT INTO cryptexprereg (name,email) VALUES ($1, $2) ON CONFLICT DO NOTHING');
      pg_execute($db, "insert_query", array($name, $email));
    header( "refresh:0;url=thankyou.html" );
      }
      else{
         echo '<script>alert("That email was already taken, please register with a different email")</script>';
         header( "refresh:0;url=index.html" );
      }
   }
?>