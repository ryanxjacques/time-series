<?php
include('../admin-connection-data.txt');

try
{
	  $dbh = new PDO('mysql:host='.$server.';port='.$port.';dbname='.$dbname, $user, $pass);
} catch (PDOException $e) {
	  print $e->getMessage();
	  exit;
}
?>
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Search Results</title>
    <link rel="stylesheet" href="css_modules/theme.css">
    <link rel="stylesheet" href="css_modules/flex-container.css">
    <link rel="stylesheet" href="css_modules/header.css">
    <link rel="stylesheet" href="css_modules/content.css">
    <link rel="stylesheet" href="css_modules/footer.css">
  </head>
  <body>
    <?php
      $search = strtoupper($_GET['query']);
      
      $search_query = "SELECT set_id, set_name, set_desc,
                 set_domain, set_keywords, set_vector_size,
                 set_components, set_contributor
                 FROM ts_set_metadata
                 WHERE upper(set_name) REGEXP '\\\\b".$search."\\\\b'
                 OR upper(set_desc) REGEXP '\\\\b".$search."\\\\b'
                 OR upper(set_domain) REGEXP '\\\\b".$search."\\\\b'
                 OR upper(set_keywords) REGEXP '\\\\b".$search."\\\\b'
                 OR upper(set_contributor) REGEXP '\\\\b".$search."\\\\b'";
      
      $result1 = $dbh->query($search_query);
      
      if (!$result1) {
          print "execution error: </br>";
          $error = $dbh->errorInfo();
          print($error[2]);
          exit;
      }
    ?>
    <div class="flex-container">
      <header>
        <div class="logo-container">
          <img id="logo-image" src="images/logo.png">
        </div>
      </header>
      <main class="content-flex-container">
        <div class="interface font">
          <table style="border-collapse: collapse;">
            <thead>
              <tr>
                <th style="padding: 10px;">ID</th>
                <th style="padding: 10px;">Name</th>
                <th style="padding: 10px;">Description</th>
                <th style="padding: 10px;">Domain</th>
                <th style="padding: 10px;">Keywords</th>
                <th style="padding: 10px;">Vector Size</th>
                <th style="padding: 10px;">Components</th>
                <th style="padding: 10px;">Contributor</th>
              </tr>
            </thead>
            <tbody>
              <?php
                foreach ($result1 as $row) {
                  echo "<tr>";
                  echo "<td style='padding: 10px;'>".$row['set_id']."</td>";
                  echo "<td style='padding: 10px;'>".$row['set_name']."</td>";
                  echo "<td style='padding: 10px;'>".$row['set_desc']."</td>";
                  echo "<td style='padding: 10px;'>".$row['set_domain']."</td>";
                  echo "<td style='padding: 10px;'>".$row['set_keywords']."</td>";
                  echo "<td style='padding: 10px;'>".$row['set_vector_size']."</td>";
                  echo "<td style='padding: 10px;'>".$row['set_components']."</td>";
                  echo "<td style='padding: 10px;'>".$row['set_contributor']."</td>";
                  echo "</tr>";
                }
              ?>
            </tbody>
          </table>
        </div>
      </main>
      <footer>
        <div class="font">
          <p>company information</p>
        </div>
      </footer>
    </div>
  </body>
</html>