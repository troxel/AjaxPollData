// Polling Constructor Function

function AjaxPollData()
{
    this.failed = 0;
    this.success_count = 0;
    this.url_src = "/cgi-bin/ajax.pl";
    this.interval = 2000;

    this.init = function()
    {
       this.tid = setTimeout(this.getData,this.interval,this);
    };

    this.getData = function(cntx)
    {
       var self = cntx;

       jQuery.ajax({
           url        : self.url_src,
           dataType   : "json",
           context    : self,
           success    : self.successHndl,
           error      : self.errorHndl,
       });
    };

    // --------------
    this.successHndl = function( data )
    {
        console.log(this);
        for (var key in data)
        {
            console.log('obj.' + key, '=', data[key]);
            var id = document.getElementById(key);
            if (id)
            {
                id.innerHTML = data[key];
            }
            else
            {
                console.log(data);
                console.log("element not found " + key);
            }
        }

        console.log("Success!!!:" + data);
        this.init();
        ++this.success_count;
    };

    // ---------------
    this.errorHandler = function(){

       if ( ++this.failed < 10 )
       {
          this.interval += 1000;
          console.log('error')
          this.init();
       }
   };
};
