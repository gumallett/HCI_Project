<div id="searchForm">
    <form role="form" action="/searchResults" method="get">
        <div class="form-group">
            <label for="searchTerms">Search:</label>
            <input class="form-control" type="text" id="searchTerms" name="searchTerms" value="<?php echo $this->terms ? $this->terms : '' ?>" placeholder="Search">
        </div>
        <button id="searchSubmit" type="submit" class="btn btn-success"><strong>Go!</strong></button>
    </form>
</div>