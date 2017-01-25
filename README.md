# AjaxPollData
Javascript object to poll json data from a server. Uses jquery ajax which is a dependency. 

## Synopsis

In your html add

```html
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="js/AjaxPollData.js"></script>
```

And then create poller objects such as

```javascript
var poller = new AjaxPollData('/cgi-bin/ajax_test.pl',3000);
poller.init();
```

You can overwrite the default success handler (successHndl) simply as:

```javascript
poll2console = new AjaxPollData('/cgi-bin/ajax_test.pl',10000);

mySuccess = function (data){
    console.log(data);
    console.log("Success count: " + this.success_count);
    this.success_count++; 
};

poll2console.successHndl = mySuccess;
poll2console.init();
```

You can have multiple pollers running simultaneously to different urls and interval rates. 

## Default Success Handler 

The default success handle function (successHndl) expects a json object. The HTML DOM object associated with each key in json object is updated with the value of the json object. Or in other words:  

```javascript
for (var key in json_data) {
     var id = document.getElementById(key);
     id.innerHTML = data[key];
}
```

## Credits

Borrowed ideas from 

http://www.erichynds.com/blog/a-recursive-settimeout-pattern
