// Polling Constructor Function

function AjaxPollData(url,interval)
{
    // These should be overwritten before calling.
    this.url_src = url;
    this.interval = interval;

    this.failed = 0;
    this.success_count = 0;

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
       }).done(self.init);
    };

    // --------------
    this.successHndl = function( data )
    {
        //console.log(this);
        for (var key in data)
        {
            var id = document.getElementById(key);
            if (id)
            {
                id.innerHTML = data[key];
            }
            else
            {
                console.log("element id not found " + key);
            }
        }

        //console.log("Success!!!:" + data);
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
