
<?php include 'search.php' ?>

<h1>Search Results:</h1>

<ul>
<?php foreach($this->results as $result) { ?>
    <li><?php echo $result->getName() ?></li>
<?php } ?>
</ul>